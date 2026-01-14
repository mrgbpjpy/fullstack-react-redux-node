import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {loginUser} from "../features/auth/authSlice"


export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error , token} = useAppSelector((state) => state.auth);
    const theme = useAppSelector((state) => state.theme.mode);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        if(token) {
            navigate("/dashboard");
        }
    },[token, navigate]);

    const handleLogin = () => {
        dispatch(loginUser({email, password }));
    }

    const themeStyles = {
        identity: {
            bg: "#f5f7fb",
            nav: "#111827",
            font: "white",
            font2: "black",
            button: "#9e9e9e",
            title: "#f5f7fb"
        },
        system: {
            bg: "#0f172a",
            nav: "#d8dbe7",
            font: "white",
             font2: "white",
             button: "#2e457a",
            title: "#f5f7fb"
        },
        activity: {
            bg: "#fff7ed",
            nav: "#743574",
            font: "#e681d0",
             font2: "#b30f8f",
             button: "#835e83",
            title: "#f5f7fb"
        }
    }[theme]

    return (
    <div style={{
        maxWidth: 400,
        margin: "40px auto",
        background: "white",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
      }}>
      <h2 style={{ backgroundColor: themeStyles.nav, color: themeStyles.font}}>Login</h2>

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

      <button style={{
          width: "100%",
          padding: 12,
          backgroundColor: themeStyles.button,
          color: themeStyles.font,
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }} 
        disabled={loading} 
        onClick={handleLogin}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}