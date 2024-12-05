import Sidebar from "@/components/shared/Sidebar";
import AnalyticsDashboard from "./analytics-dashboard";

export default function AnalyticsPage() {
  return (
    <Sidebar>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnalyticsDashboard />
      </div>
    </Sidebar>
  );
}
