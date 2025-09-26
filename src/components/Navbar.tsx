export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-orange-500" />
          <span className="font-semibold text-orange-700">
            Bicolana’s Bakery
          </span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#home" className="hover:text-orange-600">
            Home
          </a>
          <a href="#products" className="hover:text-orange-600">
            Products
          </a>
          <a href="#about" className="hover:text-orange-600">
            About
          </a>
          <a href="#contact" className="hover:text-orange-600">
            Contact
          </a>
          <a href="#cart" className="hover:text-orange-600">
            Cart
          </a>
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
