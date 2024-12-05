import { AdminContext } from "@/providers/AdminContext";
import { useContext } from "react";

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
