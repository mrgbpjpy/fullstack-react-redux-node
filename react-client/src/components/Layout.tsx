import {Link} from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loadMe } from "../features/auth/authSlice";


export default function Layout({children}: {children: React.ReactNode}) {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const theme = useAppSelector((state) => state.theme.mode);

    useEffect(() => {
        if (token) {
            dispatch(loadMe(token));
        }
    },[token, dispatch])

    const themeStyles = {
        identity: {
            bg: "#f5f7fb",
            nav: "#111827",
            font: "white",
            font2: "black"
        },
        system: {
            bg: "#0f172a",
            nav: "#020617",
            font: "white",
             font2: "white"
        },
        activity: {
            bg: "#fff7ed",
            nav: "#743574",
            font: "#e681d0",
             font2: "#b30f8f"
        }
    }[theme]

    return(
        <div style={{ minHeight: "100vh", minWidth: "100vw", background: themeStyles.bg}}>
        <nav
            style={{
                background: themeStyles.nav,
                color: "white",
                padding: "12px 20px",
                display: "flex",
                gap: 25,
            }}
        >
            <Link style={{ color: themeStyles.font, textDecoration: "none"}} to="/login">
                Login
            </Link>
            <Link style={{ color: themeStyles.font, textDecoration: "none"}} to="/register">
                Register
            </Link>
            <Link style={{ color: themeStyles.font, textDecoration: "none"}} to="/dashboard">
               Dashboard
            </Link>
            <Link style={{ color: themeStyles.font, textDecoration: "none"}} to="/settings">
                Settings
            </Link>
            <Link style={{ color: themeStyles.font, textDecoration: "none"}} to="/profile">
                Profile
            </Link>
            
        </nav>
        <main
            style={{
                maxWidth: 900,
                margin: "40px auto",
                padding: 20,
                color: themeStyles.font2
            }}
        >
            
            {children}
        </main>
        </div>
    )
}