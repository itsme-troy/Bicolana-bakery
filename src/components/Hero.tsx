"use client";
import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";
const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export default function Hero() {
  return (
    <section id="home" className="relative">
      <div className="relative h-[100vh]">
        {/* Background image */}
        <img
          src="/bakery.avif"
          alt="Bakery interior"
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />

        {/* Base dim overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Bottom-up gradient for bread area */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        {/* Left fade for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 h-full flex flex-col items-start justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-6"
          >
            <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
              Welcome to{" "}
              <span className={`${pacifico.className} text-orange-400`}>
                Bicolana’s
              </span>
              <br />
              <span className={`${pacifico.className} text-orange-400`}>
                Bakery
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              Authentic Filipino baked goods made with love and tradition.
              Experience the taste of home with our freshly baked breads,
              pastries, and traditional Bicolano treats.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#products"
                className="rounded-md bg-orange-600 px-5 py-3 text-white font-medium hover:bg-orange-700 hover:scale-105 transition-all shadow-lg"
              >
                Shop Now
              </a>
              <a
                href="tel:+639000000000"
                className="rounded-md border border-white/70 px-5 py-3 text-white font-medium hover:bg-white hover:text-black transition-all"
              >
                Call to Order
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
