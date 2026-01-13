# Full Stack Auth App

React + Redux Toolkit + Express + Prisma + PostgreSQL

A full-stack authentication system built with a modern frontend and
backend stack.\
This project focuses on real-world authentication flow: register, login,
JWT, protected routes, Redux state management, and session rehydration.

------------------------------------------------------------------------

## Tech Stack

### Frontend (react-client)

-   React + TypeScript
-   Redux Toolkit
-   React Router
-   Async Thunks
-   JWT-based auth flow
-   LocalStorage session persistence

### Backend (server)

-   Node.js + Express
-   TypeScript
-   Prisma ORM
-   PostgreSQL
-   JWT Authentication
-   bcrypt password hashing
-   Middleware-protected routes

------------------------------------------------------------------------
## Database Setup

This project uses PostgreSQL.

### Local Development

For local development, you must have PostgreSQL installed and running:

- Install PostgreSQL from: https://www.postgresql.org/download/
- Create a database (example: `fullstack_app`)
- Set your `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/fullstack_app"


Run migrations:

npx prisma migrate dev

Production / Cloud

In production, you can swap the connection string to any hosted PostgreSQL provider:

Supabase

Neon

Railway

Render

AWS RDS

No code changes needed — only the DATABASE_URL.

it’s local by default, but **not locked to local**

------------------------------------------------------------------------

### Features

-   Register new users
-   Login with JWT
-   Password hashing with bcrypt
-   Protected routes (frontend + backend)
-   Redux auth slice with async thunks
-   Persist auth state with localStorage
-   Auto rehydrate session on refresh
-   `/api/users/me` to validate token on load
-   Logout clears session everywhere

------------------------------------------------------------------------

## Project Structure

    root/
    ├── react-client/
    │   ├── src/
    │   │   ├── features/auth/
    │   │   ├── pages/
    │   │   ├── routes/
    │   │   ├── components/
    │   │   └── store/
    │
    ├── server/
    │   ├── src/
    │   │   ├── routes/
    │   │   ├── middleware/
    │   │   ├── config/
    │   │   └── prisma/

------------------------------------------------------------------------

### Getting Started

### Backend

``` bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Create `.env`:

``` env
DATABASE_URL=postgres://...
JWT_SECRET=your_secret
```

### Frontend

``` bash
cd react-client
npm install
npm run dev
```

------------------------------------------------------------------------

## Auth Flow

1.  Register → hashed password stored
2.  Login → JWT returned + saved
3.  Redux stores token + user
4.  On refresh:
    -   token exists → `/api/users/me` called
    -   if valid → user restored
    -   if invalid → auto logout
5.  Protected routes require auth

------------------------------------------------------------------------

## Lessons Learned

### Frontend

-   Redux Toolkit async thunks simplify API flow
-   TypeScript forces correct state usage early
-   Auth UX feels "real" only after session rehydration
-   Routing + auth must be tightly integrated
-   Small selector mistakes can break entire flows

### Backend

-   JWT middleware is critical for security
-   Prisma requires strict schema consistency
-   Error handling must be explicit to avoid silent failures
-   Hashing + token creation order matters
-   Token validation endpoints are essential

### General

-   Full-stack debugging requires reading both sides
-   Logging is more important than guessing
-   Real auth systems are about *flow*, not just endpoints

------------------------------------------------------------------------

## Near-Future Work

### React Client

-   Improve UI/UX styling
-   Add loading skeletons
-   Add toast notifications
-   Better form validation
-   Password visibility toggle
-   Remember-me checkbox
-   Profile page
-   Settings page
-   Role-based UI rendering
-   Add React Three Fiber visual feature for flair

### Server

-   Refresh tokens
-   Token blacklisting
-   Email verification
-   Password reset flow
-   Rate limiting
-   Input validation middleware
-   Role-based authorization
-   Audit logging

------------------------------------------------------------------------

## Long-Term Ideas

-   Multi-factor authentication
-   OAuth login (Google/GitHub)
-   Admin dashboard
-   Activity logs
-   User preferences
-   Dark/light mode persistence

------------------------------------------------------------------------

## Why This Project Matters

This project demonstrates:

-   Real authentication architecture
-   Redux + async API handling
-   JWT security flow
-   Full-stack integration
-   Type-safe development
-   Production-style auth patterns

This is not a tutorial app --- it's a foundation for real applications.

------------------------------------------------------------------------

## Author

Built by: **Erick Esquilin**\
Purpose: Portfolio-grade full stack authentication system\
Status: Actively improving and expanding
