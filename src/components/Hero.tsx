"use client";
import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";
const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export default function Hero() {
  return (
    <section id="home" className="relative">
      <div className="relative h-[85vh]">
        <img
          src="/bakery.avif"
          alt="Bakery interior"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 h-full flex flex-col items-start justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl md:text-6xl font-extrabold leading-tight drop-shadow"
          >
            Welcome to{" "}
            <span className={`${pacifico.className} text-orange-400`}>
              Bicolana’s
            </span>
            <br />
            <span className={`${pacifico.className} text-orange-400`}>
              Bakery
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-4 max-w-2xl text-white/90"
          >
            Authentic Filipino baked goods made with love and tradition.
            Experience the taste of home with our freshly baked breads,
            pastries, and traditional Bicolano treats.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 flex flex-wrap gap-3"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
