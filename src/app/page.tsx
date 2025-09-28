import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
