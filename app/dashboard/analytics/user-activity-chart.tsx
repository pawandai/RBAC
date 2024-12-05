"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  {
    name: "Jan",
    active: Math.floor(Math.random() * 5000) + 1000,
    new: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Feb",
    active: Math.floor(Math.random() * 5000) + 1000,
    new: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Mar",
    active: Math.floor(Math.random() * 5000) + 1000,
    new: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Apr",
    active: Math.floor(Math.random() * 5000) + 1000,
    new: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "May",
    active: Math.floor(Math.random() * 5000) + 1000,
    new: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jun",
    active: Math.floor(Math.random() * 5000) + 1000,
    new: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jul",
    active: Math.floor(Math.random() * 5000) + 1000,
    new: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Aug",
    active: Math.floor(Math.random() * 5000) + 1000,
    new: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Sep",
    active: Math.floor(Math.random() * 5000) + 1000,
    new: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Oct",
    active: Math.floor(Math.random() * 5000) + 1000,
    new: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Nov",
    active: Math.floor(Math.random() * 5000) + 1000,
    new: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Dec",
    active: Math.floor(Math.random() * 5000) + 1000,
    new: Math.floor(Math.random() * 2000) + 500,
  },
];

export function UserActivityChart() {
  return (
    <ChartContainer
      config={{
        active: {
          label: "Active Users",
          color: "hsl(var(--chart-1))",
        },
        new: {
          label: "New Users",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="w-full"
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
          <Line
            type="monotone"
            dataKey="active"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="new"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
