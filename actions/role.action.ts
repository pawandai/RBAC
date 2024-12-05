"use server";

import { Role } from "@/database";
import { IRole, Role as RoleType } from "@/interfaces";

export async function fetchAllRoles() {
  try {
    return await Role.find();
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw new Error("Failed to fetch roles");
  }
}

export async function createRole(data: {
  name: string;
  permissions: string[];
}) {
  try {
    const role: IRole = new Role(data);
    await role.save();
    return role as RoleType;
  } catch (error) {
    console.error("Error creating role:", error);
    throw new Error("Failed to create role");
  }
}

export async function updateRole(
  roleId: string,
  updates: Partial<{ name: string; permissions: string[] }>
) {
  try {
    const role = (await Role.findByIdAndUpdate(roleId, updates, {
      new: true,
    })) as RoleType;
    return role;
  } catch (error) {
    console.error("Error updating role:", error);
    throw new Error("Failed to update role");
  }
}

export async function deleteRole(roleId: string) {
  try {
    const role = (await Role.findByIdAndDelete(roleId)) as RoleType;
    return role;
  } catch (error) {
    console.error("Error deleting role:", error);
    throw new Error("Failed to delete role");
  }
}

export async function manageRolePermissions(
  roleId: string,
  permissions: string[]
) {
  try {
    return await Role.findByIdAndUpdate(roleId, { permissions }, { new: true });
  } catch (error) {
    console.error("Error updating role permissions:", error);
    throw new Error("Failed to update role permissions");
  }
}

export async function getPermissions() {
  try {
    const role = (await Role.find()) as RoleType[];
    return role.reduce<string[]>((acc, curr) => {
      acc.push(...curr.permissions);
      return acc;
    }, []);
  } catch (error) {
    console.error("Error fetching permissions:", error);
    throw new Error("Failed to fetch permissions");
  }
}

export async function getRolePermissions(roleId: string) {
  try {
    const role = (await Role.findById(roleId)) as RoleType;
    return role.permissions;
  } catch (error) {
    console.error("Error fetching role permissions:", error);
    throw new Error("Failed to fetch role permissions");
  }
}
