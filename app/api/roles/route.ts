import { createRole, fetchAllRoles } from "@/actions/role.action";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const roles = await fetchAllRoles();
    return NextResponse.json(roles);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch roles" });
  }
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const body = await req.json();
    console.log("Creating role:", body);
    const role = await createRole(body);
    return NextResponse.json(role);
  } catch (error) {
    console.log("Error creating role:", error);
    res.status(500).json({ error: "Failed to create role" });
  }
}
