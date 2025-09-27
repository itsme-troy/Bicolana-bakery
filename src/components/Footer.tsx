export default function Footer() {
  return (
    <footer id="contact" className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-800">
          © {new Date().getFullYear()} Bicolana’s Bakery. All rights reserved.
        </p>
        <div className="text-sm text-neutral-800">
          🍞 blk 30, lot 18 Harvard Avenue West Gov. Heights 2 Cabuco, Trece
          Martires Cavite •
          <a
            className="ml-2 text-orange-700 hover:underline"
            href="tel:+639000000000"
          >
            09947216915
          </a>
        </div>
      </div>
    </footer>
  );
}
