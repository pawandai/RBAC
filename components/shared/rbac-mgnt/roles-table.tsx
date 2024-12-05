"use client";

import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Role } from "@/interfaces";

interface RolesTableProps {
  roles: Role[];
  onEditRole: (role: Role) => void;
  onDeleteRole: (roleId: string) => void;
}

const permissionLabels: { [key: string]: string } = {
  user_management: "User Management",
  system_config: "System Configuration",
  full_access: "Full System Access",
  content_edit: "Content Editing",
  content_view: "Content Viewing",
};

export default function RolesTable({
  roles,
  onEditRole,
  onDeleteRole,
}: RolesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Permissions</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.map((role) => (
          <TableRow key={role._id}>
            <TableCell className="font-medium">{role.name}</TableCell>
            <TableCell>
              {role.permissions.map((perm) => (
                <span
                  key={perm}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-2"
                >
                  {permissionLabels[perm]}
                </span>
              ))}
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditRole(role)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this role?")) {
                    onDeleteRole(role._id as string);
                  }
                }}
              >
                <Trash2 className="h-4 w-4 text-rose-600" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
