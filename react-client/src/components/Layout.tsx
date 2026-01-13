import {Link} from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loadMe } from "../features/auth/authSlice";

export default function Layout({children}: {children: React.ReactNode}) {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            dispatch(loadMe(token));
        }
    },[token, dispatch])
    return(
        <div style={{ minHeight: "100vh", minWidth: "100vw", background: "#f5f7fb"}}>
        <nav
            style={{
                background: "#111827",
                color: "white",
                padding: "12px 20px",
                display: "flex",
                gap: 16,
            }}
        >
            <Link style={{ color: "white", textDecoration: "none"}} to="/login">
                Login
            </Link>
            <Link style={{ color: "white", textDecoration: "none"}} to="/register">
                Register
            </Link>
            <Link style={{ color: "white", textDecoration: "none"}} to="/dashboard">
               Dashboard
            </Link>

        </nav>
        <main
            style={{
                maxWidth: 900,
                margin: "40px auto",
                padding: 20,
            }}
        >
            {children}
        </main>
        </div>
    )
}