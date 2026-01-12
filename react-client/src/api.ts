export const API = "http://localhost:5000";


export async function register(data: {
    email: string;
    password: string;
    name: string;
}) {
    const res = await fetch(`${API}/api/auth/register`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });

    if(!res.ok) {
        throw new Error("Register Failed");
    }

    return res.json();

}

export async function login(data: {
    email: string;
    password: string;
}) {
    const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });

    if(!res.ok) {
        throw new Error("Login failed");
    }

    return res.json();
}