"use client";

import { fetchAllRoles } from "@/actions/role.action";
import { assignRoleToUser, fetchAllUsers } from "@/actions/user.action";
import { IRole, IUser } from "@/interfaces";
import mongoose from "mongoose";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

type AdminContextType = {
  users: IUser[];
  roles: IRole[];
  loading: boolean;
  error: string | null;
  fetchAllData: () => void;
  assignRole: (userId: string, roleId: string) => Promise<void>;
};

export const AdminContext = createContext<AdminContextType | null>(null);

export default function AdminContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [userData, roleData] = await Promise.all([
        fetchAllUsers(),
        fetchAllRoles(),
      ]);
      setUsers(userData.users);
      setRoles(roleData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load data.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const assignRole = async (userId: string, roleId: string) => {
    try {
      setLoading(true);
      await assignRoleToUser(
        new mongoose.Types.ObjectId(userId),
        new mongoose.Types.ObjectId(roleId)
      );
      toast.success("Role assigned successfully!");
      fetchAllData();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to assign role.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        users,
        roles,
        loading,
        error,
        fetchAllData,
        assignRole,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
