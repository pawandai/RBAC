"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  {
    name: "Jan",
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Feb",
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Mar",
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Apr",
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "May",
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jun",
    sales: Math.floor(Math.random() * 5000) + 1000,
    profit: Math.floor(Math.random() * 2000) + 500,
  },
];

export function SalesChart() {
  return (
    <ChartContainer
      config={{
        sales: {
          label: "Sales",
          color: "hsl(var(--chart-1))",
        },
        profit: {
          label: "Profit",
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
            tickFormatter={(value) => `$${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="sales"
            fill="var(--color-sales)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="profit"
            fill="var(--color-profit)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
