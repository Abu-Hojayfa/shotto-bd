# 🏛️ Shotto-BD — Government Transparency Platform

> A full-stack civic platform empowering Bangladeshi citizens to report corruption, know their legal rights, and track government accountability — built with React, Node.js, and MongoDB.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#1-frontend-setup)
  - [Backend Setup](#2-backend-setup)
- [Environment Variables](#-environment-variables)
  - [Frontend (.env)](#frontend-env)
  - [Backend (.env)](#backend-env)
- [API Reference](#-api-reference)
- [User Roles](#-user-roles)
- [Docker](#-docker)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

Shotto-BD is a government transparency platform where citizens can:

- **Report corruption** with evidence and track the status of their reports
- **Know their rights** via an AI-powered legal chatbot (Shotto-AI) that cites real Bangladesh laws
- **Manage their profile** with full account settings, password management, and notification preferences

The platform is split into two independent codebases:

| Part | Location | Purpose |
|---|---|---|
| **Frontend** | `/` (this repo) | React + Vite SPA |
| **Backend** | separate folder | Node.js + Express REST API |

---

## ✨ Features

### Citizen-facing
- 🔐 **Authentication** — Signup, login, JWT-based sessions with auto token refresh
- 👤 **Profile management** — Edit personal info, change password, delete account
- 🤖 **Shotto-AI chatbot** — AI legal advocate powered by Groq (Llama 3.3 70B, free tier), cites Article numbers and gives concrete action steps
- 📊 **Dashboard** — View submitted and resolved reports
- 🌙 **Dark/light mode** — via `next-themes`

### Platform
- 🛡️ **Role-based access** — citizen, official, journalist, auditor, admin
- ⚡ **Rate limiting** — brute-force protection on auth endpoints
- 🔄 **Silent token refresh** — HttpOnly cookie refresh token, no manual re-login
- 🌐 **Bilingual** — Shotto-AI responds in English or Bangla based on the user's language

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI framework |
| Vite | 6.3.5 | Build tool & dev server |
| React Router | 7.13.0 | Client-side routing |
| Tailwind CSS | 4.1.12 | Styling |
| shadcn/ui + Radix UI | latest | Component library |
| Motion (Framer) | 12.x | Animations |
| MUI | 7.3.x | Additional components |
| Lucide React | 0.487.0 | Icons |
| Recharts | 2.15.2 | Charts & data visualization |
| Groq SDK (via fetch) | — | Free AI (Llama 3.3 70B) |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 4.18.x | Web framework |
| TypeScript | 5.4.x | Type safety |
| MongoDB + Mongoose | 8.3.x | Database & ODM |
| JSON Web Token | 9.0.x | Authentication |
| bcryptjs | 2.4.x | Password hashing |
| express-validator | 7.x | Input validation |
| express-rate-limit | 7.x | Rate limiting |
| Helmet | 7.x | Security headers |
| Morgan | 1.10.x | Request logging |
| cookie-parser | 1.4.x | HttpOnly cookie support |

---

## 📁 Project Structure

```
shotto-bd/                          ← Frontend (this repo)
├── src/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── Profile.jsx         ← User profile & settings
│   │   │   ├── Chatbot.jsx         ← Shotto-AI legal chatbot
│   │   │   └── ...
│   │   ├── shared/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── GlassCard.jsx
│   │   └── ui/                     ← shadcn/ui components
│   ├── services/
│   │   ├── api.js                  ← Central fetch wrapper + token handling
│   │   ├── auth.service.js         ← login, signup, logout
│   │   └── user.service.js         ← profile, change-password, delete
│   └── main.jsx
├── index.html
├── vite.config.ts
├── package.json
└── .env                            ← ⚠️ you must create this

backend/                            ← Backend (separate folder)
├── src/
│   ├── types/index.ts              ← Shared TypeScript types
│   ├── constants/index.ts          ← App-wide constants
│   ├── config/db.ts                ← MongoDB connection
│   ├── models/User.ts              ← User schema
│   ├── validators/
│   │   ├── auth.validator.ts
│   │   └── user.validator.ts
│   ├── middleware/
│   │   ├── auth.ts                 ← protect + authorize guards
│   │   ├── rateLimiter.ts
│   │   └── errorHandler.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── response.ts
│   │   └── validation.ts
│   ├── server.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── .env                            ← ⚠️ you must create this
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- **Node.js** v18 or higher → [nodejs.org](https://nodejs.org)
- **pnpm** (frontend uses pnpm workspaces) → `npm install -g pnpm`
- **MongoDB** — either [MongoDB Atlas](https://www.mongodb.com/atlas) (free cloud) or local install
- **Groq API key** (free) → [console.groq.com](https://console.groq.com)

---

### 1. Frontend Setup

```bash
# Clone the repo
git clone https://github.com/Abu-Hojayfa/shotto-bd.git
cd shotto-bd

# Install dependencies (uses pnpm)
pnpm install

# Create your environment file
cp .env.example .env
# → then fill in the values (see Environment Variables section below)

# Start the dev server
pnpm dev
```

The frontend will be available at **http://localhost:5173**

---

### 2. Backend Setup

```bash
# Go into the backend folder
cd backend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
# → then fill in the values (see Environment Variables section below)

# Start the backend in development mode (hot reload)
npm run dev
```

The API will be available at **http://localhost:5000**

To verify it's running, open: **http://localhost:5000/health**

---

## 🔐 Environment Variables

### Frontend `.env`

Create a file called `.env` in the **root of the frontend** (`shotto-bd/`):

```env
# Backend API URL — where your Express server is running
VITE_API_URL=http://localhost:5000/api

# Groq API key for Shotto-AI chatbot (free tier)
# Get yours at: https://console.groq.com → API Keys → Create key
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **Note:** All frontend env variables must start with `VITE_` to be accessible in the browser.

---

### Backend `.env`

Create a file called `.env` in the **backend folder** (`backend/`):

```env
# ── Server ────────────────────────────────────────────────
PORT=5000
NODE_ENV=development

# ── MongoDB ───────────────────────────────────────────────
# Option A: MongoDB Atlas (recommended for production)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/shotto_bd?retryWrites=true&w=majority

# Option B: Local MongoDB
# MONGODB_URI=mongodb://localhost:27017/shotto_bd

# ── JWT Access Token ──────────────────────────────────────
# Used for short-lived API authentication (default: 7 days)
# Generate a strong secret: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRES_IN=7d

# ── JWT Refresh Token ─────────────────────────────────────
# Used for silent token refresh via HttpOnly cookie (default: 30 days)
# Must be DIFFERENT from JWT_SECRET
JWT_REFRESH_SECRET=your_different_refresh_secret_minimum_32_characters
JWT_REFRESH_EXPIRES_IN=30d

# ── CORS ──────────────────────────────────────────────────
# The URL of your frontend — must match exactly (no trailing slash)
CLIENT_URL=http://localhost:5173

# ── Bcrypt ────────────────────────────────────────────────
# Cost factor for password hashing (12 is a good balance of security/speed)
BCRYPT_SALT_ROUNDS=12
```

#### How to generate secure secrets

Run this in your terminal to generate a cryptographically secure random string:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Run it **twice** — once for `JWT_SECRET` and once for `JWT_REFRESH_SECRET`. They must be different.

#### Getting a MongoDB Atlas URI (free tier)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) → Create free account
2. Create a free **M0 cluster** (no credit card needed)
3. Under **Database Access** → Add a new user with a password
4. Under **Network Access** → Add `0.0.0.0/0` (allow all IPs) for development
5. Under **Clusters** → Connect → Drivers → Copy the connection string
6. Replace `<username>` and `<password>` in the string and paste into `MONGODB_URI`

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

### Auth endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/signup` | ❌ | Register a new account |
| `POST` | `/auth/login` | ❌ | Login, returns access token |
| `POST` | `/auth/logout` | ✅ | Logout, clears refresh cookie |
| `POST` | `/auth/refresh` | 🍪 cookie | Get new access token |
| `GET` | `/auth/me` | ✅ | Get current user info |

### User endpoints (all require `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/users/profile` | Get full profile |
| `PUT` | `/users/profile` | Update name, phone, location, org |
| `PUT` | `/users/change-password` | Change password |
| `DELETE` | `/users/account` | Deactivate account |

### Request / Response format

**Signup request body:**
```json
{
  "fullName": "Ahmed Rahman",
  "email": "ahmed@example.com",
  "password": "mypassword123",
  "role": "citizen",
  "phone": "+880 1712-345678",
  "organization": "BRAC"
}
```

**Successful response shape:**
```json
{
  "success": true,
  "message": "Account created successfully.",
  "data": {
    "accessToken": "eyJhbGci...",
    "user": { "id": "...", "fullName": "Ahmed Rahman", "role": "citizen" }
  }
}
```

**Error response shape:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please provide a valid email" }
  ]
}
```

---

## 👥 User Roles

| Role | Description | Auto-approved? |
|---|---|---|
| `citizen` | Regular public user — can view data and submit reports | ✅ Yes |
| `official` | Government official — manages ministry data | ❌ Needs admin approval |
| `journalist` | Verified press — access to press-level data | ❌ Needs admin approval |
| `auditor` | Independent auditor — read-only access to all data | ❌ Needs admin approval |
| `admin` | Super admin — full platform access | ❌ Created manually in DB |

> **Note:** Admin accounts cannot be created via the signup endpoint. To create the first admin, insert directly into MongoDB and set `role: "admin"` and `isApproved: true`.

---

## 🐳 Docker

The repo includes a `Dockerfile` for containerised deployment.

```bash
# Build the image
docker build -t shotto-bd .

# Run the container
docker run -p 5173:5173 --env-file .env shotto-bd
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow the existing code style. The backend uses TypeScript strictly — run `npm run build` before submitting to ensure zero type errors.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🆘 Common Issues

**`401 Unauthorized` on profile page**
→ Your login handler is not saving the token correctly. Make sure after login you run:
```js
localStorage.setItem('token', data.data.accessToken);
```

**`422 Unprocessable Entity` on change password**
→ New password must be at least 8 characters. Check that all three fields (current, new, confirm) are filled and that new === confirm.

**`CORS error` in browser**
→ Make sure `CLIENT_URL` in your backend `.env` exactly matches the URL your frontend runs on (e.g. `http://localhost:5173`, no trailing slash).

**Groq chatbot not responding**
→ Check that `VITE_GROQ_API_KEY` is set in the frontend `.env` and starts with `gsk_`. Restart `pnpm dev` after changing `.env` files.

**MongoDB connection failed**
→ Check that your Atlas cluster's Network Access includes your IP (or `0.0.0.0/0`). Verify the username/password in the URI has no special characters that need URL-encoding.
