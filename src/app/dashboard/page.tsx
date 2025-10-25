"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then(setUser)
      .catch(() => (window.location.href = "/login"));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome to Bakery Dashboard 🍰</h1>
      {user && <p className="mt-2">Hello, {user.email}!</p>}
    </div>
  );
}
