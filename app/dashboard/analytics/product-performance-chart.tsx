"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { name: "Product A", sales: 4000, returns: 400 },
  { name: "Product B", sales: 3000, returns: 300 },
  { name: "Product C", sales: 2000, returns: 200 },
  { name: "Product D", sales: 2780, returns: 278 },
  { name: "Product E", sales: 1890, returns: 189 },
  { name: "Product F", sales: 2390, returns: 239 },
  { name: "Product G", sales: 3490, returns: 349 },
];

export function ProductPerformanceChart() {
  return (
    <ChartContainer
      config={{
        sales: {
          label: "Sales",
          color: "hsl(var(--chart-1))",
        },
        returns: {
          label: "Returns",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="w-full"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="sales"
            fill="var(--color-sales)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="returns"
            fill="var(--color-returns)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
