# LokerPekalonganRaya — Setup Guide

## Tech Stack
- **Frontend + Backend**: Next.js 14 (App Router)
- **Database**: MySQL (Railway)
- **ORM**: Prisma
- **Auth**: NextAuth v5 (JWT)
- **Deploy**: Railway

## Quick Start

### 1. Clone & Install
```bash
npm install
```

### 2. Setup Environment Variables
Salin `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```

Isi variabel berikut:
```env
DATABASE_URL="mysql://USER:PASS@HOST:PORT/lokerpekalonganraya"
NEXTAUTH_SECRET="random-secret-32-chars"
NEXTAUTH_URL="https://your-domain.railway.app"
N8N_WEBHOOK_SECRET="secret-untuk-validasi-n8n"
N8N_INSTAGRAM_WEBHOOK_URL="https://n8n.yourdomain.com/webhook/instagram-post"
NEXT_PUBLIC_APP_URL="https://your-domain.railway.app"
```

### 3. Database Migration
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Buat Admin User
```bash
npx ts-node scripts/seed-admin.ts
```
Atau insert manual ke DB:
```sql
INSERT INTO User (email, password, name, role) 
VALUES ('admin@lokerpekalonganraya.com', '<bcrypt_hash>', 'Admin', 'ADMIN');
```

### 5. Run Development
```bash
npm run dev
```

## Deploy ke Railway

### Setup Railway
1. Buat project baru di Railway
2. Add MySQL service
3. Set environment variables (sama seperti .env.local)
4. Connect GitHub repo → Railway auto-deploy

### Environment Variables Railway
```
DATABASE_URL           → dari Railway MySQL service
NEXTAUTH_SECRET        → generate random string
NEXTAUTH_URL           → https://your-app.railway.app
N8N_WEBHOOK_SECRET     → bebas, harus sama dengan n8n
N8N_INSTAGRAM_WEBHOOK_URL → URL n8n webhook kamu
NEXT_PUBLIC_APP_URL    → https://your-app.railway.app
```

## Integrasi n8n

### Apify → n8n → Website
1. **Apify Actor**: Set schedule scraping IG & FB
2. **n8n Webhook Trigger**: Terima data dari Apify
3. **n8n HTTP Request**: POST ke `/api/webhook/n8n`
   - Header: `x-webhook-secret: YOUR_SECRET`
   - Body: `{ "jobs": [ { "title": "...", "source": "SCRAPED_IG", ... } ] }`

### Website → n8n → Instagram (Auto-post)
Ketika admin approve loker featured:
1. API `/api/admin/jobs` trigger POST ke `N8N_INSTAGRAM_WEBHOOK_URL`
2. n8n proses → generate image → post ke Instagram

### n8n Webhook Payload Format
```json
{
  "jobs": [
    {
      "title": "Operator Produksi",
      "description": "Dicari operator...",
      "salary": "Rp 2.500.000",
      "city": "Pekalongan",
      "area": "KOTA_PEKALONGAN",
      "category": "Tekstil & Batik",
      "contactWa": "6281234567890",
      "source": "SCRAPED_IG",
      "sourceUrl": "https://instagram.com/p/xxx",
      "sourceImage": "https://cdn.instagram.com/..."
    }
  ]
}
```

## Halaman & Routes
| Route | Deskripsi |
|-------|-----------|
| `/` | Landing page + loker terbaru |
| `/loker` | Listing semua loker dengan filter |
| `/loker/[slug]` | Detail loker |
| `/login` | Login perusahaan/admin |
| `/daftar` | Registrasi perusahaan |
| `/dashboard` | Dashboard perusahaan |
| `/dashboard/pasang-loker` | Form pasang loker baru |
| `/admin` | Admin panel moderasi |
| `/api/webhook/n8n` | Webhook untuk n8n |
| `/api/jobs` | Public jobs API |
| `/api/admin/jobs` | Admin approve/reject API |

## Struktur Database
- **User**: Akun login (admin & company)
- **Company**: Profil perusahaan
- **Job**: Semua lowongan (manual + scraped)
- **WebhookLog**: Log semua webhook masuk

## Fitur Monetisasi
- **Featured Listing**: Rp 50.000/30 hari → loker tampil teratas + auto-post IG
- **Banner iklan**: Pasang di halaman listing (manual)
