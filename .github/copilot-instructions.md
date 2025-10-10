# GitHub Copilot Instructions for Bring Joy

## Project Overview

**Bring Joy** este o platformă web serverless pentru donații către copii, parte din inițiativa Something New. Platforma permite utilizatorilor să vizualizeze copii din diverse comunități și să facă donații prin gateway-ul de plăți EuPlătesc.ro.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (vanilla, fără framework-uri)
- **Backend**: Supabase Edge Functions (Deno)
- **Database**: Supabase PostgreSQL cu Row Level Security (RLS)
- **Real-time**: Supabase Realtime pentru actualizări automate
- **Payment Gateway**: EuPlătesc.ro
- **Deployment**: Serverless architecture

## Architecture Guidelines

### Database Structure
Tabelul `children` conține:
- `id` (uuid): identificator unic
- `nume` (text): numele copilului
- `text_scurt` (text): descriere scurtă
- `text_scrisoare` (text): scrisoarea completă (HTML/Markdown)
- `poza_url` (text): link către poză
- `suma` (integer): valoarea cadoului în RON
- `comunitate` (text): comunitatea copilului
- `status` (text): `raising` sau `finished`

### Security Requirements
- Row Level Security (RLS) este activat - publicul poate doar citi date
- Doar Edge Functions cu `service_role_key` pot modifica date
- Nu stoca niciodată date sensibile (chei EuPlătesc, service_role_key) în codul public
- Folosește variabile de mediu pentru toate secretele

## Coding Style

### Design System
- **Culori primare**:
  - Roșu: `#ff3131`
  - Auriu: `#d9a837`
  - Bej: `#e6e1d8`
- **Fonturi**:
  - Anton - pentru titluri și elemente de accent
  - Montserrat - pentru text și descrieri

### HTML/CSS/JavaScript
- Folosește vanilla JavaScript, fără framework-uri externe
- Păstrează codul simplu și accesibil
- Scrie cod semantic HTML5
- Folosește CSS modern (flexbox, grid) pentru layout
- Asigură-te că interfața este responsive

### Edge Functions (Deno)
- Funcțiile sunt scrise în TypeScript pentru Deno runtime
- Folosește Supabase client cu service_role_key pentru modificări database
- Validează întotdeauna inputurile utilizatorului
- Gestionează corect erorile și returnează statusuri HTTP adecvate
- Documentează parametrii și răspunsurile așteptate

## Development Workflow

### Local Development
1. Instalează Supabase CLI: `npm install -g supabase`
2. Start Supabase local: `supabase start`
3. Folosește Live Server sau un server static pentru frontend
4. Testează funcțiile cu: `supabase functions serve`

### Testing
- Testează manual fluxul complet de donație
- Verifică că real-time updates funcționează corect
- Testează pe multiple browsere
- Validează responsive design pe diverse dimensiuni de ecran

## Payment Flow

1. Utilizatorul apasă "Donează"
2. Frontend trimite request către `/create-payment` Edge Function
3. Funcția rezervă copilul în database
4. Redirect către EuPlătesc pentru plată
5. După plată, EuPlătesc trimite IPN către `/notify`
6. Funcția actualizează statusul copilului la `finished`
7. Frontend primește update real-time și actualizează UI

## Contributing Guidelines

- Contribuțiile sunt binevenite prin Pull Requests
- Folosește tag-ul `enhancement` pentru Issues cu feature-uri noi
- Respectă designul și arhitectura existentă
- Menține codul simplu și ușor de întreținut
- Documentează orice funcționalitate nouă în README.md

## Important Notes

- Proiectul este în limba română - păstrează această convenție pentru UI și comentarii
- Campania susține peste 500 de copii din mediul rural
- Organizația Something New are 12 ani de experiență în acest domeniu
- Prioritatea este simplitatea și accesibilitatea platformei
