import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { createHmac } from "https://deno.land/std@0.177.0/node/crypto.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { child_id, donor } = await req.json()

    if (!child_id) {
      return new Response(
        JSON.stringify({ error: 'child_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get child data
    const { data: child, error: childError } = await supabase
      .from('children')
      .select('*')
      .eq('id', child_id)
      .single()

    if (childError || !child) {
      return new Response(
        JSON.stringify({ error: 'Child not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if child is available
    if (child.status !== 'raising') {
      return new Response(
        JSON.stringify({ error: 'Child is not available for donation' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate payment ID (timestamp + random)
    const paymentId = `BJ${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Reserve the child
    const { error: updateError } = await supabase
      .from('children')
      .update({ 
        status: 'reserved',
        payment_id: paymentId
      })
      .eq('id', child_id)
      .eq('status', 'raising') // Only update if still raising (race condition protection)

    if (updateError) {
      console.error('Error updating child:', updateError)
      return new Response(
        JSON.stringify({ error: 'Failed to reserve child' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Prepare EuPlătesc payment data
    const merchantId = Deno.env.get('EUPLATESC_MERCHANT_ID')!
    const euplatescKey = Deno.env.get('EUPLATESC_KEY')!
    
    const amount = child.suma.toString()
    const currency = 'RON'
    const orderDescription = `Donație pentru ${child.nume}`
    const orderNumber = paymentId

    // Calculate HMAC signature (MAC)
    const dataToSign = `${amount}${currency}${orderNumber}${orderDescription}${merchantId}`
    const hmac = createHmac('md5', euplatescKey)
    hmac.update(dataToSign)
    const fp_hash = hmac.digest('hex')

    // Build redirect URL with payment parameters
    const euplatescUrl = new URL('https://secure.euplatesc.ro/tdsprocess/tranzactd.php')
    euplatescUrl.searchParams.append('amount', amount)
    euplatescUrl.searchParams.append('curr', currency)
    euplatescUrl.searchParams.append('invoice_id', orderNumber)
    euplatescUrl.searchParams.append('order_desc', orderDescription)
    euplatescUrl.searchParams.append('merch_id', merchantId)
    euplatescUrl.searchParams.append('timestamp', Date.now().toString())
    euplatescUrl.searchParams.append('nonce', Math.random().toString(36).substr(2, 9))
    euplatescUrl.searchParams.append('fp_hash', fp_hash)
    euplatescUrl.searchParams.append('ExtraData[child_id]', child_id)
    if (donor) {
      euplatescUrl.searchParams.append('ExtraData[donor]', donor)
    }

    return new Response(
      JSON.stringify({ 
        redirect: euplatescUrl.toString(),
        payment_id: paymentId
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in create-payment:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
