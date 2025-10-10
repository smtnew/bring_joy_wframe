# 🚀 Setup Guide — Bring Joy Platform

This guide will help you set up and deploy the Bring Joy donation platform.

## Prerequisites

- Node.js (v16 or higher)
- Supabase account (free tier works)
- EuPlătesc merchant account (or sandbox for testing)

---

## 1. Supabase Project Setup

### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized
3. Note down your project credentials:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - Anon/Public Key
   - Service Role Key (keep this secret!)

### Install Supabase CLI
```bash
npm install -g supabase
```

### Link Your Project
```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF
```

---

## 2. Database Setup

### Apply Migrations
```bash
# This will create the children table and add seed data
supabase db push
```

Alternatively, you can run the migrations manually in the Supabase SQL Editor:
1. Open your project in Supabase Dashboard
2. Go to SQL Editor
3. Run the contents of `supabase/migrations/20250101000000_create_children_table.sql`
4. Run the contents of `supabase/migrations/20250101000001_seed_data.sql`

### Verify Database Setup
1. Go to Table Editor in Supabase Dashboard
2. You should see a `children` table with 5 sample records
3. Check that RLS is enabled (lock icon next to table name)

---

## 3. Edge Functions Setup

### Deploy Edge Functions

```bash
# Deploy create-payment function
supabase functions deploy create-payment --no-verify-jwt

# Deploy notify function
supabase functions deploy notify --no-verify-jwt
```

### Set Environment Secrets

```bash
# Set Supabase credentials
supabase secrets set SUPABASE_URL=https://xxxxx.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Set EuPlătesc credentials
supabase secrets set EUPLATESC_MERCHANT_ID=your-merchant-id
supabase secrets set EUPLATESC_KEY=your-secret-key
```

### Test Edge Functions

You can test the functions using curl:

```bash
# Test create-payment (replace with your project URL and anon key)
curl -X POST https://xxxxx.supabase.co/functions/v1/create-payment \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"child_id": "SOME_CHILD_UUID"}'
```

---

## 4. Frontend Configuration

### Update app.js

Open `app.js` and replace the placeholders:

```javascript
// Configuration - Replace with your actual Supabase credentials
const SUPABASE_URL = 'https://xxxxx.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key-here'
```

### Test Locally

You can run the frontend locally using any static file server:

```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js http-server
npx http-server

# Option 3: VS Code Live Server extension
# Just right-click on index.html and select "Open with Live Server"
```

Then open your browser to:
- Main page: `http://localhost:8000/index.html`
- About page: `http://localhost:8000/about.html`

---

## 5. Deploy Frontend

### Option 1: Supabase Storage (Recommended)

```bash
# Create a public bucket
supabase storage create --public website

# Upload files
supabase storage upload website index.html
supabase storage upload website about.html
supabase storage upload website styles.css
supabase storage upload website app.js
```

Then access your site at:
`https://xxxxx.supabase.co/storage/v1/object/public/website/index.html`

### Option 2: GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings > Pages
3. Select branch and folder
4. Your site will be available at `https://username.github.io/repo-name`

### Option 3: Netlify/Vercel

1. Connect your GitHub repository
2. Set build command: (none, it's static)
3. Set publish directory: `/`
4. Deploy!

### Option 4: Custom Hosting

Upload `index.html`, `about.html`, `styles.css`, and `app.js` to your web hosting provider.

---

## 6. EuPlătesc Integration

### Sandbox Testing

For testing, use EuPlătesc sandbox credentials:
- Merchant ID: (provided by EuPlătesc)
- Secret Key: (provided by EuPlătesc)
- Payment URL: `https://secure.euplatesc.ro/tdsprocess/tranzactd.php`

### Configure IPN Callback

In your EuPlătesc dashboard:
1. Set IPN URL to: `https://xxxxx.supabase.co/functions/v1/notify`
2. Enable IPN notifications
3. Test a payment to verify the callback works

### Production Setup

When ready for production:
1. Get production credentials from EuPlătesc
2. Update secrets: `supabase secrets set EUPLATESC_MERCHANT_ID=...`
3. Update secrets: `supabase secrets set EUPLATESC_KEY=...`

---

## 7. Enable Realtime

Realtime should be enabled by default, but verify:

1. Go to Supabase Dashboard > Database > Replication
2. Make sure `children` table has replication enabled
3. In your Supabase project settings, verify Realtime is enabled

---

## 8. Testing the Full Flow

### Test Donation Flow

1. Open the site in your browser
2. Click "Donează" on any child card
3. You should be redirected to EuPlătesc
4. Complete the payment (use test card in sandbox mode)
5. You should be redirected back (configure return URL in EuPlătesc)
6. The child's status should update to "Finanțat" automatically

### Test Realtime Updates

1. Open the site in two different browser windows
2. In one window, trigger a donation
3. In the other window, watch the child card update in real-time
4. No page refresh should be needed!

### Test Search

1. Type a child's name in the search box
2. Only matching children should appear
3. Clear the search to see all children again

---

## 9. Adding Your Own Children

To add real children to the platform:

1. Go to Supabase Dashboard > Table Editor
2. Select `children` table
3. Click "Insert row"
4. Fill in all required fields:
   - `nume`: Child's name
   - `text_scurt`: Short description
   - `text_scrisoare`: Full letter (HTML format)
   - `poza_url`: Image URL (use Unsplash, Supabase Storage, etc.)
   - `suma`: Amount in RON
   - `comunitate`: Community name
   - `status`: Set to "raising"
5. Save the row

The new child will appear immediately on the site (thanks to Realtime!).

---

## 10. Monitoring and Logs

### View Edge Function Logs

```bash
# View logs for create-payment
supabase functions logs create-payment

# View logs for notify
supabase functions logs notify

# Follow logs in real-time
supabase functions logs create-payment --follow
```

### Database Logs

Go to Supabase Dashboard > Logs to view:
- Database queries
- API requests
- Realtime connections

---

## 11. Security Checklist

- ✅ Never commit `.env` files to Git
- ✅ Keep Service Role Key secret (only in Edge Functions)
- ✅ Use Anon Key in frontend (read-only access)
- ✅ Verify RLS policies are enabled on `children` table
- ✅ Test that anonymous users cannot update/delete records
- ✅ Verify HMAC signature in `/notify` function
- ✅ Use HTTPS for production deployment

---

## 12. Troubleshooting

### "Failed to fetch children"
- Check that `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct in `app.js`
- Verify the `children` table exists in your database
- Check browser console for CORS errors

### "Error creating payment"
- Verify Edge Functions are deployed: `supabase functions list`
- Check that environment secrets are set: `supabase secrets list`
- View function logs: `supabase functions logs create-payment`

### "Child status not updating after payment"
- Verify IPN URL is configured in EuPlătesc dashboard
- Check `/notify` function logs for errors
- Ensure Realtime is enabled for the `children` table

### "Children not grouped by community"
- Check that all children have a `comunitate` value
- Verify the data is being loaded correctly (browser console)

---

## 13. Support

For issues with:
- **Supabase**: Check [Supabase Docs](https://supabase.com/docs) or [Discord](https://discord.supabase.com)
- **EuPlătesc**: Contact EuPlătesc support or check their documentation
- **This Project**: Open an issue on GitHub

---

## 14. Next Steps

Once everything is working:
1. Replace sample children with real data
2. Customize colors and branding to match your organization
3. Add Google Analytics or similar tracking
4. Set up email notifications for donations
5. Create an admin panel for managing children

Good luck with your Bring Joy campaign! 🎁
