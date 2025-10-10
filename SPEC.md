# 🎁 Project Spec — Bring Joy Donation Platform

## 1. Overview
**Bring Joy** is a web platform that allows people to bring Christmas joy to children in need.  
Visitors can browse children from different communities, read their letters, and make donations through **EuPlătesc.ro**.  
The platform automatically updates donation statuses in real time and is built entirely on **Supabase**.

---

## 2. Goals
- Create a simple, public-facing donation website for the *Bring Joy* campaign.
- Allow visitors to choose a child and donate a predefined gift amount.
- Reflect real-time donation status changes directly on the site.
- Keep everything serverless: **HTML + CSS + JavaScript + Supabase (DB, Edge Functions, Realtime)**.
- The end result must be a **fully functional project**, including frontend files, database scripts, and Supabase Edge Functions.

---

## 3. Tech Stack
| Component | Technology | Purpose |
|------------|-------------|----------|
| Frontend | HTML, CSS, JavaScript | Public UI, cards, search, and grouping by community |
| Database | Supabase Postgres | Stores all child data and status |
| Logic | Supabase Edge Functions | Payment creation, status update after payment |
| Realtime | Supabase Realtime | Live updates of donation statuses |
| Payments | EuPlătesc.ro | Secure payment gateway |

---

## 4. Database Schema

### Table: `children`
| Column | Type | Description |
|---------|------|-------------|
| id | uuid (PK) | Unique identifier |
| nume | text | Child's name |
| text_scurt | text | Short description |
| text_scrisoare | text | Full letter text (Markdown or HTML) |
| poza_url | text | Link to child photo |
| suma | integer | Donation amount (RON) |
| comunitate | text | Community name |
| status | text | `raising`, `reserved`, or `finished` |
| payment_id | text | Payment tracking ID |
| paid_at | timestamptz | Payment completion timestamp |
| created_at | timestamptz | Record creation timestamp |

### RLS Policies
```sql
alter table children enable row level security;

create policy "Public can read children"
  on children for select using (true);

create policy "No public inserts"
  on children for insert to anon with check (false);

create policy "No public updates"
  on children for update to anon using (false) with check (false);

create policy "No public deletes"
  on children for delete to anon using (false);

create policy "Service role full access"
  on children for all to service_role using (true) with check (true);
```

---

## 5. Edge Functions

### `/create-payment`
- **Method:** `POST`
- **Input:** `{ child_id, donor? }`
- **Behavior:**
  - Reserve the child (set `status='raising'` → `reserved`).
  - Create EuPlătesc payment payload.
  - Compute HMAC signature (`MAC`).
  - Save `payment_id` to DB.
  - Return JSON `{ redirect: "https://secure.euplatesc.ro/..." }`.

### `/notify`
- **Method:** `POST` (called by EuPlătesc IPN)
- **Input:** form data from EuPlătesc (amount, orderid, hash, etc.)
- **Behavior:**
  - Validate MAC signature.
  - If valid and approved → set `status='finished'`, `paid_at=now()`.
  - If payment failed → restore status to `raising`.
  - Return HTTP 200.

### Environment Variables
```
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_URL=...
EUPLATESC_MERCHANT_ID=...
EUPLATESC_KEY=...
```

---

## 6. Frontend Behavior

### General Flow
1. On page load:
   - Fetch all children from Supabase (`status`, `nume`, `text_scurt`, `poza_url`, `suma`, `comunitate`).
   - Group results by `comunitate`.
   - Render responsive grid of cards.
   - Subscribe to Supabase Realtime for live updates.

2. Search functionality:
   - Client-side search by name or text (filters visible cards).

3. Donation flow:
   - Clicking **"Donează"** → calls `/create-payment`.
   - Redirects to EuPlătesc.
   - After payment confirmation, `/notify` updates DB → frontend receives Realtime event → updates card to show ✅ *Finished*.

4. Letter pop-up:
   - Button **"Scrisoare"** opens modal rendering `text_scrisoare` as HTML.

---

## 7. UI / Design System

### Colors
| Name | Hex |
|------|-----|
| Red | `#ff3131` |
| Gold | `#d9a837` |
| Beige | `#e6e1d8` |

### Fonts
- **Anton** — titles, headers, and CTAs  
- **Montserrat** — body text and paragraphs

### Design Philosophy
The design should be **clean, modern, but warm and deep**, evoking empathy and generosity.  
- Use generous whitespace and balanced layout (modern look).  
- Blend soft shadows or gradients for depth.  
- Use warm color palette to express hope and care.  
- Typography (Anton + Montserrat) should feel confident yet friendly.  
- Avoid cluttered or overly commercial aesthetics.

### Layout
#### Header
- Campaign title + logo  
- Menu with "Comunități" and "Despre campanie"

#### Main Section
- Headline text (`Bring Joy — Ediția a XII-a`)  
- Subtext: *8 Oct – 25 Dec*  
- Grid of cards, grouped by community.

#### Card Layout
```
+---------------------------+
| [Image] (poza copilului)  |
| Short text / name         |
| [Status badge if needed]  |
+---------------------------+
| [Scrisoare] [Donează]     |
+---------------------------+
```

#### Footer
- Note about the campaign and link to <a href="https://something-new.ro/">something-new.ro</a>

---

## 8. Static Pages

### `/index.html`
- Main page with child cards grouped by community
- Search functionality
- Donation buttons

### `/about.html`
- Title: *Despre campania Bring Joy*  
- Sections:
  1. Hero banner with logo and text "Ediția a XII-a"  
  2. Info section: "O promisiune care crește an de an"  
  3. Info section: "Generozitate acum, educație pentru tot anul"  
  4. Info section: "Cum funcționează campania?"
  5. Info section: "Cine suntem noi?"
  6. Call-to-action buttons: "Alege un copil" / "Vizitează something-new.ro"  
- Style consistent with site color theme.

---

## 9. Security & Access
- All reads use Supabase `anon` key (public, read-only).
- All writes go through Edge Functions using `service_role_key`.
- Environment secrets (Supabase, EuPlătesc) never exposed in frontend.
- EuPlătesc IPN (`/notify`) verifies HMAC signature before updating records.

---

## 10. Project Structure

```
bring_joy_wframe/
├── index.html              # Main page with child cards
├── about.html              # About page
├── styles.css              # All styles
├── app.js                  # Frontend JavaScript
├── README.md               # User documentation
├── SPEC.md                 # This technical specification
└── supabase/
    ├── .env.example        # Environment variables template
    ├── migrations/
    │   ├── 20250101000000_create_children_table.sql
    │   └── 20250101000001_seed_data.sql
    └── functions/
        ├── create-payment/
        │   └── index.ts
        └── notify/
            └── index.ts
```

---

## 11. Setup Instructions

### 1. Supabase Setup
```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase (if starting fresh)
supabase init

# Start local Supabase
supabase start

# Apply migrations
supabase db reset
```

### 2. Configure Environment Variables
Copy `supabase/.env.example` to `.env` and fill in:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `EUPLATESC_MERCHANT_ID` - Your EuPlătesc merchant ID
- `EUPLATESC_KEY` - Your EuPlătesc secret key

Update `app.js` with your Supabase URL and anon key.

### 3. Deploy Edge Functions
```bash
# Deploy create-payment function
supabase functions deploy create-payment --no-verify-jwt

# Deploy notify function
supabase functions deploy notify --no-verify-jwt

# Set environment secrets
supabase secrets set SUPABASE_URL=...
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...
supabase secrets set EUPLATESC_MERCHANT_ID=...
supabase secrets set EUPLATESC_KEY=...
```

### 4. Run Frontend
Open `index.html` in a web browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Or use VS Code Live Server extension
```

---

## 12. Testing

### Test Donation Flow
1. Open the site in a browser
2. Click "Donează" on any child card
3. Complete payment on EuPlătesc (use test credentials in sandbox mode)
4. Verify that:
   - Child status changes to "reserved" immediately
   - After payment, status changes to "finished"
   - Realtime updates work (open two browser windows)

### Test Search
1. Type a child's name in the search box
2. Verify that only matching children are displayed
3. Clear search to see all children again

### Test Letter Modal
1. Click "Scrisoare" on any child card
2. Verify modal opens with child's letter
3. Close modal using X button or clicking outside
4. Verify Escape key closes modal

---

## 13. Acceptance Criteria
- ✅ The site displays all children grouped by community.
- ✅ The donation flow works end-to-end (EuPlătesc redirect and status update).
- ✅ Realtime updates refresh UI instantly after payment.
- ✅ The design matches Bring Joy visual identity (clean, modern, warm, deep).
- ✅ The repository contains all code and migration scripts needed for a functional Supabase project.
- ✅ README.md and SPEC.md are consistent and complementary.
- ✅ Search functionality filters children by name, description, or community.
- ✅ Letter modal displays full letter content.
- ✅ About page provides comprehensive campaign information.

---

## 14. Future Enhancements
- Admin panel for adding/updating children.
- Email confirmation to donors.
- Reporting dashboard for completed donations.
- Multi-language support (RO / EN).
- Payment history and receipt generation.
- Social sharing capabilities.
