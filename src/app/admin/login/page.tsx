"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (err: any) {
      setError("An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-8 shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-primary-blue/10 text-primary-blue rounded-2xl flex items-center justify-center mx-auto">
            <Lock size={22} />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900">Admin Console Access</h1>
          <p className="text-zinc-500 text-xs">Enter your authorization credentials below.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1">
              <User size={13} /> Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="p-3 px-4 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-primary-blue text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1">
              <Lock size={13} /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="p-3 px-4 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-primary-blue text-sm"
            />
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-150 rounded-xl text-red-600 flex items-center gap-2 text-xs">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3.5 rounded-full transition-all cursor-pointer disabled:bg-zinc-400"
          >
            {loading ? "Authorizing..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
