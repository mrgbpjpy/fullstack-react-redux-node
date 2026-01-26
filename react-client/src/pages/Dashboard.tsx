import { useEffect } from "react";
import { useAppSelector,useAppDispatch } from "../hooks";
import { fetchActivity } from "../features/activity/activitySlice";
import { logout } from "../features/auth/authSlice";
import ThemeOrbCanvas from "../components/ThemeOrbCanvas";

export default function Dashboard() {
    const {user} = useAppSelector((state)=> state.auth);
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state) => state.activity);
    const theme = useAppSelector((state) => state.theme.mode);

    useEffect(() => {
        dispatch(fetchActivity({ reset: true }));
    },[dispatch])

    const themeStyles = {
        identity: {
            bg: "#f5f7fb",
            nav: "#111827",
            font: "white",
            font2: "black",
            button: "#9e9e9e"
        },
        system: {
            bg: "#0f172a",
            nav: "#020617",
            font: "white",
             font2: "white",
             button: "#2e457a"
        },
        activity: {
            bg: "#fff7ed",
            nav: "#743574",
            font: "#e681d0",
             font2: "#b30f8f",
             button: "#835e83"
        }
    }[theme]


    return(
        <div>
            <h2 style={{ color: themeStyles.font2}}>Dashboard</h2>
            <p>Welcome {user?.name}</p>

            <div style={{margin: "30px 0"}}>
                <h3 style={{ color: themeStyles.font2}}>Theme Engine</h3>
                <ThemeOrbCanvas/>
                <p style={{ opacity: 0.7}}>
                    Cube reflects your active theme in real time. You may change theme in the Settings page.
                    
                </p>
            </div>

            <button style={{backgroundColor: themeStyles.button, color: themeStyles.font}} onClick={() => dispatch(logout())}>Logout</button>
             <h3>Recent Activity</h3>

      {loading && <p>Loading activity...</p>}

      {!loading && error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && items.length === 0 && <p>No activity yet</p>}

      <ul>
        {items.map((a) => (
          <li key={a.id}>
            {a.action} — {new Date(a.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
        </div>
    )
}
