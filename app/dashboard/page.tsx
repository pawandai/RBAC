"use client";

import RBACManagement from "@/components/rbac";
import Sidebar from "@/components/shared/Sidebar";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Sidebar>
      <div>
        <RBACManagement />
      </div>
    </Sidebar>
  );
};

export default DashboardPage;
