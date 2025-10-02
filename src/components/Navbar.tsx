"use client";
import { useState } from "react";
import { Home, ShoppingCart, Info, Phone, LogIn, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur border-b text-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          {/* Hamburger Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-orange-100"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-orange-500" />
            <span className="font-semibold text-orange-700">
              Bicolana’s Bakery
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-sm">
            <a
              href="#home"
              className="flex items-center gap-1 hover:text-orange-600"
            >
              <Home size={18} /> Home
            </a>
            <a
              href="#products"
              className="flex items-center gap-1 hover:text-orange-600"
            >
              <ShoppingCart size={18} /> Products
            </a>
            <a
              href="#about"
              className="flex items-center gap-1 hover:text-orange-600"
            >
              <Info size={18} /> About
            </a>
            <a
              href="#contact"
              className="flex items-center gap-1 hover:text-orange-600"
            >
              <Phone size={18} /> Contact
            </a>
            <a
              href="/login"
              className="flex items-center gap-1 hover:text-orange-600"
            >
              <LogIn size={18} /> Login
            </a>
          </nav>

          <a
            href="#order"
            className="hidden md:block rounded-md bg-orange-600 px-4 py-2 text-white text-sm font-medium hover:bg-orange-700"
          >
            Order Now
          </a>
        </div>
      </header>

      {/* Sidebar (Hidden by default) */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <span className="font-semibold text-orange-700">Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-4 text-sm">
          <a
            href="#home"
            className="flex items-center gap-2 text-gray-800 hover:text-orange-600"
          >
            <Home size={18} /> Home
          </a>
          <a
            href="#products"
            className="flex items-center gap-2 text-gray-800 hover:text-orange-600"
          >
            <ShoppingCart size={18} /> Products
          </a>
          <a
            href="#about"
            className="flex items-center gap-2 text-gray-800 hover:text-orange-600"
          >
            <Info size={18} /> About
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 text-gray-800 hover:text-orange-600"
          >
            <Phone size={18} /> Contact
          </a>
          <a
            href="/login"
            className="flex items-center gap-2 text-gray-800 hover:text-orange-600"
          >
            <LogIn size={18} /> Login
          </a>
        </nav>

        <div className="p-4">
          <a
            href="#order"
            className="block w-full rounded-md bg-orange-600 px-4 py-2 text-white text-sm font-medium hover:bg-orange-700 text-center"
          >
            Order Now
          </a>
        </div>
      </aside>
    </>
  );
}
