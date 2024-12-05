"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Role } from "@/interfaces";
import React from "react";
import { Input } from "@/components/ui/input";

type RoleName = "Admin" | "Editor" | "Viewer";

interface AddEditRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (role: Role) => void;
  role: Role | null;
}

const permissions = [
  { id: "user_management", label: "User Management" },
  { id: "system_config", label: "System Configuration" },
  { id: "full_access", label: "Full System Access" },
  { id: "content_edit", label: "Content Editing" },
  { id: "content_view", label: "Content Viewing" },
];

export default function AddEditRoleDialog({
  open,
  onOpenChange,
  onSave,
  role,
}: AddEditRoleDialogProps) {
  const [name, setName] = React.useState<RoleName | "">(
    (role?.name as RoleName | "") || ""
  );
  const [selectedPermissions, setSelectedPermissions] = React.useState<
    string[]
  >(role?.permissions || []);

  React.useEffect(() => {
    if (role) {
      setName(role.name as RoleName); // Explicitly cast role name
      setSelectedPermissions(role.permissions);
    } else {
      setName("");
      setSelectedPermissions([]);
    }
  }, [role]);

  const handleSave = () => {
    if (!name) {
      alert("Please select a role name.");
      return;
    }
    onSave({
      ...role,
      _id: role?._id as string,
      name,
      permissions: selectedPermissions,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{role ? "Edit Role" : "Add Role"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Role Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value as RoleName)}
              placeholder="Enter role name"
            />
          </div>
          <div>
            <Label>Permissions</Label>
            <div className="space-y-2">
              {permissions.map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={permission.id}
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={(checked) => {
                      setSelectedPermissions(
                        checked
                          ? [...selectedPermissions, permission.id]
                          : selectedPermissions.filter(
                              (p) => p !== permission.id
                            )
                      );
                    }}
                  />
                  <Label htmlFor={permission.id}>{permission.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
