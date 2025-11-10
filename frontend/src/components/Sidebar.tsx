import React from "react";

export default function Sidebar({ onNavigate }: { onNavigate: (p: "dashboard" | "servers" | "profile") => void }) {
  return (
    <aside className="w-64 min-h-screen bg-abyssBlack border-r border-neonCyan/40 p-4">
      <div className="text-neonCyan font-techno text-xl mb-6">AbyssPiCraft</div>
      <nav className="space-y-2">
        <button className="btn w-full" onClick={() => onNavigate("dashboard")}>Dashboard</button>
        <button className="btn w-full" onClick={() => onNavigate("servers")}>Servers</button>
        <button className="btn w-full" onClick={() => onNavigate("profile")}>Profile</button>
      </nav>
    </aside>
  );
}
