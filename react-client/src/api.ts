const BASE = "http://localhost:5000/api";

/* ================= HEADERS ================= */

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

/* ================= AUTH ================= */

export async function register(data: {
  email: string;
  password: string;
  name: string;
}) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Register failed");
  return res.json();
}

export async function login(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function getMe() {
  const res = await fetch(`${BASE}/user/me`, {
    headers: buildHeaders(),
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

/* ================= ACTIVITY ================= */

export async function getActivity() {
  const res = await fetch(`${BASE}/activity`, {
    headers: buildHeaders(),
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}