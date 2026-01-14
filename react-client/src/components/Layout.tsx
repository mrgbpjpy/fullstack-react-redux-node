import {Link} from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loadMe } from "../features/auth/authSlice";
import { setTheme, type ThemeMode } from "../features/theme/themeSlice";

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
        },
        system: {
            bg: "#0f172a",
            nav: "#020617",
        },
        activity: {
            bg: "#fff7ed",
            nav: "#7c2d12",
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
            <Link style={{ color: "white", textDecoration: "none"}} to="/login">
                Login
            </Link>
            <Link style={{ color: "white", textDecoration: "none"}} to="/register">
                Register
            </Link>
            <Link style={{ color: "white", textDecoration: "none"}} to="/dashboard">
               Dashboard
            </Link>
            <div style={{ borderStyle:"groove", paddingLeft: 35, paddingRight: 35, paddingTop: 2,paddingBottom: 2, display: "flex", gap: 20  }}>
            <strong>Theme:</strong>
            <select
                value={theme}
                onChange={(e) => dispatch(setTheme(e.target.value as ThemeMode))}
            >
               
                <option value="identity">Identity</option>
                <option value="system">System</option>
                <option value="activity">Activity</option>

            </select>
            </div>
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