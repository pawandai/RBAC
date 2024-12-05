"use client";

import { useEffect, useState } from "react";
import { Shield, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IRole, IUser, Role, User } from "@/interfaces";
import { toast } from "sonner";
import RolesTable from "./shared/rbac-mgnt/roles-table";
import UsersTable from "./shared/rbac-mgnt/users-table";
import AddEditUserDialog from "./shared/rbac-mgnt/add-edit-user-dialog";
import AddEditRoleDialog from "./shared/rbac-mgnt/add-edit-role-dialog";

export default function RBACManagement() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof User | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  async function fetchUsers() {
    const response = await fetch("/api/users").then((res) => res.json());
    setUsers(response.users as User[]);
    console.log("Users", response.users);
  }

  async function fetchRoles() {
    const response = await fetch("/api/roles").then((res) => res.json());
    setRoles(response as Role[]);
    console.log("Roles", response);
  }

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAddRole = async (newRole: IRole) => {
    try {
      const response = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRole),
      });
      if (!response.ok) throw new Error("Failed to create role");

      const createdRole = await response.json();
      setRoles([...roles, createdRole]);
      toast.success(`Role '${createdRole.name}' created successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create role. Please try again.");
    }
  };

  const handleEditRole = async (updatedRole: Role) => {
    try {
      const response = await fetch(`/api/roles/${updatedRole._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRole),
      });
      if (!response.ok) throw new Error("Failed to update role");

      const updated = await response.json();
      fetchRoles();
      toast.success(`Role '${updated.name}' updated successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role. Please try again.");
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    try {
      const response = await fetch(`/api/roles/${roleId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: roleId }),
      });
      if (!response.ok) throw new Error("Failed to delete role");

      const deletedRole = await response.json();
      setRoles(roles.filter((role) => role._id !== roleId));
      toast.success(`Role '${deletedRole.name}' deleted successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete role. Please try again.");
    }
  };

  const handleAddUser = async (newUser: IUser) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Failed to create user");

      const createdUser = await response.json();
      setUsers([...users, { ...createdUser, status: "Active" }]);
      toast.success(`User '${createdUser.name}' created successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create user. Please try again.");
    }
  };

  const handleEditUser = async (updatedUser: IUser) => {
    try {
      const response = await fetch(`/api/users/${selectedUser?._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) throw new Error("Failed to update user");

      const updated = await response.json();
      setUsers(users.map((user) => (user._id === updated.id ? updated : user)));
      toast.success(`User '${updated.name}' updated successfully`);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });
      if (!response.ok) throw new Error("Failed to delete user");

      const deletedUser = await response.json();
      setUsers(users.filter((user) => user._id !== userId));
      toast.success(`User '${deletedUser.name}' deleted successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const toggleUserStatus = async (
    userId: string,
    currentStatus: "Active" | "Inactive"
  ) => {
    try {
      await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, currentStatus }),
      }).then((res) => res.json());
      fetchUsers();
      toast.success(`User status updated successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user status. Please try again.");
    }
  };

  const handleSortChange = (field: keyof User) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <Shield className="mr-3 text-blue-600" />
          Role-Based Access Control
        </h1>
      </div>

      <Tabs defaultValue="roles" className="w-full">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="roles">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Roles</h2>
            <Button onClick={() => setIsRoleDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Role
            </Button>
          </div>
          <RolesTable
            roles={roles as Role[]}
            onEditRole={(role) => {
              setSelectedRole(role);
              setIsRoleDialogOpen(true);
            }}
            onDeleteRole={handleDeleteRole}
          />
        </TabsContent>
        <TabsContent value="users">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Users</h2>
            <input
              type="text"
              placeholder="Search users..."
              className="border border-gray-300 rounded px-2 py-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={() => setIsUserDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>
          <UsersTable
            users={users}
            onEditUser={(user) => {
              setSelectedUser(user);
              setIsUserDialogOpen(true);
            }}
            onDeleteUser={handleDeleteUser}
            onToggleUserStatus={toggleUserStatus}
            searchQuery={searchQuery}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
          />
        </TabsContent>
      </Tabs>

      <AddEditRoleDialog
        open={isRoleDialogOpen}
        onOpenChange={setIsRoleDialogOpen}
        onSave={(role) => {
          if (selectedRole) {
            handleEditRole(role);
          } else {
            handleAddRole(role as IRole);
          }
          setSelectedRole(null);
        }}
        role={selectedRole}
      />

      <AddEditUserDialog
        open={isUserDialogOpen}
        onOpenChange={setIsUserDialogOpen}
        onSave={(user) => {
          if (selectedUser) {
            handleEditUser(user);
          } else {
            handleAddUser(user);
          }
          setSelectedUser(null);
        }}
        user={selectedUser}
        roles={roles as Role[]}
      />
    </div>
  );
}
