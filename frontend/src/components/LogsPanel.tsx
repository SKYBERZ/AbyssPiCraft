import React, { useEffect, useState } from "react";

export default function LogsPanel({ token }: { token: string }) {
  const [logs, setLogs] = useState("Loading logs...");

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/server/logs/stream?token=${token}`;
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then(res => res.text())
      .then(text => setLogs(text))
      .catch(() => setLogs("Unable to stream logs."));
    return () => controller.abort();
  }, [token]);

  return (
    <pre className="bg-abyssBlack border border-neonCyan p-3 rounded font-mono text-sm overflow-auto h-64">
      {logs}
    </pre>
  );
}
