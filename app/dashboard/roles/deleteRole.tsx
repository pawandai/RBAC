import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IUser } from "@/interfaces";
import React, { useState } from "react";
import { initialUsers } from "./editRole";

interface DeleteRoleProps {
  roleId: string;
  onDelete: (roleId: string) => void;
}

const DeleteRole: React.FC<DeleteRoleProps> = ({ roleId, onDelete }) => {
  const [users, setUsers] = useState<IUser[]>(initialUsers);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      onDelete(roleId);
    }
  };

  const confirmDeleteUser = () => {
    if (deletingUser) {
      setUsers(users.filter((user) => user.id !== deletingUser.id));
    }
    setDeletingUser(null);
  };

  return (
    <AlertDialog
      open={!!deletingUser}
      onOpenChange={() => setDeletingUser(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this user?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            account of {deletingUser.name} and remove their data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDeleteUser}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRole;
