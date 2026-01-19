# Full Stack Theme Engine App

**React + Redux Toolkit + Express (Serverless) + Prisma + PostgreSQL +
React Three Fiber**

A production-style full-stack system featuring real authentication,
session persistence, activity tracking, state-driven theming, and visual
feedback using 3D graphics.

This is not a demo toy --- it is a deployable, evolving platform that
mirrors how modern SaaS systems are built.

------------------------------------------------------------------------

## 🚀 Live Application

**Try it live --- hiring managers and engineers are encouraged to
register and explore.**

-   🌐 Frontend: https://fullstack-react-redux-ui.vercel.app
-   🔌 Backend API: https://fullstack-react-redux-api.vercel.app

Create an account, log in, change themes, and see state reflected
instantly --- including in 3D.

------------------------------------------------------------------------

## 🧠 What This App Demonstrates

-   Production-style authentication\
-   JWT session persistence + rehydration\
-   Protected routes (frontend + backend)\
-   Activity auditing\
-   Redux-driven theming engine\
-   Real-time UI + 3D visual feedback\
-   Serverless Express on Vercel\
-   Prisma + PostgreSQL integration\
-   Full TypeScript stack

------------------------------------------------------------------------

## 🧱 Tech Stack

### Frontend (`react-client`)

-   React + TypeScript\
-   Redux Toolkit\
-   React Router\
-   Async Thunks\
-   JWT-based auth flow\
-   LocalStorage session persistence\
-   Redux-driven Theme Engine\
-   React Three Fiber (Theme Cube / Orb)\
-   Activity feed UI\
-   Profile page (view/edit user profile)

### Backend (`server`)

-   Node.js + Express (Serverless on Vercel)\
-   TypeScript\
-   Prisma ORM\
-   PostgreSQL (Neon)\
-   JWT Authentication\
-   bcrypt password hashing\
-   Middleware-protected routes\
-   Manual CORS (Vercel-safe)\
-   Activity logging system\
-   Profile + password update endpoints

------------------------------------------------------------------------

## 🧩 Features

### Authentication System

-   User registration\
-   Secure login (JWT)\
-   Password hashing (bcrypt)\
-   Token validation endpoint: `GET /api/user/me`\
-   Redux auth slice with async thunks\
-   Session persistence via localStorage\
-   Auto rehydration on refresh\
-   Global logout

### Profile System

-   Profile page (frontend)\
-   Update name + email: `PUT /api/user/me`\
-   Change password: `PUT /api/user/password`\
-   Auth-protected endpoints (Bearer token required)

### Activity System

-   Logs: Registration, Login\
-   Stored in PostgreSQL\
-   Protected `/api/activity` route\
-   Redux activity slice\
-   Dashboard activity feed

### Theme Engine

-   Redux theme slice\
-   Modes: `identity`, `system`, `activity`\
-   Applied across auth pages, dashboard, buttons, titles\
-   Theme persists across navigation\
-   Settings page for live changes

### Visual Engine

-   React Three Fiber widget\
-   Rotating 3D geometry\
-   Color tied to active theme\
-   Animation reacts to state changes\
-   Visual proof of Redux state flow

------------------------------------------------------------------------

## 🗂️ Project Structure

    root/
    ├── react-client/
    │   ├── src/
    │   │   ├── features/
    │   │   │   ├── auth/
    │   │   │   ├── theme/
    │   │   │   ├── activity/
    │   │   ├── pages/
    │   │   ├── components/
    │   │   ├── routes/
    │   │   └── store/
    │
    ├── server/
    │   ├── api/
    │   ├── src/
    │   │   ├── routes/
    │   │   ├── middleware/
    │   │   ├── config/
    │   │   └── prisma/

------------------------------------------------------------------------

## 🧪 Local Development

### Backend

``` bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

`.env`:

    DATABASE_URL=postgres://...
    JWT_SECRET=your_secret

### Frontend

``` bash
cd react-client
npm install
npm run dev
```

------------------------------------------------------------------------

## ✅ Notes From Today's Debug Session

-   Fixed Prisma usage: removed invalid data field from `findUnique()`
    and used `select` correctly.\
-   Fixed TypeScript bcrypt errors: added missing bcrypt import in user
    routes.\
-   Added profile editing endpoint: `PUT /api/user/me`.\
-   Added password update endpoint: `PUT /api/user/password`.\
-   Fixed frontend API usage: removed incorrect
    `import { API } from "../api"`; now uses function exports.\
-   Added `updateMe()` helper in `react-client/src/api.ts`.\
-   Added Profile page + `/profile` protected route.\
-   Fixed header bug: ensure `Content-Type: application/json`.\
-   Deployment reminder: redeploy backend to expose new routes.

------------------------------------------------------------------------

## 🎯 Why This Project Matters

This project demonstrates:

-   Real authentication architecture\
-   Redux + async API flow\
-   JWT security patterns\
-   Session rehydration\
-   Activity auditing\
-   State-driven theming\
-   Visual UI feedback\
-   Serverless deployment\
-   Full TypeScript stack

This is not a tutorial app --- it is a production-style foundation built
to grow.

------------------------------------------------------------------------

## 👤 Author

**Built by:** Erick Esquilin\
**Purpose:** Portfolio-grade full-stack system\
**Status:** Actively evolving

### Live Demo

-   Frontend: https://fullstack-react-redux-ui.vercel.app\
-   API: https://fullstack-react-redux-api.vercel.app

**Hiring managers:**\
👉 Please register, log in, and explore --- the system is built to be
experienced.
