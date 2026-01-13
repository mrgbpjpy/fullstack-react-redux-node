import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {loginUser} from "../features/auth/authSlice"


export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error , token} = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        if(token) {
            navigate("/dashboard");
        }
    },[token, navigate]);

    const handleLogin = () => {
      if (!email || !password) return;
        dispatch(loginUser({email, password }));
    }

    return (
   <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        background: "white",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
      }}
    >
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button
        disabled={loading}
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: 12,
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}