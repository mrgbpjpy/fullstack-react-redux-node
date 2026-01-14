import { useAppSelector, useAppDispatch} from "../hooks";
import { setTheme, type ThemeMode } from "../features/theme/themeSlice";

export default function Settings() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const theme = useAppSelector((state) => state.theme.mode);

 

    return(
        <div>
            <h2>Settings</h2>
            {/* User info*/}
            <section style={{ marginBottom: 30}}>
                <h3>User</h3>
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
            </section>

            {/* Theme Settings */}
            <section>
                <h3>Theme</h3>
                <select
                    value={theme}
                    onChange={(e) => dispatch(setTheme(e.target.value as ThemeMode))

                    }
                >
                    <option value="identity">Identity</option>
                    <option value="system">System</option>
                    <option value="activity">Activity</option>
                </select>
            </section>
        </div>
    )
}