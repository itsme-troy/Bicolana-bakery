"use client";

import { useState } from "react";

const inputBase =
  "mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 " +
  "text-neutral-900 placeholder:text-neutral-500 outline-none " +
  "focus:ring-2 focus:ring-orange-500 focus:border-orange-500";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<null | { ok: boolean; text: string }>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!name.trim() || !email.trim() || !password) {
      setMsg({ ok: false, text: "Please fill in all required fields." });
      return;
    }
    if (password.length < 8) {
      setMsg({ ok: false, text: "Password must be at least 8 characters." });
      return;
    }
    if (password !== confirm) {
      setMsg({ ok: false, text: "Passwords do not match." });
      return;
    }
    if (!agree) {
      setMsg({
        ok: false,
        text: "Please accept the Terms and Privacy Policy.",
      });
      return;
    }

    try {
      setSending(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) throw new Error("Failed");
      setMsg({ ok: true, text: "Account created! You can now sign in." });
      // Optional: redirect after a short delay
      // setTimeout(() => (window.location.href = "/login"), 1200);
    } catch {
      setMsg({ ok: false, text: "Could not create account. Try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-800">
          Full name *
        </label>
        <input
          className={inputBase}
          placeholder="Juan Dela Cruz"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-800">
          Email *
        </label>
        <input
          type="email"
          className={inputBase}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-800">
          Password *
        </label>
        <input
          type="password"
          className={inputBase}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="mt-1 text-xs text-neutral-600">
          Use at least 8 characters.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-800">
          Confirm password *
        </label>
        <input
          type="password"
          className={inputBase}
          placeholder="••••••••"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
      </div>

      <label className="flex items-start gap-2 text-sm text-neutral-700">
        <input
          type="checkbox"
          className="mt-1"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <span>
          I agree to the{" "}
          <a href="/terms" className="text-orange-700 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-orange-700 hover:underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {msg && (
        <p className={`text-sm ${msg.ok ? "text-green-700" : "text-red-600"}`}>
          {msg.text}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-md bg-orange-600 py-2 font-medium text-white hover:bg-orange-700 disabled:opacity-60"
      >
        {sending ? "Creating account…" : "Create Account"}
      </button>

      <p className="text-center text-sm text-neutral-600">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-orange-600 hover:underline"
        >
          Sign in
        </a>
      </p>
    </form>
  );
}
