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
        dispatch(loginUser({email, password }));
    }

    return (
    <div style={{maxWidth: 400, margin: "40px auto" }}>
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

      <button disabled={loading} onClick={handleLogin}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}