import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";

export default function About() {
  const features = [
    {
      icon: "⏰",
      title: "Fresh Daily",
      desc: "Baked fresh every morning",
    },
    {
      icon: "🌿",
      title: "Natural Ingredients",
      desc: "Only the finest ingredients",
    },
    {
      icon: "❤️",
      title: "Made with Love",
      desc: "Traditional family recipes",
    },
  ];

  return (
    <section id="about" className="bg-white text-neutral-900 py-16">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: text content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            About{" "}
            <span className="text-orange-600">Bicolana&apos;s Bakery</span>
          </h2>
          <p className="mt-4 text-neutral-700">
            Founded with a passion for authentic Filipino baking,
            Bicolana&apos;s Bakery brings you the traditional flavors of the
            Philippines—especially the rich culinary heritage of the Bicol
            region.
          </p>
          <p className="mt-4 text-neutral-700">
            Every day, we wake up before dawn to prepare fresh bread, pastries,
            and traditional treats using time-honored recipes and the finest
            ingredients. Our commitment to quality and authenticity has made us
            a beloved part of the community.
          </p>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="text-center rounded-xl border bg-white p-5 shadow-sm"
              >
                <div className="mx-auto h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
                  {f.icon}
                </div>
                <div className="mt-3 font-semibold">{f.title}</div>
                <div className="text-sm text-neutral-600">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image Carousel */}
        <div className="relative">
          {/* Right: carousel */}
          <ImageCarousel
            images={[
              "/about/about-baker.jpg",
              "/about/about-1.jpg",
              "/about/about-2.jpg",
              "/about/about-3.jpg",
            ]}
            objectPosition="top" // keeps more space above the head
            intervalMs={4000}
          />

          {/* Badge */}
          <div className="absolute -bottom-6 left-6">
            <div className="rounded-xl bg-orange-600 text-white px-5 py-4 shadow-lg">
              <div className="text-2xl font-extrabold">3+</div>
              <div className="text-sm opacity-90">Years of Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
