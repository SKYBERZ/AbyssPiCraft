import React, { useState } from "react";
import { api } from "../api";

export default function Profile({ token }: { token: string }) {
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const change = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api(`/auth/change-password?token=${token}`, {
        method: "POST",
        body: JSON.stringify({ old_password: oldPw, new_password: newPw })
      });
      setMsg("Password changed.");
    } catch {
      setMsg("Failed to change password.");
    }
  };

  return (
    <div className="card max-w-lg">
      <h2 className="font-techno text-xl mb-4">Profile</h2>
      <form onSubmit={change} className="space-y-3">
        <input className="w-full bg-abyssBlack border border-neonCyan p-2 rounded"
          placeholder="Old password" type="password" value={oldPw} onChange={e => setOldPw(e.target.value)} />
        <input className="w-full bg-abyssBlack border border-neonCyan p-2 rounded"
          placeholder="New password" type="password" value={newPw} onChange={e => setNewPw(e.target.value)} />
        <button className="btn" type="submit">Change</button>
        {msg && <p className="text-neonCyan">{msg}</p>}
      </form>
    </div>
  );
}
