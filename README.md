# Full Stack Theme Engine App

React + Redux Toolkit + Express + Prisma + PostgreSQL + R3F

A full-stack application combining real authentication, session persistence, activity tracking, and a visual theme engine.  
This project goes beyond basic auth and into state-driven UI, theming, and visual feedback using React Three Fiber.

------------------------------------------------------------------------

## Tech Stack

### Frontend (react-client)

- React + TypeScript  
- Redux Toolkit  
- React Router  
- Async Thunks  
- JWT-based auth flow  
- LocalStorage session persistence  
- Theme Engine (Redux-driven)  
- React Three Fiber (Theme Orb)  
- Activity feed UI  

### Backend (server)

- Node.js + Express  
- TypeScript  
- Prisma ORM  
- PostgreSQL  
- JWT Authentication  
- bcrypt password hashing  
- Middleware-protected routes  
- Activity logging system  

------------------------------------------------------------------------

## Database Setup

This project uses PostgreSQL.

### Local Development

PostgreSQL must be installed locally by default:

- Install PostgreSQL from: https://www.postgresql.org/download/  
- Create a database (example: `fullstackdb`)  
- Set your `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/fullstackdb"
```

Run migrations:

```bash
npx prisma migrate dev
npx prisma generate
```

### Production / Cloud

You can replace the connection string with any hosted PostgreSQL:

- Supabase  
- Neon  
- Railway  
- Render  
- AWS RDS  

No code changes required — only the DATABASE_URL.  
Local is default, but it is not locked to local.

------------------------------------------------------------------------

## Features

### Auth System

- Register new users  
- Login with JWT  
- Password hashing with bcrypt  
- Protected routes (frontend + backend)  
- Redux auth slice with async thunks  
- Persist auth state with localStorage  
- Auto rehydrate session on refresh  
- `/api/user/me` validates token on load  
- Logout clears session everywhere  

### Activity System

- Logs user actions:
  - Register
  - Login  
- Stored in PostgreSQL  
- Protected `/api/activity` endpoint  
- Redux activity slice  
- Dashboard activity feed  

### Theme Engine

- Redux theme slice  
- Theme modes:
  - identity
  - system
  - activity  
- Theme applied across:
  - Login page  
  - Register page  
  - Dashboard  
  - Buttons  
  - Titles  
- Theme persists across navigation  
- Settings page to change theme  

### Visual Engine

- React Three Fiber widget  
- Theme Orb / rotating geometry  
- Color reacts to active theme  
- Animated feedback on theme change  
- Visual proof of state-driven UI  

------------------------------------------------------------------------

## Project Structure

```
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
│   │   └── store
│
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── prisma/
```

------------------------------------------------------------------------

## Getting Started

### Backend

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Create `.env`:

```env
DATABASE_URL=postgres://...
JWT_SECRET=your_secret
```

### Frontend

```bash
cd react-client
npm install
npm run dev
```

------------------------------------------------------------------------

## Auth Flow

1. Register → password hashed  
2. Login → JWT returned + saved  
3. Redux stores token + user  
4. On refresh:
   - token exists → `/api/user/me` called  
   - valid → user restored  
   - invalid → auto logout  
5. Protected routes require auth  

------------------------------------------------------------------------

## Activity Flow

1. User registers → activity logged  
2. User logs in → activity logged  
3. Dashboard loads → `/api/activity` fetched with JWT  
4. Redux stores activity list  
5. UI renders recent actions  

------------------------------------------------------------------------

## Theme Engine Flow

1. Theme selected in Settings  
2. Redux theme state updates  
3. UI restyles instantly  
4. Theme Orb color + animation updates  
5. Visual confirms state change  

------------------------------------------------------------------------

## Lessons Learned

### Frontend

- Redux Toolkit async thunks simplify API flow  
- TypeScript catches state mistakes early  
- Auth UX feels real only after rehydration  
- State-driven theming scales well  
- Visual feedback makes state meaningful  
- Small selector mistakes break big features  

### Backend

- JWT middleware is core to security  
- Prisma requires strict schema discipline  
- Activity logging must be transactional  
- Error handling prevents silent failure  
- Token validation endpoints are essential  

### Full Stack

- Debugging means reading frontend and backend together  
- Network tab is your best friend  
- Logging beats guessing  
- Real apps are about flow, not just endpoints  

------------------------------------------------------------------------

## Near-Future Work

### React Client

- Improve layout and spacing  
- Add loading skeletons  
- Toast notifications  
- Better form validation  
- Password visibility toggle  
- Remember-me checkbox  
- Profile page  
- Settings persistence  
- Role-based UI  
- Expand R3F visuals  

### Server

- Refresh tokens  
- Token rotation  
- Email verification  
- Password reset  
- Rate limiting  
- Input validation middleware  
- Role-based authorization  
- Expanded audit logging  

------------------------------------------------------------------------

## Long-Term Ideas

- MFA  
- OAuth (Google/GitHub)  
- Admin dashboard  
- Full activity analytics  
- User preferences  
- Theme persistence in DB  

------------------------------------------------------------------------

## Why This Project Matters

This project demonstrates:

- Real authentication architecture  
- Redux + async API handling  
- JWT security flow  
- Session rehydration  
- Activity auditing  
- State-driven theming  
- Visual UI feedback  
- Full-stack integration  
- Type-safe development  

This is not a tutorial app — it’s a growing production-style foundation.

------------------------------------------------------------------------

## Author

Built by: Erick Esquilin  
Purpose: Portfolio-grade full stack system  
Status: Actively evolving
