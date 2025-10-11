# 🎁 Bring Joy — Platformă de donații pentru copii

**Bring Joy** este o aplicație web construită cu scopul de a conecta oameni care vor să dăruiască bucurie de Crăciun cu copiii care au nevoie de sprijin.  
Platforma face parte din inițiativa [**Something New**](https://something-new.ro/) și susține ediția a XII-a a campaniei _Bring Joy_.

---

## 🌟 Scopul proiectului

Prin această platformă, vizitatorii pot:

- vizualiza o listă de copii din diverse comunități;
- căuta copii după nume, descriere sau comunitate folosind funcția de căutare;
- citi o scurtă descriere sau o scrisoare de la fiecare copil, alături de imaginea copilului;
- vedea progresul fiecărei strângeri de fonduri printr-o bară de progres;
- selecta un copil și face o donație (completă sau parțială) prin **EuPlătesc.ro**;
- vedea în timp real cum progresul și statusul fiecărui copil se actualizează după fiecare donație.

---

## 🧱 Arhitectură generală

Aplicația este complet **serverless**, bazată pe **Supabase** (PostgreSQL + Realtime + Edge Functions) și tehnologii web simple:

| Componentă   | Tehnologie              | Descriere                                                         |
| ------------ | ----------------------- | ----------------------------------------------------------------- |
| Frontend     | HTML, CSS, JavaScript   | Afișează lista copiilor, căutare, progres, interfață și donații   |
| Backend      | Supabase Edge Functions | Gestiune logică de plată, înregistrare donații, webhook EuPlătesc|
| Bază de date | Supabase Postgres       | Tabele `children` și `payments` cu datele campaniei              |
| Live updates | Supabase Realtime       | Actualizează automat progresul și statusul copiilor              |
| Plăți        | EuPlătesc.ro            | Gateway securizat de plăți online                                |

---

## 🖼️ Design

- **Culori:**  
  `#ff3131` (roșu), `#d9a837` (auriu), `#e6e1d8` (bej)
- **Fonturi:**
  - _Anton_ — pentru titluri și elemente de accent
  - _Montserrat_ — pentru text și descrieri
- **Layout:**
  - Header cu meniu, buton de căutare și secțiune „Comunități"
  - Panel de căutare glisant pentru filtrare rapidă
  - Grid de carduri cu fiecare copil (poză, text, bară de progres, acțiuni)
  - Butoane „Scrisoare" (pop-up cu scrisoarea completă) și „Donează" (modal pentru alegere sumă)
  - Secțiune „Despre campania Bring Joy" cu imagini și text de prezentare

---

## 🗄️ Structura bazei de date

### Tabel `children`

| Coloana        | Tip     | Descriere                           |
| -------------- | ------- | ----------------------------------- |
| id             | uuid    | identificator unic                  |
| nume           | text    | numele copilului                    |
| text_scurt     | text    | descriere scurtă                    |
| text_scrisoare | text    | scrisoarea completă (HTML/Markdown) |
| poza_url       | text    | link către poză                     |
| suma           | integer | valoarea cadoului necesar (RON)     |
| suma_stransa   | integer | suma totală strânsă până acum (RON) |
| comunitate     | text    | comunitatea copilului               |
| status         | text    | `raising`, `reserved` sau `finished`|
| payment_id     | text    | ID-ul tranzacției de plată          |
| paid_at        | timestamptz | data finalizării                |
| created_at     | timestamptz | data creării                    |

### Tabel `payments`

| Coloana     | Tip         | Descriere                              |
| ----------- | ----------- | -------------------------------------- |
| id          | uuid        | identificator unic                     |
| child_id    | uuid        | referință către copilul din `children` |
| amount      | integer     | suma donată (RON)                      |
| payment_ref | text        | referință tranzacție EuPlătesc         |
| created_at  | timestamptz | data donației                          |

**Notă:** Un trigger PostgreSQL actualizează automat `children.suma_stransa` la fiecare inserare, modificare sau ștergere din `payments`.

### Politici RLS (Row Level Security)

Ambele tabele au **Row Level Security** activat:

- **Citire publică:** Oricine poate citi datele copiilor și donațiilor.
- **Modificări:** Doar Edge Functions (cu `service_role_key`) pot insera, actualiza sau șterge date.
- **Siguranță:** Datele sensibile nu sunt niciodată expuse în frontend.

---

## ⚙️ Fluxul aplicației

1. La accesarea site-ului, aplicația încarcă lista copiilor din Supabase și îi grupează automat după comunitate.
2. Utilizatorul poate căuta un copil după nume, descriere sau comunitate folosind panelul de căutare.
3. Fiecare card afișează:
   - Poza și numele copilului
   - Descrierea scurtă
   - Suma necesară și progresul curent (bară de progres)
   - Buton pentru citirea scrisorii complete
   - Buton pentru donație
4. Apăsarea butonului **„Donează"**:
   - se deschide un modal care afișează suma necesară, suma strânsă și suma rămasă;
   - utilizatorul poate dona suma completă rămasă sau o sumă parțială la alegere;
   - după alegerea sumei, se trimite cerere către Edge Function `/create-payment`;
   - utilizatorul este redirecționat spre EuPlătesc pentru plată.
5. După confirmarea plății:
   - webhook-ul EuPlătesc notifică Edge Function `/notify`;
   - se inserează o înregistrare în tabela `payments` cu suma donată;
   - trigger-ul PostgreSQL actualizează automat `suma_stransa` din `children`;
   - dacă suma strânsă atinge sau depășește ținta, statusul devine `finished`;
   - frontendul primește actualizare în timp real și afișează noul progres și status.

### 💡 Donații parțiale

Platforma permite **donații parțiale**, ceea ce înseamnă că:

- Mai mulți donatori pot contribui la cadoul unui copil.
- Progresul este afișat printr-o bară de progres pe fiecare card.
- Copilul rămâne disponibil pentru donații până când suma totală este strânsă.
- Fiecare donație este înregistrată separat în tabela `payments`.
- Donatorii pot alege orice sumă între 1 RON și suma rămasă (sau mai mult dacă doresc).

### 🔍 Funcția de căutare

Aplicația include un panel de căutare care permite:

- Filtrarea copiilor după nume, descriere sau comunitate.
- Actualizare instant a rezultatelor în timp ce utilizatorul tastează.
- Căutare case-insensitive (nu ține cont de majuscule/minuscule).
- Acces rapid prin butonul de căutare din header.

---

## 🧩 Cum rulezi local

1. Instalează CLI-ul Supabase:
   ```bash
   npm install -g supabase
   ```
2. Clonează proiectul:
   ```bash
   git clone https://github.com/smtnew/bring_joy_wframe
   cd bring_joy_wframe
   ```
3. Pornește Supabase local:
   ```bash
   supabase start
   ```
4. Aplică migrațiile:
   ```bash
   supabase db reset
   ```
5. Actualizează credențialele în `app.js`:
   - Înlocuiește `SUPABASE_URL` și `SUPABASE_ANON_KEY` cu valorile din Supabase.
6. Deschide fișierul `index.html` în browser (folosește Live Server sau un server static local).
7. Funcțiile Edge pot fi testate local cu:
   ```bash
   supabase functions serve
   ```

Pentru instrucțiuni complete de setup și deployment, consultă [SETUP.md](SETUP.md).

---

## 🔒 Securitate

- Baza de date are **RLS (Row Level Security)** activat — publicul poate doar _citi_ datele copiilor și donațiilor.
- Doar **Edge Functions** (care rulează cu `service_role_key`) pot face modificări în baza de date.
- Datele sensibile (chei EuPlătesc, service role key) sunt stocate în variabile de mediu, nu în codul public.
- Webhook-ul EuPlătesc verifică semnătura HMAC înainte de a accepta notificări de plată.

---

## 📁 Structura proiectului

```
bring_joy_wframe/
├── index.html              # Pagina principală cu cardurile copiilor
├── about.html              # Pagina "Despre campanie"
├── styles.css              # Toate stilurile aplicației
├── app.js                  # JavaScript pentru frontend
├── config.json             # Configurare (URLs, chei API publice)
├── package.json            # Dependențe Node.js
├── README.md               # Acest fișier - documentație utilizator
├── SPEC.md                 # Specificație tehnică detaliată
├── SETUP.md                # Ghid complet de instalare și deployment
└── supabase/
    ├── .env.example        # Template pentru variabile de mediu
    ├── migrations/
    │   ├── 20250101000000_create_children_table.sql
    │   ├── 20250101000001_seed_data.sql
    │   └── 20250102000000_add_payments_table.sql
    └── functions/
        ├── create-payment/
        │   └── index.ts    # Funcție pentru crearea plăților
        └── notify/
            └── index.ts    # Webhook pentru notificări EuPlătesc
```

---

## 🫶 Despre campania Bring Joy

**Bring Joy** este o inițiativă a organizației [Something New](https://something-new.ro/) care, de 12 ani, aduce împreună voluntari, parteneri și comunități pentru a transforma generozitatea de sărbători într-o resursă de educație și speranță pentru tot anul.  
Campania din 2025 își propune să susțină peste **500 de copii** din mediul rural.

---

## ✨ Autor și contribuții

Proiect inițiat și dezvoltat de **Ovidiu Chiș**, în colaborare cu comunitatea _Something New_.  
Contribuțiile sunt binevenite prin Pull Requests sau Issues cu tag-ul `enhancement`.
