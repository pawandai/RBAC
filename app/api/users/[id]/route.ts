import { deleteUser, fetchUserById, updateUser } from "@/actions/user.action";
import { connectToDB } from "@/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(context: { params: { id: string } }) {
  const { params } = context;
  const { id } = params;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid user ID" });
  }
  try {
    const user = await fetchUserById(id);
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch user by ID" });
  }
}

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const { id } = params;
  console.log("Updating user:", id);

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid user ID" });
  }

  try {
    const updates = await req.json();
    await connectToDB();
    const updatedUser = await updateUser(id, updates);
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update user" });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  console.log("Deleting role:", id);

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid role ID" });
  }

  try {
    const user = await deleteUser(id);
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete user" });
  }
}
