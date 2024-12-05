import {
  createUser,
  fetchAllUsers,
  updateUserStatus,
} from "@/actions/user.action";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchAllUsers(1, 10);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch users" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await createUser(body);
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create user" });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, currentStatus } = body;
    const user = await updateUserStatus(userId, currentStatus);
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update user" });
  }
}
