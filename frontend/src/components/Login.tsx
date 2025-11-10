import React, { useState } from "react";
import { api } from "../api";

export default function Login({ onLogin }: { onLogin: (t: string) => void }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
      });
      onLogin(res.token);
    } catch (err: any) {
      setError("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-techno mb-4">AbyssPiCraft Login</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block mb-1">Username</label>
            <input className="w-full bg-abyssBlack border border-neonCyan p-2 rounded"
              value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input type="password" className="w-full bg-abyssBlack border border-neonCyan p-2 rounded"
              value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-400">{error}</p>}
          <button className="btn w-full" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
