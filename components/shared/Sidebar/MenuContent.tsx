"use client";

import { usePathname } from "next/navigation";
import { BarChart, Home, MailWarning, User } from "lucide-react";
import Link from "next/link";

interface SidebarItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, to }) => {
  const pathname = usePathname();
  const active = pathname === to;

  return (
    <Link
      href={to}
      className={`
        flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200
        ${
          active
            ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
            : "hover:bg-gray-100 text-gray-600"
        }
      `}
    >
      <Icon className="mr-3 w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

const MenuContent = () => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-600 text-xl font-medium flex flex-col items-center">
        <MailWarning className="h-16 w-16" /> RBAC
      </span>

      <nav className="p-4 space-y-2 w-full">
        <SidebarItem to="/dashboard" icon={Home} label="Home" />
        <SidebarItem
          to="/dashboard/analytics"
          icon={BarChart}
          label="Analytics"
        />
        <SidebarItem to="/dashboard/profile" icon={User} label="Profile" />
      </nav>
    </div>
  );
};

export default MenuContent;
