import { Home, ShoppingCart, Info, Phone, LogIn } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r shadow-md z-50">
      <div className="p-4 flex items-center gap-2 border-b">
        <div className="h-8 w-8 rounded-full bg-orange-500" />
        <span className="font-semibold text-orange-700">Bicolana’s Bakery</span>
      </div>
      <nav className="flex flex-col gap-4 p-4 text-sm">
        <a
          href="#home"
          className="flex items-center gap-2 hover:text-orange-600"
        >
          <Home size={18} /> Home
        </a>
        <a
          href="#products"
          className="flex items-center gap-2 hover:text-orange-600"
        >
          <ShoppingCart size={18} /> Products
        </a>
        <a
          href="#about"
          className="flex items-center gap-2 hover:text-orange-600"
        >
          <Info size={18} /> About
        </a>
        <a
          href="#contact"
          className="flex items-center gap-2 hover:text-orange-600"
        >
          <Phone size={18} /> Contact
        </a>
        <a
          href="/login"
          className="flex items-center gap-2 hover:text-orange-600"
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
  );
}
