"use client";

import { useState, useMemo } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle, MoreHorizontal, Search } from "lucide-react";

const initialUsers = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Editor" },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Viewer",
  },
  { id: "4", name: "Diana Ross", email: "diana@example.com", role: "Editor" },
  { id: "5", name: "Eva Green", email: "eva@example.com", role: "Admin" },
  {
    id: "6",
    name: "Frank Sinatra",
    email: "frank@example.com",
    role: "Viewer",
  },
];

type User = (typeof initialUsers)[0];
type Role = "Admin" | "Editor" | "Viewer";

const getBadgeColor = (role: string) => {
  switch (role.toLowerCase()) {
    case "admin":
      return "bg-red-100 text-red-800 border-red-300";
    case "editor":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "viewer":
      return "bg-green-100 text-green-800 border-green-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

export function UserList() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [searchQueries, setSearchQueries] = useState<Record<Role, string>>({
    Admin: "",
    Editor: "",
    Viewer: "",
  });

  const columns = useMemo(() => {
    const cols: Record<Role, User[]> = { Admin: [], Editor: [], Viewer: [] };
    users.forEach((user) => {
      const roleUsers = cols[user.role as Role];
      const query = searchQueries[user.role as Role].toLowerCase();
      if (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      ) {
        roleUsers.push(user);
      }
    });
    return cols;
  }, [users, searchQueries]);

  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
  };

  const confirmDeleteUser = () => {
    if (deletingUser) {
      setUsers(users.filter((user) => user.id !== deletingUser.id));
    }
    setDeletingUser(null);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceRole = source.droppableId as Role;
    const destRole = destination.droppableId as Role;

    const newColumns = { ...columns };

    // Remove from the source list
    const [movedUser] = newColumns[sourceRole].splice(source.index, 1);

    // Change the user's role if it was moved to a different column
    if (sourceRole !== destRole) {
      movedUser.role = destRole;
    }

    // Add to the destination list
    newColumns[destRole].splice(destination.index, 0, movedUser);

    // Update the users state
    const newUsers = Object.values(newColumns).flat();
    setUsers(newUsers);
  };

  const handleSearch = (role: Role, query: string) => {
    setSearchQueries((prev) => ({ ...prev, [role]: query }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
        {(Object.keys(columns) as Role[]).map((role) => (
          <Droppable droppableId={role} key={role}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={cn(
                  "p-6 rounded-lg",
                  "bg-gray-50 shadow-lg",
                  snapshot.isDraggingOver && "bg-gray-100"
                )}
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  {role}s
                </h2>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="search"
                      placeholder={`Search ${role}s...`}
                      value={searchQueries[role]}
                      onChange={(e) => handleSearch(role, e.target.value)}
                      className="pl-12 rounded-full border-none shadow-inner bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                  </div>
                </div>
                {columns[role].map((user, index) => (
                  <Draggable key={user.id} draggableId={user.id} index={index}>
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={cn(
                          "mb-4 rounded-lg bg-gray-50 shadow-lg transition-transform duration-200",
                          snapshot.isDragging && "scale-105 shadow-2xl",
                          !snapshot.isDragging &&
                            "hover:scale-102 hover:shadow-md"
                        )}
                      >
                        <h1 className="px-6 py-2">
                          <CardTitle className="text-lg font-medium text-gray-800">
                            {user.name}
                          </CardTitle>
                        </h1>
                        <CardContent>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center justify-between mt-3">
                            <Badge
                              className={cn(
                                getBadgeColor(user.role),
                                "rounded-full shadow-inner px-3 py-1"
                              )}
                            >
                              {user.role}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="rounded-full shadow-lg bg-gray-100 hover:bg-gray-200"
                                >
                                  <MoreHorizontal />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="rounded-lg bg-gray-50 shadow-md"
                              >
                                <DropdownMenuLabel className="text-gray-600">
                                  Actions
                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                  className="text-red-600 hover:bg-red-100"
                                  onClick={() => handleDeleteUser(user)}
                                >
                                  Delete user
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>

      {deletingUser && (
        <AlertDialog
          open={!!deletingUser}
          onOpenChange={() => setDeletingUser(null)}
        >
          <AlertDialogContent className="bg-gray-50 shadow-lg rounded-lg">
            <AlertDialogHeader>
              <AlertCircle className="mx-auto w-10 h-10" />
              <AlertDialogTitle className="text-gray-800 text-center">
                Are you sure you want to delete this user?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 text-center">
                This action cannot be undone. This will permanently delete the
                account of {deletingUser.name} and remove their data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex w-full items-center justify-between">
              <AlertDialogCancel className="rounded-full bg-gray-100 hover:bg-gray-200 shadow-inner">
                No
              </AlertDialogCancel>
              <AlertDialogAction
                className="rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600"
                onClick={confirmDeleteUser}
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </DragDropContext>
  );
}
