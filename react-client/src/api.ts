const BASE = import.meta.env.VITE_API_URL + "/api";

/* ================= HEADERS ================= */

function buildHeaders(token?: string): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const authToken = token ?? localStorage.getItem("token");
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
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
    headers: buildHeaders(),
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
    headers: buildHeaders(),
    body: JSON.stringify(data),
    
  });



  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Login failed");
  }

  console.log("API BASE =", import.meta.env.VITE_API_URL);

  return res.json();
}

export async function getMe(token: string) {
  const res = await fetch(`${BASE}/user/me`, {
    headers: buildHeaders(token),
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
