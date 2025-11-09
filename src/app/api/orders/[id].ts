
// GET — fetch a specific order
// PUT — update the order’s status field
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  // 🟠 Update order status
  if (req.method === "PUT") {
    try {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }

      const updatedOrder = await prisma.order.update({
        where: { id: Number(id) },
        data: { status },
      });

      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Failed to update order" });
    }
  }

  // 🧾 Get specific order (optional)
  else if (req.method === "GET") {
    try {
      const order = await prisma.order.findUnique({
        where: { id: Number(id) },
        include: { user: true, products: true },
      });

      if (!order) return res.status(404).json({ error: "Order not found" });

      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  }

  // 🚫 Block other methods
  else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
