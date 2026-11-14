# 🏛️ DivyaBharat — Heritage Learning Hub

> **Discover, Learn, and Celebrate the Sacred Heritage, History, and Culture of Bharat**

DivyaBharat is a full-stack educational and exploration web application dedicated to preserving, celebrating, and teaching the cultural, historical, and spiritual heritage of India. Built with **React 19**, **Node.js/Express**, and **MongoDB**, backed by Mongoose ODM.

---

## 🎨 Design Philosophy & Visual Identity

DivyaBharat follows a warm, royal Indian aesthetic inspired by traditional sandstone architecture, temple marigolds, and sacred rosewater:

- **Color Palette:**
  - **Cream / Warm Canvas:** `#fffdfb` / `#fdf3ed`
  - **Soft Peach:** `#fde8da` / `#e6ab82`
  - **Rose Pink Accent:** `#efb0b4`
  - **Deep Terracotta & Sandstone:** `#3c1f16` / `#6b2d1b` / `#8b2500`
  - **Gold Accents:** `#ffd700` / `#b45309`
- **Typography:**
  - Headings: `Cormorant Garamond` (classic, elegant serif)
  - Body & UI: `Inter` (clean, accessible sans-serif)
- **Authentic UI Components:**
  - Frosted glass cards, golden ornamental borders, and delicate curved arches.
  - Temple silhouettes, sacred Jyotirlinga highlights, and high-resolution state maps.

---

## 🗄️ Database Architecture (MongoDB + Mongoose)

- **Database Name:** `divyabharat`
- **Default Connection URI:** `mongodb://127.0.0.1:27017/divyabharat`

### Collections

| Collection | Model File | Purpose | Key Indexes |
| :--- | :--- | :--- | :--- |
| `users` | `server/models/User.js` | User profiles, auth credentials, roles | `email (unique)`, `role` |
| `temples` | `server/models/Temple.js` | Sacred temples, deities, architecture, timings | `state`, `isFeatured`, text search |
| `heritages` | `server/models/Heritage.js` | Monuments, UNESCO sites, festivals, art forms | `category`, `state`, text search |
| `states` | `server/models/State.js` | 28 Indian States & 8 Union Territories | `name (unique)`, `slug`, `region` |
| `categories` | `server/models/Category.js` | Cultural pillars (Temple, Monument, Festival, etc.) | `name (unique)` |
| `modules` | `server/models/Module.js` | Structured learning modules & lessons | `category`, `level` |
| `quizzes` | `server/models/Quiz.js` | Heritage quizzes & multiple-choice questions | `category`, `module` |
| `quizresults` | `server/models/QuizResult.js` | User quiz scores and completion records | `user`, `quiz` |
| `progresses` | `server/models/Progress.js` | User curriculum learning progress | `user`, `module` |
| `contactmessages`| `server/models/ContactMessage.js`| Explorer inquiries and support messages | `status`, `createdAt` |
| `feedbacks` | `server/models/Feedback.js` | Platform ratings, reviews, and feedback | `rating`, `createdAt` |

---

## ⚙️ Environment Configuration (`.env`)

```env
PORT=3000
SERVER_PORT=5000
CLIENT_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/divyabharat
MONGO_URI=mongodb://127.0.0.1:27017/divyabharat
JWT_SECRET=divyabharat_heritage_secret_2024_jwt_key_very_secure
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@divyabharat.in
ADMIN_PASSWORD=Admin@DivyaBharat2024
```

> **Security Note:** Neither database connection strings nor JWT secrets are ever exposed to the client-side React code.

---

## 🚀 Step-by-Step Setup & Windows Commands

### 1. Verify / Start MongoDB Windows Service
In Windows CMD or PowerShell:
```cmd
net start MongoDB
```
Or check status:
```cmd
sc query MongoDB
```

### 2. Seed Database with Initial Data
Populates all 36 Indian States & UTs, 18 sacred temples, 18 UNESCO heritage records, 7 categories, 3 modules, and 2 quizzes:
```cmd
npm run seed
```

### 3. Create or Reset Administrator Account
Run the secure admin creation script:
```cmd
npm run create-admin
```
Or with CLI arguments:
```cmd
node server/createAdmin.js admin@divyabharat.in Admin@DivyaBharat2024 "DivyaBharat Admin"
```

### 4. Start Backend Server
```cmd
npm run server
```
- Server runs on: `http://localhost:5000`
- API Root: `http://localhost:5000/api`
- Health check: `http://localhost:5000/api/health`

### 5. Start React Frontend
In a separate terminal:
```cmd
npm start
```
- Frontend application runs on: `http://localhost:3000`

### 6. Verify with MongoDB Shell (`mongosh`)
```cmd
mongosh
```
Inside the interactive shell:
```javascript
show dbs
use divyabharat
show collections
db.temples.find({ isFeatured: true }).pretty()
db.states.countDocuments()
db.users.find({}, { name: 1, email: 1, role: 1 })
```

---

## 🩺 System Health Check

Endpoint:
```http
GET /api/health
```

Example JSON response:
```json
{
  "success": true,
  "server": "ok",
  "database": "connected",
  "databaseName": "divyabharat",
  "uptime": 124.5,
  "timestamp": "2026-10-06T17:00:00.000Z"
}
```

---

## 🔑 Default Accounts

| Role | Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@divyabharat.in` | `Admin@DivyaBharat2024` | Full Admin Dashboard (`/admin`), Temples & Heritage CRUD, User role management. |
| **Teacher** | `teacher@divyabharat.in` | `Teacher@2024` | Curriculum access (`/teacher`), Module & Quiz management. |
| **Student** | `student@divyabharat.in` | `Student@2024` | Learning modules, Quizzes, Wishlist, Profile. |
| **Guest** | *Click "Skip → Explore as Guest"* | *None* | Public browsing of sacred temples, heritage, states, and history. |

---

## 📡 REST API Summary

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register new student or teacher account
- `POST /api/auth/login` — Authenticate and receive JWT token
- `POST /api/auth/logout` — Logout user
- `GET /api/auth/me` — Retrieve authenticated user profile (Private)
- `PUT /api/auth/profile` — Update profile details (Private)
- `PUT /api/auth/change-password` — Change password (Private)

### Temples (`/api/temples`)
- `GET /api/temples` — Search, filter by state, deity, architecture; pagination
- `GET /api/temples/:id` — Get temple by ID or slug with related shrines
- `POST /api/temples` — Create new temple (Admin)
- `PUT /api/temples/:id` — Update temple details (Admin)
- `DELETE /api/temples/:id` — Delete temple (Admin)

### States & Union Territories (`/api/states`)
- `GET /api/states` — List all 36 Indian states and UTs
- `GET /api/states/:name` — Get state detail, heritage sites, and temples
- `POST /api/states` — Add new state (Admin)
- `PUT /api/states/:id` — Update state information (Admin)
- `DELETE /api/states/:id` — Delete state (Admin)

### Heritage (`/api/heritage`)
- `GET /api/heritage` — Search, filter by category/state, pagination
- `GET /api/heritage/:id` — Get heritage record and related sites
- `POST /api/heritage` — Submit heritage place (Admin/Teacher)
- `PUT /api/heritage/:id` — Update heritage record (Admin)
- `PUT /api/heritage/:id/status` — Approve/Reject submission (Admin)
- `DELETE /api/heritage/:id` — Delete heritage record (Admin)

### Inquiries & Feedback (`/api/contact`, `/api/feedback`)
- `POST /api/contact` — Submit inquiry message
- `GET /api/contact` — View inquiries (Admin)
- `POST /api/feedback` — Submit platform review & rating
- `GET /api/feedback` — View public reviews

---

## 💾 MongoDB Backup & Restore

### Backup database
```cmd
mongodump --db=divyabharat --out=C:\backup\divyabharat
```

### Restore database
```cmd
mongorestore --db=divyabharat C:\backup\divyabharat\divyabharat
```

---

## 🛡️ License & Sources

Cross-referenced with verified records from:
- **UNESCO World Heritage Centre** ([whc.unesco.org](https://whc.unesco.org))
- **Archaeological Survey of India (ASI)** ([asi.nic.in](https://asi.nic.in))
- **Ministry of Culture, Government of India** ([indiaculture.gov.in](https://indiaculture.gov.in))
