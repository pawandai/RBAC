"use server";

import { connectToDB, Role, User } from "@/database";
import { IRole, IUser } from "@/interfaces";
import mongoose from "mongoose";

export async function fetchAllUsers(page: number = 1, limit: number = 10) {
  try {
    const skip = (page - 1) * limit;
    const [users, totalUsers] = await Promise.all([
      User.find().populate("role").skip(skip).limit(limit),
      User.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalUsers / limit);

    return {
      users,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching users with pagination:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function createUser(data: IUser) {
  try {
    const role = await Role.findOne({ name: data.role.name });
    const user = new User({ ...data, role }) as IUser;
    await user.save();
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

export async function updateUser(
  userId: string,
  updates: Partial<{ name: string; email: string; status: string; role: IRole }>
) {
  try {
    const user = (await User.findByIdAndUpdate(
      userId,
      {
        name: updates.name,
        email: updates.email,
        status: updates.status,
        role: updates?.role?._id,
      },
      {
        new: true,
      }
    )) as IUser;
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export async function deleteUser(userId: string) {
  try {
    const response = await User.findByIdAndDelete(userId);
    return response?.toJSON();
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}

export async function assignRoleToUser(
  userId: mongoose.Types.ObjectId,
  roleId: mongoose.Types.ObjectId
) {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { role: roleId },
      { new: true }
    );
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.error("Error assigning role to user:", error);
    throw new Error("Failed to assign role");
  }
}

export async function fetchUserById(userId: string) {
  try {
    const user = await User.findById(userId).populate("role");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user by ID");
  }
}

export const updateUserStatus = async (
  userId: string,
  currentStatus: "Active" | "Inactive"
) => {
  try {
    await connectToDB();
    const userToBeUpdated = await User.findById(userId);
    if (!userToBeUpdated) {
      throw new Error("User not found");
    }
    userToBeUpdated.status = currentStatus === "Active" ? "Inactive" : "Active";
    return await userToBeUpdated.save();
  } catch (error) {
    console.error(error);
  }
};
