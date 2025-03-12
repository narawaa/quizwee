# QuizWee Backend!

## 🚀 Getting Started

### 1. Clone Repository

```sh
git clone <repository-url>
cd back
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Buat File Konfigurasi `.env`

Buat file `.env` dan tambahkan konfigurasi database PostgreSQL.

### 4. Menjalankan Server

```sh
npm run dev
```

## 🗄️ Setup Database PostgreSQL

### 1. Buat Database PostgreSQL

Buka terminal dan jalankan perintah berikut untuk masuk ke PostgreSQL:

```sh
psql -U postgres
```

Lalu buat database baru:

```sql
CREATE DATABASE tryout_db;
```

Keluar dari psql dengan mengetik:

```sh
\q
```

### 2. Buat Tabel di Database

Setelah database dibuat, jalankan perintah berikut untuk membuat tabel `tryout_db`:

```sh
psql -U postgres -d tryout_db
```

Lalu jalankan query berikut:

```sql
CREATE TABLE tryout_db (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    end_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isactive BOOLEAN DEFAULT TRUE
);
```

Keluar dengan mengetik `\q`.

### 3. Insert Data Dummy (Opsional)

Jika ingin menambahkan data awal untuk pengujian:

```sql
INSERT INTO tryout_db (name, description, end_time, isactive)
VALUES ('Tryout 1', 'Deskripsi tryout', '2025-03-20 14:00:00', TRUE);
```

## 📜 API Endpoints

| Method | Endpoint                       | Description                     |
| ------ | ------------------------------ | ------------------------------- |
| GET    | `/api/tryout`                  | Mendapatkan daftar tryout       |
| POST   | `/api/tryout`                  | Membuat tryout baru             |
| PUT    | `/api/tryout/:id`              | Memperbarui tryout              |
| DELETE | `/api/tryout/:id`              | Menghapus tryout                |
| GET    | `/api/tryout/search?q=<query>` | Mencari tryout berdasarkan nama |

## 🔗 Dokumentasi Swagger

Setelah server berjalan, buka **http://localhost:3001/api-docs** untuk melihat dokumentasi Swagger.

## 🛠 Tools & Technologies

- **Express.js** - Backend Framework
- **PostgreSQL** - Database
- **Swagger** - API Documentation
- **Nodemon** - Auto-restart server saat perubahan

## 📌 Notes

- Pastikan PostgreSQL sudah terinstall sebelum menjalankan database.
- Jangan lupa mengganti credential database sesuai konfigurasi lokalmu.

---

Sekian dokumentasi untuk backend ini. Terima Kasih!
