import React from "react";

export const metadata = {
  title: "HealthLens | Admin Console",
  description: "Secure administration console for the HealthLens marketing platform.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-50 min-h-screen text-zinc-900 w-full flex flex-col font-sans">
      {children}
    </div>
  );
}
