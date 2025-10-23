import Link from "next/link";

export default function Products() {
  const items = [
    { id: 1, name: "Pandesal", price: "₱5", img: "/products/pandesal.avif" },
    { id: 2, name: "Ensaymada", price: "₱35", img: "/products/ensaymada.jpg" },
    {
      id: 3,
      name: "Pande coco",
      price: "₱5",
      img: "/products/pandecoco.jpg",
    },
    {
      id: 4,
      name: "Cheese Bread",
      price: "₱25",
      img: "/products/cheese-bread.jpg",
    },
  ];

  return (
    <section id="products" className="bg-white text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Bestsellers</h2>
        <p className="text-neutral-600 mt-1">Fresh daily, baked with love.</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((p) => (
            <div
              key={p.id}
              className="rounded-xl overflow-hidden border bg-white shadow-sm"
            >
              <img
                src={p.img}
                alt={p.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{p.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-orange-700 font-medium">{p.price}</span>
                  <button className="rounded-md bg-orange-600 px-3 py-2 text-white text-sm hover:bg-orange-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-6">
          <Link href="/products">
            <button className="px-4 py-3 bg-orange-500 text-white font-medium rounded-md hover:scale-105 hover:shadow-lg transition-transform duration-200 text-sm">
              View All Products →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
