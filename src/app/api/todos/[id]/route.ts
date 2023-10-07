import client from "@/lib/cassandra";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const query = "UPDATE tasks SET title = ?, description = ? WHERE id = ?";
  await client.execute(query, [body.title, body.description, body.id], {
    prepare: true,
  });
  return NextResponse.json({ message: "Tarefa atualizada", status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const query = "DELETE FROM tasks WHERE id = ?";
  await client.execute(query, [params.id], { prepare: true });
  return NextResponse.json("Tarefa deletada!", { status: 200 });
}
