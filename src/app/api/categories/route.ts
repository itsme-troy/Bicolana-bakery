let categories = [
  { id: 1, name: "Cakes" },
  { id: 2, name: "Bread" },
];

export async function GET() {
  return Response.json(categories);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newCategory = {
    id: Date.now(),
    name: body.name,
  };

  categories.push(newCategory);

  return Response.json(newCategory);
}