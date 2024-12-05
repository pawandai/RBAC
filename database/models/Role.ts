import { IRole } from "@/interfaces";
import mongoose, { Schema } from "mongoose";

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const Role = mongoose.models.Role || mongoose.model<IRole>("Role", RoleSchema);

export default Role;
