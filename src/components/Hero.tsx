import { Pacifico } from "next/font/google";
const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export default function Hero() {
  return (
    <section id="home" className="relative">
      <div className="relative h-[70vh] md:h-[80vh]">
        {/* background image */}
        <img
          src="/hero.jpg"
          alt="Bakery interior"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* content */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 h-full flex flex-col items-start justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight drop-shadow">
            Welcome to{" "}
            <span className={`${pacifico.className} text-orange-400`}>
              Bicolana’s
            </span>
            <br />
            <span className={`${pacifico.className} text-orange-400`}>
              Bakery
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-white/90">
            Authentic Filipino baked goods made with love and tradition.
            Experience the taste of home with our freshly baked breads,
            pastries, and traditional Bicolano treats.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#products"
              className="rounded-md bg-orange-600 px-5 py-3 text-white font-medium hover:bg-orange-700"
            >
              Shop Now
            </a>
            <a
              href="tel:+639000000000"
              className="rounded-md border border-white/70 px-5 py-3 text-white font-medium hover:bg-white hover:text-black transition"
            >
              Call to Order
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
