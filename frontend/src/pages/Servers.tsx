import React, { useEffect, useState } from "react";
import { api } from "../api";
import ServerCard from "../components/ServerCard";
import LogsPanel from "../components/LogsPanel";

export default function Servers({ token }: { token: string }) {
  const [version, setVersion] = useState<string>("");
  const [versions, setVersions] = useState<string[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [command, setCommand] = useState("");

  useEffect(() => {
    api(`/paper/versions?token=${token}`).then(res => setVersions(res.versions)).catch(() => setVersions([]));
  }, [token]);

  const download = async () => {
    try {
      if (!version) return setMsg("Pick a Paper version first.");
      const builds = await api(`/paper/builds/${version}?token=${token}`);
      const build = builds.builds[builds.builds.length - 1];
      await api(`/paper/download?token=${token}`, {
        method: "POST",
        body: JSON.stringify({ version, build })
      });
      setMsg(`Downloaded Paper ${version} build ${build}.`);
    } catch {
      setMsg("Failed to download Paper.");
    }
  };

  const start = async () => {
    try {
      await api(`/server/start?token=${token}`, { method: "POST", body: JSON.stringify({ name: "default" }) });
      setMsg("Server starting...");
    } catch {
      setMsg("Failed to start server.");
    }
  };

  const stop = async () => {
    try {
      await api(`/server/stop?token=${token}`, { method: "POST" });
      setMsg("Server stopping...");
    } catch {
      setMsg("Failed to stop server.");
    }
  };

  const send = async () => {
    try {
      await api(`/server/command?token=${token}`, {
        method: "POST",
        body: JSON.stringify({ name: "default", command })
      });
      setCommand("");
    } catch {
      setMsg("Failed to send command.");
    }
  };

  return (
    <div>
      <h1 className="font-techno text-2xl mb-4">Servers</h1>

      <ServerCard title="PaperMC">
        <div className="flex items-center gap-3">
          <select className="bg-abyssBlack border border-neonCyan p-2 rounded" value={version} onChange={e => setVersion(e.target.value)}>
            <option value="">Select version</option>
            {versions.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <button className="btn" onClick={download}>Download</button>
        </div>
        {msg && <p className="text-neonCyan mt-2">{msg}</p>}
      </ServerCard>

      <ServerCard title="Lifecycle">
        <div className="flex gap-3">
          <button className="btn" onClick={start}>Start</button>
          <button className="btn" onClick={stop}>Stop</button>
        </div>
      </ServerCard>

      <ServerCard title="Console">
        <div className="flex gap-3 mb-3">
          <input className="flex-1 bg-abyssBlack border border-neonCyan p-2 rounded" placeholder="Type a command (e.g., say hello)"
            value={command} onChange={e => setCommand(e.target.value)} />
          <button className="btn" onClick={send}>Send</button>
        </div>
        <LogsPanel token={token} />
      </ServerCard>
    </div>
  );
}
