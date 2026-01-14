import { useAppSelector,useAppDispatch } from "../hooks";
import { logout } from "../features/auth/authSlice";



export default function Dashboard() {
    const {user} = useAppSelector((state)=> state.auth);
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.mode);

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
            <h2>Dashboard</h2>
            <p>Welcome {user?.name}</p>
            <button style={{backgroundColor: themeStyles.button, color: themeStyles.font}} onClick={() => dispatch(logout())}>Logout</button>
        </div>
    )
}