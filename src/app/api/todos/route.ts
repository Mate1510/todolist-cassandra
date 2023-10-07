import client from "@/lib/cassandra";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const result = await client.execute("SELECT * FROM tasks");
  return NextResponse.json(result.rows, { status: 200 });
}

export async function POST(req: NextRequest) {
  const todo = await req.json();
  const query =
    "INSERT INTO tasks (id, title, description, completed) VALUES (uuid(), ?, ?, false)";
  await client.execute(query, [todo.title, todo.description], {
    prepare: true,
  });
  return NextResponse.json({ message: "Tarefa criada", status: 200 });
}
