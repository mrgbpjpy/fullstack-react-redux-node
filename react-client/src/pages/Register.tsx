import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { registerUser } from "../features/auth/authSlice";

export default function Register() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={() => dispatch(registerUser({ email, password, name }))}>
        Register
      </button>
    </div>
  );
}
