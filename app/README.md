# Prome — React + TypeScript + Strapi

**Prome** is a full-stack web app built with **React + TypeScript (Vite)** on the frontend and **Strapi** as the backend CMS.
It helps users connect with verified **professionals for hire** while managing authentication, profile listings, and responsive UI.

---

## ⚙️ Tech Stack

**Frontend**

- ⚛️ React 18 + TypeScript + Vite
- 🧰 Redux Toolkit + RTK Query
- 🎨 TailwindCSS (utility-first styling)
- 🧪 React Hook Form + Zod (form validation)
- 🌍 React Router v6 (routing & protected routes)
- 🧠 Axios-free API handling with RTK Query

**Backend**

- 🚀 Strapi (Headless CMS)
- 🗄️ SQLite (dev DB)
- 🔐 JWT Authentication (`/auth/local`, `/users/me`)
- 📦 REST API endpoints for `professionals`

---

## 🧩 Folder Structure

```
/src
  /api           → RTK Query APIs (authApi, prosApi, baseApi)
  /app           → Redux store & typed hooks
  /features
    /auth        → Login, Register, authSlice
  /layout        → AppShell, HeaderNav, Footer
  /components    → Reusable UI (InputField, ServiceCard, ServiceCarousel)
  /utils         → Helpers (strapi URL utils)
  /pages        → Professionals
      /pros        → Professionals list, detail
      Home
  /assets
    images

---

## Authentication Flow

| Action     | Endpoint                    | Description                     |
| ---------- | --------------------------- | ------------------------------- |
| Register   | `POST /auth/local/register` | Creates new user in Strapi      |
| Login      | `POST /auth/local`          | Returns `{ jwt, user }`         |
| Fetch user | `GET /users/me`             | Fetches authenticated user info |
| Logout     | local only                  | Clears Redux + localStorage JWT |

✅ Token is persisted in `localStorage` under `VITE_JWT_STORAGE_KEY`.
✅ Redux state (`authSlice`) syncs authentication across the app.
✅ The user’s name and initial appear in the header with a responsive **logout dropdown**.

---

## Professionals Feature

- Fetches data from **Strapi `/professionals`** collection
- Displays: name, location, years in business, employees, image, and bio
- Integrated **search bar** for filtering professionals
- Fully responsive card grid layout

### Example Strapi `Professional` fields:

| Field             | Type      | Example                        |
| ----------------- | --------- | ------------------------------ |
| name              | Text      | “Kelechi Okafor Enterprises”   |
| about             | Rich text | “Our team blends experience…”  |
| location          | Text      | “Owerri”                       |
| category          | Text      | “EventService”                 |
| hires             | Number    | 782                            |
| years_in_business | Number    | 8                              |
| employees         | Number    | 9                              |
| images            | Component | `{ image_url, thumbnail_url }` |

---

## Environment Setup

### Backend (.env)

```
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
JWT_SECRET=your_secret_here
```

### Frontend (.env.local)

```
VITE_API_URL=http://localhost:1337/api
VITE_AVATAR_API=https://ui-avatars.com/api
VITE_JWT_STORAGE_KEY=pl_token
```

Make sure Strapi CORS allows `http://localhost:5173`.

---

## 🚀 Running Locally

### 1️⃣ Start Strapi

```bash
cd backend
npm install
npm run develop
```

### 2️⃣ Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend → `http://localhost:5173`
Backend → `http://localhost:1337/admin`

---

## 🔄 API Integration (RTK Query)

- **`baseApi.ts`** — Configures base URL and auth headers
- **`authApi.ts`** — Handles login/register/me endpoints
- **`prosApi.ts`** — Fetches and transforms professionals into a flat array
- **TransformResponse** — Normalizes Strapi’s `{ id, attributes }` to `{ id, ...attributes }`

---

## 🔁 Core Features Implemented

✅ Authentication (login, register, logou)
✅ Logout clears Redux + localStorage
✅ Header shows authenticated user + responsive logout dropdown
✅ Fetch & render professionals with search
✅ ProtectedRoute to restrict access
✅ Type-safe API layer with RTK Query
✅ Responsive, accessible Tailwind UI

---

## 🧪 Testing

### 🧩 Unit Tests (Jest + React Testing Library)

**Coverage Summary**

--------------------------|---------|----------|---------|---------|-------------------
File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------|---------|----------|---------|---------|-------------------
All files                 |   81.14 |    70.44 |   68.05 |   82.95 |                   
 api                      |   25.58 |        0 |   18.18 |   26.19 |                   
  authApi.ts              |      50 |      100 |      25 |      50 | 18-26             
  baseApi.ts              |   33.33 |        0 |      50 |      40 | 9-11              
  prosApi.ts              |      15 |        0 |   11.11 |      15 | 18-57             
  servicesApi.ts          |   27.27 |        0 |   14.28 |   27.27 | 34-56             
  strapi.types.ts         |       0 |        0 |       0 |       0 |                   
 app                      |     100 |      100 |     100 |     100 |                   
  hooks.ts                |     100 |      100 |     100 |     100 |                   
 component                |   83.87 |    68.18 |    87.5 |   96.29 |                   
  InputField.tsx          |     100 |      100 |     100 |     100 |                   
  ServiceCard.tsx         |     100 |      100 |     100 |     100 |                   
  ServiceCarousel.tsx     |   79.16 |       50 |   83.33 |      95 | 69                
 config                   |     100 |      100 |     100 |     100 |                   
  constants.ts            |     100 |      100 |     100 |     100 |                   
 features/auth            |      95 |    82.14 |     100 |   94.91 |                   
  Login.tsx               |   95.65 |    79.16 |     100 |   95.45 | 64                
  Register.tsx            |      92 |    84.37 |     100 |      92 | 57,77             
  authSlice.ts            |     100 |      100 |     100 |     100 |                   
 layout                   |   91.48 |    73.33 |   83.33 |   97.36 |                   
  AppLayout.tsx           |     100 |      100 |     100 |     100 |                   
  Footer.tsx              |     100 |      100 |     100 |     100 |                   
  HeaderNav.tsx           |   90.47 |    73.33 |      80 |   96.96 | 37                
  MainLayout.tsx          |     100 |      100 |     100 |     100 |                   
 pages                    |     100 |      100 |     100 |     100 |                   
  Home.tsx                |     100 |      100 |     100 |     100 |                   
 pages/professionals      |   95.65 |    72.72 |      90 |   95.23 |                   
  ProfessionalProfile.tsx |   93.75 |       60 |   66.66 |   92.85 | 37                
  Professionals.tsx       |   96.66 |    77.19 |     100 |   96.42 | 54                
 utils                    |     100 |      100 |     100 |     100 |                   
  strapi.ts               |     100 |      100 |     100 |     100 |                   
--------------------------|---------|----------|---------|---------|-------------------

**Highlights**

- ✅ **Overall coverage:** 81%+ statements and 82%+ lines across the project
- ✅ 100% coverage on all key utilities (`strapi.ts`), hooks, and configuration files
- ✅ Near-perfect coverage on authentication (`Login`, `Register`, `authSlice`)
- ✅ Strong component test coverage (InputField, ServiceCard, ServiceCarousel)
- 🧠 APIs have partial coverage (mocked via RTK Query); integration covered via Cypress

**Command to run coverage:**

````bash
npx vitest run --coverage
open coverage/index.html


Testing Strategy

The project follows a logic-first testing approach:

Components are tested in isolation using BrowserRouter where routing is required.

Helper utilities are tested directly for both happy and edge cases.

Coverage ensures all branches and conditions are executed.

Tests use clear and descriptive assertions (getByRole, toHaveValue, toHaveAttribute, etc.).

**E2E tests**

* Cypress for login/register flow, protected routes, and professionals search

E2E Testing (Cypress)

Cypress tests validate complete user journeys:

User registration and login flow


Search and protected route access

User user journey

Example commands:

```bash
npm run test
npm run cypress:open
npm run cypress:run
````

Testing Documentation Summary

Unit tests achieved 81%+ coverage across all components and utilities, validating both normal and edge cases.
Cypress tests verify full user journeys including authentication, search, and navigation.
Together, these test suites ensure application stability, functionality, and confidence in future iterations.

---

## Deployment

- **Backend:** Deploy Strapi to Render, Railway, or Heroku
- **Frontend:** Deploy React app to Vercel or Netlify
- Update `VITE_API_URL` to your deployed Strapi endpoint.

---

## Roadmap

1. Profile view/edit page for authenticated professionals
2. Filter by category, location, and rating
3. Toast notifications for login/logout feedback
4. Image upload directly from frontend
5. Test coverage (Jest & Cypress)
6. Deploy live demo build

---

## Screenshots & Coverage Evidence

This section is reserved for screenshots and evaluation proof.
Paste your screenshots here before submission:

### Login Page

![Login Page]("./src/assets/screenshots/ScreenshotLoginScreen.png")

### Professionals List with Search

![Professional List]("./src/assets/screenshots/ScreenshotProfessionalList.png")

### Authenticated Header + Logout Dropdown

![Authenticated Header Screenshot]("./src/assets/screenshots/ScreenshotHeaderLogout.png")

### Test Coverage Report

![Coverage Report Screenshot]("./src/assets/screenshots/ScreenshotTestCoverage.png")

## 💡 Developer

👨🏽‍💻 **Timilehin Kudaisi**
Built with using React, TypeScript, and Strapi.
