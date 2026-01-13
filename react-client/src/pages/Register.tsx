import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks";
import { registerUser } from "../features/auth/authSlice";


export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
   const { loading, error, user } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
      if (user) {
        navigate("/dashboard");
      }
  },[user, navigate])

  const handleRegister = () => {
    dispatch(registerUser({name, email, password }));
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Register</h2>

      <input 
        placeholder="Name" 
        value={name} 
        onChange={e => setName(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
        />

      <input 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
        />
      
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        style={{ width: "100%", marginBottom: 10 }}
        />
        
      <button disabled={loading} onClick={handleRegister}>
        {loading ? "Registering..." : "Register"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
