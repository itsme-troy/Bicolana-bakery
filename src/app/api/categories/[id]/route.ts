export async function PUT(req: Request, { params }: any) {
  const body = await req.json();

  categories = categories.map((cat) =>
    cat.id == params.id ? { ...cat, name: body.name } : cat
  );

  return Response.json({ success: true });
}

export async function DELETE(req: Request, { params }: any) {
  categories = categories.filter((cat) => cat.id != params.id);

  return Response.json({ success: true });
}