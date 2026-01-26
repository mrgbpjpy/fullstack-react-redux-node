import express, { Request, Response } from "express";
//import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import activityRoutes from "./routes/activity.routes";

dotenv.config();

const app = express();
console.log("🔥 EXPRESS APP LOADED — MANUAL CORS ACTIVE 🔥");

/* ---------- CORS (Manual, Vercel-Safe) ---------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://fullstack-react-redux-ui.vercel.app",
  "https://fullstack-react-redux-41t0cggkk-mrgbpjpygmailcoms-projects.vercel.app",
  "https://fullstack-react-redux-j78gljk7z-mrgbpjpygmailcoms-projects.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin as string | undefined;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});



/* ---------- BODY PARSING ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(cookieParser());

/* ---------- ROUTES ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/activity", activityRoutes);

/* ---------- HEALTH ---------- */
app.get("/", (_req: Request, res: Response) => {
  res.send("API Running");
});

export default app;
