"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!email || !password) {
      setMsg({ ok: false, text: "Please enter your email and password." });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      setMsg({ ok: true, text: "Logged in! Redirecting…" });
      // TODO: redirect to dashboard or back to previous page
      // window.location.href = "/";
    } catch {
      setMsg({ ok: false, text: "Invalid email or password." });
    } finally {
      setLoading(false);
    }
  }

  const inputBase =
    "mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 " +
    "text-neutral-900 placeholder:text-neutral-500 outline-none " +
    "focus:ring-2 focus:ring-orange-500 focus:border-orange-500";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-800">
          Email
        </label>
        <input
          type="email"
          className={inputBase}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-800">
          Password
        </label>
        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            className={inputBase + " pr-10"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute inset-y-0 right-2 my-1 rounded-md px-2 text-sm text-neutral-600 hover:text-neutral-800"
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {msg && (
        <p className={`text-sm ${msg.ok ? "text-green-700" : "text-red-600"}`}>
          {msg.text}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700 disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>

      <div className="text-center text-sm text-neutral-600">
        Don’t have an account?{" "}
        <a
          href="/register"
          className="text-orange-700 font-medium hover:underline"
        >
          Create one
        </a>
      </div>
    </form>
  );
}
