import { deleteRole, updateRole } from "@/actions/role.action";

import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const { id } = params;
  console.log("Updating role:", id);

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid role ID" });
  }

  try {
    const updates = await req.json();
    const role = await updateRole(id, updates);
    return NextResponse.json(role);
  } catch (error) {
    console.log("Error updating role:", error);
    return NextResponse.json({ error: "Failed to update role" });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  console.log("Deleting role:", id);

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid role ID" });
  }

  try {
    const role = await deleteRole(id);
    return NextResponse.json(role);
  } catch (error) {
    console.log("Error deleting role:", error);
    return NextResponse.json({ error: "Failed to delete role" });
  }
}
