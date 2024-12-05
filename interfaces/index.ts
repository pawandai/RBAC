import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: IRole;
  status?: "Active" | "Inactive";
}

export interface IRole extends Document {
  name: "Admin" | "Editor" | "Viewer";
  permissions: string[];
}

export interface Role {
  _id: string;
  name: "Admin" | "Editor" | "Viewer";
  permissions: string[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  status?: "Active" | "Inactive";
}
