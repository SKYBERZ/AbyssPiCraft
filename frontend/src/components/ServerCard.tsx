import React from "react";

export default function ServerCard({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="card mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-techno text-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
}
