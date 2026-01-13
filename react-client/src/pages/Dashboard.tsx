import { useAppSelector,useAppDispatch } from "../hooks";
import { logout } from "../features/auth/authSlice";

export default function Dashboard() {
    const {user} = useAppSelector((state)=> state.auth);
    const dispatch = useAppDispatch();

    return(
        <div>
            <h2>Dashboard</h2>
            <p>Welcome {user?.name}</p>
            <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
    )
}