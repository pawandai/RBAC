"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { RevenueChart } from "./revenue-chart";
import { UserActivityChart } from "./user-activity-chart";
import { SalesChart } from "./sales-chart";
import { TrafficSourceChart } from "./traffic-source-chart";
import { ConversionRateChart } from "./conversion-rate-chart";
import { ProductPerformanceChart } from "./product-performance-chart";

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Analytics Dashboard
        </h1>
        This is just a demo analytics without any backend.
      </div>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Revenue"
              value="$45,231.89"
              change="+20.1%"
            />
            <StatsCard title="New Customers" value="+2,350" change="+180.1%" />
            <StatsCard title="Active Users" value="+12,234" change="+19%" />
            <StatsCard title="Conversion Rate" value="3.24%" change="+0.4%" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <ChartCard
              className="col-span-full lg:col-span-4"
              title="Revenue Over Time"
            >
              <RevenueChart />
            </ChartCard>
            <ChartCard
              className="col-span-full lg:col-span-3"
              title="Traffic Sources"
            >
              <TrafficSourceChart />
            </ChartCard>
          </div>
        </TabsContent>
        <TabsContent value="sales" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <ChartCard
              className="col-span-full lg:col-span-4"
              title="Sales Overview"
            >
              <SalesChart />
            </ChartCard>
            <ChartCard
              className="col-span-full lg:col-span-3"
              title="Product Performance"
            >
              <ProductPerformanceChart />
            </ChartCard>
          </div>
        </TabsContent>
        <TabsContent value="users" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <ChartCard
              className="col-span-full lg:col-span-4"
              title="User Activity"
            >
              <UserActivityChart />
            </ChartCard>
            <ChartCard
              className="col-span-full lg:col-span-3"
              title="Conversion Rate"
            >
              <ConversionRateChart />
            </ChartCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatsCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
}

function ChartCard({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full">
          {children}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
