import {
  Home,
  ShoppingBag,
  Info,
  Phone,
  ShoppingCart,
  User,
  Login,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b text-neutral-800">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-orange-500" />
          <span className="font-semibold text-orange-700">
            Bicolana’s Bakery
          </span>
        </div>
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
          {/* <a
            href="/login"
            className="flex items-center gap-1 hover:text-orange-600"
          >
            <LogIn size={18} /> Login
          </a> */}
        </nav>

        <a
          href="#order"
          className="rounded-md bg-orange-600 px-4 py-2 text-white text-sm font-medium hover:bg-orange-700"
        >
          Order Now
        </a>
      </div>
    </header>
  );
}
