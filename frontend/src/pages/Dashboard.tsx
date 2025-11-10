import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Dashboard({ token }: { token: string }) {
  const [status, setStatus] = useState<{ running: boolean; jar_exists: boolean } | null>(null);

  useEffect(() => {
    api(`/server/status?token=${token}`).then(setStatus).catch(() => setStatus(null));
  }, [token]);

  return (
    <div>
      <h1 className="font-techno text-2xl mb-4">Dashboard</h1>
      {!status ? (
        <p>Loading...</p>
      ) : (
        <div className="card">
          <p><b>Status:</b> {status.running ? "Running" : "Stopped"}</p>
          <p><b>Paper JAR:</b> {status.jar_exists ? "Found" : "Missing"}</p>
        </div>
      )}
    </div>
  );
}
