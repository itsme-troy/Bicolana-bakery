"use client";
 import React, { createContext, useContext, useState, useCallback } from "react";

 type Toast = { id: string; title: string; type?: "success" | "error" | "info"; timeout?: number };

 const ToastContext = createContext<{
   push: (t: Omit<Toast, "id">) => void;
 } | null>(null);

 export function useToast() {
   const ctx = useContext(ToastContext);
   if (!ctx) throw new Error("useToast must be inside ToastProvider");
   return ctx;
 }

 export function ToastProvider({ children }: { children: React.ReactNode }) {
   const [toasts, setToasts] = useState<Toast[]>([]);

   const push = useCallback((t: Omit<Toast, "id">) => {
     const id = String(Date.now())  Math.random().toString(16).slice(2, 8);
     const item: Toast = { id, ...t, timeout: t.timeout ?? 4000 };
     setToasts((s) => [...s, item]);
     setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), item.timeout);
   }, []);

   return (
     <ToastContext.Provider value={{ push }}>
       {children}

       {/* simple toaster UI */}
       <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
         {toasts.map((t) => (
           <div
             key={t.id}
             className={`shadow-lg rounded px-4 py-2 max-w-sm text-sm ${
               t.type === "error" ? "bg-red-600 text-white" : "bg-neutral-900 text-white"
             }`}
           >
             {t.title}
           </div>
         ))}
       </div>
     </ToastContext.Provider>
   );
 }

export default ToastProvider;


