<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
``` -->


# 🧭 ProLinker — React + TypeScript + Strapi

**ProLinker** is a full-stack web app built with **React + TypeScript (Vite)** on the frontend and **Strapi** as the backend CMS.
It helps users connect with verified **professionals for hire** while managing authentication, profile listings, and responsive UI.

---

## ⚙️ Tech Stack

**Frontend**

* ⚛️ React 18 + TypeScript + Vite
* 🧰 Redux Toolkit + RTK Query
* 🎨 TailwindCSS (utility-first styling)
* 🧪 React Hook Form + Zod (form validation)
* 🌍 React Router v6 (routing & protected routes)
* 🧠 Axios-free API handling with RTK Query

**Backend**

* 🚀 Strapi (Headless CMS)
* 🗄️ SQLite (dev DB)
* 🔐 JWT Authentication (`/auth/local`, `/users/me`)
* 📦 REST API endpoints for `professionals`

---

## 🧩 Folder Structure

```
/src
  /app           → Redux store & typed hooks
  /api           → RTK Query APIs (authApi, prosApi, baseApi)
  /features
    /auth        → Login, Register, authSlice
    /pros        → Professionals list, detail, search
  /layout        → AppShell, HeaderNav, Footer
  /components    → Reusable UI (InputField, Button)
  /routes        → Route configs, ProtectedRoute
  /utils         → Helpers (strapi URL utils)
  /styles        → Global Tailwind styles
```

---

## 🔐 Authentication Flow

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

## 💼 Professionals Feature

* Fetches data from **Strapi `/professionals`** collection
* Displays: name, location, years in business, employees, image, and bio
* Integrated **search bar** for filtering professionals
* Fully responsive card grid layout

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

## 🧰 Environment Setup

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

* **`baseApi.ts`** — Configures base URL and auth headers
* **`authApi.ts`** — Handles login/register/me endpoints
* **`prosApi.ts`** — Fetches and transforms professionals into a flat array
* **TransformResponse** — Normalizes Strapi’s `{ id, attributes }` to `{ id, ...attributes }`

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

## 🧪 Testing (next phase)

**Unit tests**

* Framework: Jest + React Testing Library
Components tested:

InputField — label rendering, user input, ref forwarding

ServiceCard — image fallback, null handling, router link

Helper tested:

toAbsoluteUrl (Strapi URL utility)

| File                       | Statements | Branches | Functions | Lines    |
| -------------------------- | ---------- | -------- | --------- | -------- |
| InputField.tsx             | 100%       | 100%     | 100%      | 100%     |
| ServiceCard.tsx            | 100%       | 100%     | 100%      | 100%     |
| strapi.ts                  | 100%       | 100%     | 100%      | 100%     |
| **Total Project Coverage** | **100%**   | **100%** | **100%**  | **100%** |

Command to run full coverage:

npx vitest run --coverage
open coverage/index.html

🧩 Testing Strategy

The project follows a logic-first testing approach:

Components are tested in isolation using MemoryRouter where routing is required.

Helper utilities are tested directly for both happy and edge cases.

Coverage ensures all branches and conditions are executed.

Tests use clear and descriptive assertions (getByRole, toHaveValue, toHaveAttribute, etc.).

**E2E tests**

* Cypress for login/register flow, protected routes, and professionals search

🧩 E2E Testing (Cypress)

Cypress tests validate complete user journeys:

User registration and login flow

Navigation between pages (home, professionals)

Search and protected route access

Input validation and error handling

Example commands:

```bash
npm run test
npm run cypress:open
npm run cypress:run
```

🧾 Testing Documentation Summary

Unit tests achieved 100% coverage across all components and utilities, validating both normal and edge cases.
Cypress tests verify full user journeys including authentication, search, and navigation.
Together, these test suites ensure application stability, functionality, and confidence in future iterations.
---

## 📦 Deployment

* **Backend:** Deploy Strapi to Render, Railway, or Heroku
* **Frontend:** Deploy React app to Vercel or Netlify
* Update `VITE_API_URL` to your deployed Strapi endpoint.

---

## 🗺️ Roadmap

1. Profile view/edit page for authenticated professionals
2. Filter by category, location, and rating
3. Toast notifications for login/logout feedback
4. Image upload directly from frontend
5. Test coverage (Jest & Cypress)
6. Deploy live demo build

---

## 🖼️ Screenshots & Coverage Evidence

This section is reserved for screenshots and evaluation proof.
Paste your screenshots here before submission:

### ✅ Login Page

*(Insert screenshot here)*

### ✅ Professionals List with Search

*(Insert screenshot here)*

### ✅ Authenticated Header + Logout Dropdown

*(Insert screenshot here)*

### ✅ Test Coverage Report

*(Insert Jest/Cypress coverage screenshot here)*

### ✅ Cypress Test Runner

*(Insert Cypress green tests screenshot here)*

---

## 💡 Developer

👨🏽‍💻 **Ademola Adekilekun**
Built with ❤️ using React, TypeScript, and Strapi.
