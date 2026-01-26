 
import { useState } from "react";
import { useAppSelector } from "../hooks";
import { updateMe } from "../api";

export default function Profile() {
  const { user, token } = useAppSelector((state) => state.auth);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [message, setMessage] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const theme = useAppSelector((state) => state.theme.mode);

  const themeStyles = {
      identity: {
          bg: "#f5f7fb",
          nav: "#111827",
          font: "white",
          font2: "black",
          button: "#9e9e9e",
          title: "#f5f7fb"
      },
      system: {
          bg: "#0f172a",
          nav: "#d8dbe7",
          font: "white",
           font2: "white",
           button: "#2e457a",
          title: "#f5f7fb"
      },
      activity: {
          bg: "#fff7ed",
          nav: "#743574",
          font: "#e681d0",
           font2: "#b30f8f",
           button: "#835e83",
          title: "#f5f7fb"
      }
  }[theme]

  async function saveProfile() {
    setMessage("");

    if (!token) {
      setMessage("Not logged in");
      return;
    }

    try {
      setSaving(true);
      await updateMe({ name, email }, token);
      setMessage("Profile updated");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Profile</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <br/>
      <br/>
      <button style={{ backgroundColor: themeStyles.button,}} onClick={saveProfile} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
