# 🎁 Bring Joy — Platformă de donații pentru copii

**Bring Joy** este o aplicație web construită cu scopul de a conecta oameni care vor să dăruiască bucurie de Crăciun cu copiii care au nevoie de sprijin.  
Platforma face parte din inițiativa [**Something New**](https://something-new.ro/) și susține ediția a XII-a a campaniei _Bring Joy_.

---

## 🌟 Scopul proiectului

Prin această platformă, vizitatorii pot:

- vizualiza o listă de copii din diverse comunități;
- citi o scurtă descriere sau o scrisoare de la fiecare copil, alături de imaginea copilului
- selecta un copil și face o donație prin **EuPlătesc.ro**;
- vedea în timp real cum statusul fiecărui copil se schimbă după finalizarea donației.

---

## 🧱 Arhitectură generală

Aplicația este complet **serverless**, bazată pe **Supabase** (PostgreSQL + Realtime + Edge Functions) și tehnologii web simple:

| Componentă   | Tehnologie              | Descriere                                                    |
| ------------ | ----------------------- | ------------------------------------------------------------ |
| Frontend     | HTML, CSS, JavaScript   | Afișează lista copiilor, interfața și fluxul de donații      |
| Backend      | Supabase Edge Functions | Gestiune logică de plată, rezervare copil, webhook EuPlătesc |
| Bază de date | Supabase Postgres       | Tabel `children` cu datele campaniei                         |
| Live updates | Supabase Realtime       | Actualizează automat statusul copiilor                       |
| Plăți        | EuPlătesc.ro            | Gateway securizat de plăți online                            |

---

## 🖼️ Design

- **Culori:**  
  `#ff3131` (roșu), `#d9a837` (auriu), `#e6e1d8` (bej)
- **Fonturi:**
  - _Anton_ — pentru titluri și elemente de accent
  - _Montserrat_ — pentru text și descrieri
- **Layout:**
  - Header cu meniu și secțiune „Comunități”
  - Grid de carduri cu fiecare copil (poză, text, acțiuni)
  - Butoane „Scrisoare” (pop-up) și „Donează” (redirecționare plată)
  - Secțiune „Despre campania Bring Joy” cu imagini și text de prezentare

---

## 🗄️ Structura bazei de date (`children`)

| Coloana        | Tip     | Descriere                           |
| -------------- | ------- | ----------------------------------- |
| id             | uuid    | identificator unic                  |
| nume           | text    | numele copilului                    |
| text_scurt     | text    | descriere scurtă                    |
| text_scrisoare | text    | scrisoarea completă (HTML/Markdown) |
| poza_url       | text    | link către poză                     |
| suma           | integer | valoarea cadoului (RON)             |
| comunitate     | text    | comunitatea copilului               |
| status         | text    | `raising` sau `finished`            |

---

## ⚙️ Fluxul aplicației

1. La accesarea site-ului, aplicația încarcă lista copiilor din Supabase și îi grupează automat după comunitate.
2. Utilizatorul poate căuta un copil după nume sau descriere.
3. Apăsarea butonului **„Donează”**:
   - trimite cerere către Edge Function `/create-payment`;
   - rezervă copilul în baza de date;
   - redirecționează spre EuPlătesc pentru plată.
4. După confirmarea plății:
   - EuPlătesc trimite notificare (IPN) către `/notify`;
   - statusul copilului se schimbă în `finished`;
   - frontendul actualizează în timp real cardul respectiv.

---

## 🧩 Cum rulezi local

1. Instalează CLI-ul Supabase:
   ```bash
   npm install -g supabase
   ```
2. Clonează proiectul:
   ```bash
   git clone https://github.com/smtnew/bring_joy_wframe
   cd <repo>
   ```
3. Pornește Supabase local:
   ```bash
   supabase start
   ```
4. Deschide fișierul `index.html` în browser (folosește Live Server sau un server static local).
5. Funcțiile pot fi testate local cu:
   ```bash
   supabase functions serve
   ```

---

## 🔒 Securitate

- Baza de date are **RLS (Row Level Security)** activat — publicul poate doar _citi_ datele copiilor.
- Doar **Edge Functions** (care rulează cu `service_role_key`) pot face modificări.
- Datele sensibile (chei EuPlătesc, service role) sunt stocate în variabile de mediu, nu în codul public.

---

## 🫶 Despre campania Bring Joy

**Bring Joy** este o inițiativă a organizației [Something New](https://something-new.ro/) care, de 12 ani, aduce împreună voluntari, parteneri și comunități pentru a transforma generozitatea de sărbători într-o resursă de educație și speranță pentru tot anul.  
Campania din 2025 își propune să susțină peste **500 de copii** din mediul rural.

---

## ✨ Autor și contribuții

Proiect inițiat și dezvoltat de **Ovidiu Chiș**, în colaborare cu comunitatea _Something New_.  
Contribuțiile sunt binevenite prin Pull Requests sau Issues cu tag-ul `enhancement`.
