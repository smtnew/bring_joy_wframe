import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { createHmac } from "https://deno.land/std@0.177.0/node/crypto.ts";

serve(async (req) => {
  try {
    // Parse form data from EuPlătesc IPN
    const formData = await req.formData()
    
    const amount = formData.get('amount')?.toString()
    const curr = formData.get('curr')?.toString()
    const invoiceId = formData.get('invoice_id')?.toString()
    const epId = formData.get('ep_id')?.toString()
    const merch_id = formData.get('merch_id')?.toString()
    const action = formData.get('action')?.toString()
    const message = formData.get('message')?.toString()
    const approval = formData.get('approval')?.toString()
    const timestamp = formData.get('timestamp')?.toString()
    const nonce = formData.get('nonce')?.toString()
    const fpHash = formData.get('fp_hash')?.toString()

    console.log('IPN received:', {
      invoiceId,
      amount,
      action,
      message
    })

    // Validate required fields
    if (!invoiceId || !fpHash) {
      console.error('Missing required fields')
      return new Response('Missing required fields', { status: 400 })
    }

    // Verify HMAC signature
    const euplatescKey = Deno.env.get('EUPLATESC_KEY')!
    
    // Build the data string for verification (same order as EuPlătesc sends)
    const dataToVerify = `${amount}${curr}${invoiceId}${epId}${merch_id}${action}${message}${approval}${timestamp}${nonce}`
    
    const hmac = createHmac('md5', euplatescKey)
    hmac.update(dataToVerify)
    const calculatedHash = hmac.digest('hex')

    if (calculatedHash !== fpHash) {
      console.error('Invalid signature:', {
        received: fpHash,
        calculated: calculatedHash
      })
      return new Response('Invalid signature', { status: 403 })
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Check if payment was approved
    if (action === 'paid' && approval === 'APPR') {
      // Find the child by payment_id
      const { data: child, error: findError } = await supabase
        .from('children')
        .select('*')
        .eq('payment_id', invoiceId)
        .single()

      if (findError || !child) {
        console.error('Child not found for payment:', invoiceId)
        return new Response('Child not found', { status: 404 })
      }

      // Update child status to finished
      const { error: updateError } = await supabase
        .from('children')
        .update({ 
          status: 'finished',
          paid_at: new Date().toISOString()
        })
        .eq('id', child.id)

      if (updateError) {
        console.error('Error updating child status:', updateError)
        return new Response('Error updating status', { status: 500 })
      }

      console.log('Payment successful, child marked as finished:', child.id)
      return new Response('OK', { status: 200 })
    } else {
      // Payment failed or was cancelled - restore child to raising status
      const { data: child } = await supabase
        .from('children')
        .select('*')
        .eq('payment_id', invoiceId)
        .single()

      if (child) {
        await supabase
          .from('children')
          .update({ 
            status: 'raising',
            payment_id: null
          })
          .eq('id', child.id)
        
        console.log('Payment failed, child restored to raising:', child.id)
      }

      return new Response('Payment not approved', { status: 200 })
    }

  } catch (error) {
    console.error('Error in notify:', error)
    return new Response('Internal server error', { status: 500 })
  }
})
