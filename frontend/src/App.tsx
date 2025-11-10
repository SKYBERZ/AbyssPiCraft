import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Servers from "./pages/Servers";
import Profile from "./components/Profile";

type Page = "dashboard" | "servers" | "profile";

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [page, setPage] = useState<Page>("dashboard");

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
  }, []);

  if (!token) return <Login onLogin={(t) => { localStorage.setItem("token", t); setToken(t); }} />;

  return (
    <div className="min-h-screen text-white">
      <div className="flex">
        <Sidebar onNavigate={setPage} />
        <main className="flex-1 p-6">
          {page === "dashboard" && <Dashboard token={token} />}
          {page === "servers" && <Servers token={token} />}
          {page === "profile" && <Profile token={token} />}
        </main>
      </div>
    </div>
  );
}
