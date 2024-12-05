"use server";

import { connectToDB, User } from "@/database";
import { createUser } from "./user.action";
import { IUser } from "@/interfaces";

export async function signup(data: { name: string; email: string }) {
  try {
    await connectToDB();
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      login({ email: data.email });
    }
    const newUser = await createUser(data as IUser);

    return { message: "Signup successful!", newUser, success: true };
  } catch (error) {
    console.error("Signup error:", error);
    throw new Error("Signup failed. Please try again.");
  }
}

export async function login(data: { email: string }) {
  try {
    await connectToDB();
    const user = await User.findOne({ email: data.email });

    return { message: "Login successful!", success: true, user };
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed. Please try again.");
  }
}
