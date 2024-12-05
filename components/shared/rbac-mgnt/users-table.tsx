"use client";

import React, { useMemo } from "react";
import { Edit, Lock, Trash2, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/interfaces";

interface UsersTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onToggleUserStatus: (
    userId: string,
    currentStatus: "Active" | "Inactive"
  ) => void;
  searchQuery: string;
  sortField: keyof User | null;
  sortOrder: "asc" | "desc";
  onSortChange: (field: keyof User) => void;
}

export default function UsersTable({
  users,
  onEditUser,
  onDeleteUser,
  onToggleUserStatus,
  searchQuery,
  sortField,
  sortOrder,
  onSortChange,
}: UsersTableProps) {
  // Filter users based on search query
  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [users, searchQuery]
  );

  // Sort users based on selected field and order
  const sortedUsers = useMemo(() => {
    if (!sortField) return filteredUsers;
    return [...filteredUsers].sort((a, b) => {
      const valueA = a[sortField] || "";
      const valueB = b[sortField] || "";
      const comparison =
        typeof valueA === "string" && typeof valueB === "string"
          ? valueA.localeCompare(valueB)
          : 0;
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredUsers, sortField, sortOrder]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            onClick={() => onSortChange("name")}
            className="cursor-pointer"
          >
            Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </TableHead>
          <TableHead
            onClick={() => onSortChange("email")}
            className="cursor-pointer"
          >
            Email {sortField === "email" && (sortOrder === "asc" ? "↑" : "↓")}
          </TableHead>
          <TableHead
            onClick={() => onSortChange("role")}
            className="cursor-pointer"
          >
            Role {sortField === "role" && (sortOrder === "asc" ? "↑" : "↓")}
          </TableHead>
          <TableHead
            onClick={() => onSortChange("status")}
            className="cursor-pointer"
          >
            Status {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedUsers.map((user) => (
          <TableRow key={user._id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role.name}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.status}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteUser(user._id as string)}
              >
                <Trash2 className="h-4 w-4 text-rose-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditUser(user)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  user.status &&
                  onToggleUserStatus(user._id as string, user.status)
                }
              >
                {user.status === "Active" ? (
                  <span className="flex gap-1 items-center justify-center">
                    <Lock className="h-4 w-4 text-green-600" /> Active
                  </span>
                ) : (
                  <span className="flex gap-1 items-center justify-center">
                    <Unlock className="h-4 w-4 text-rose-600" /> Inactive
                  </span>
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
