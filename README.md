# 📚 Library Management API

RESTful API untuk manajemen perpustakaan digital.

## 🚀 Fitur

- Autentikasi JWT (Register & Login)
- Manajemen Buku (CRUD)
- Sistem Peminjaman & Pengembalian
- Validasi Input dengan Zod
- Dokumentasi Swagger UI
- Password Hashing dengan bcrypt
- Transaksi Database

## 🛠️ Tech Stack

- Node.js + Express.js 5
- MySQL + mysql2
- JWT untuk autentikasi
- Zod untuk validasi
- Swagger UI untuk dokumentasi

## ⚙️ Setup Lokal

### 1. Clone & Install
\`\`\`bash
git clone <your-repo-url>
cd capstone-library-api
npm install
\`\`\`

### 2. Setup Environment
\`\`\`bash
cp .env.example .env
# Edit .env dengan konfigurasi database Anda
\`\`\`

### 3. Setup Database
\`\`\`sql
CREATE DATABASE library_db;
\`\`\`

### 4. Run Seeder
\`\`\`bash
npm run seed
\`\`\`

### 5. Jalankan Server
\`\`\`bash
npm run dev  # Development
npm start    # Production
\`\`\`

### 6. Buka Swagger
\`http://localhost:3000/api-docs\`

## 🌐 API Endpoints

| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| POST | /auth/register | Register user | ❌ |
| POST | /auth/login | Login user | ❌ |
| GET | /books | Get semua buku | ✅ |
| GET | /books/:id | Get buku by ID | ✅ |
| POST | /books | Tambah buku | ✅ |
| PUT | /books/:id | Update buku | ✅ |
| DELETE | /books/:id | Hapus buku | ✅ |
| GET | /borrow | Get semua peminjaman | ✅ |
| POST | /borrow | Pinjam buku | ✅ |
| PUT | /borrow/return/:id | Kembalikan buku | ✅ |

## 📊 ERD

\`\`\`
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│    users    │     │  borrowings  │     │    books    │
├─────────────┤     ├──────────────┤     ├─────────────┤
│ id (PK)     │───┐ │ id (PK)      │  ┌──│ id (PK)     │
│ name        │   └─│ user_id (FK) │  │  │ title       │
│ email       │     │ book_id (FK) │──┘  │ author      │
│ password    │     │ borrow_date  │     │ stock       │
└─────────────┘     │ return_date  │     └─────────────┘
                    └──────────────┘
\`\`\`

## 🔗 Deployment

**URL API:** https://library-api-capstone-production-bc03.up.railway.app  
**Swagger UI:** https://library-api-capstone-production-bc03.up.railway.app/api-docs

## 📁 Environment Variables

| Variable | Deskripsi |
|----------|-----------|
| PORT | Port server |
| DB_HOST | Host database |
| DB_USER | Username database |
| DB_PASSWORD | Password database |
| DB_NAME | Nama database |
| JWT_SECRET | Secret key JWT |

## 👨‍💻 Author

[Nama Anda] - Capstone Project Neo Telemetri 2026
