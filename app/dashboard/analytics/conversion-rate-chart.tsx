"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { name: "Jan", rate: 2.5 },
  { name: "Feb", rate: 2.8 },
  { name: "Mar", rate: 3.2 },
  { name: "Apr", rate: 3.5 },
  { name: "May", rate: 3.8 },
  { name: "Jun", rate: 3.6 },
  { name: "Jul", rate: 3.9 },
  { name: "Aug", rate: 4.2 },
  { name: "Sep", rate: 4.5 },
  { name: "Oct", rate: 4.3 },
  { name: "Nov", rate: 4.6 },
  { name: "Dec", rate: 4.8 },
];

export function ConversionRateChart() {
  return (
    <ChartContainer
      config={{
        rate: {
          label: "Conversion Rate",
          color: "hsl(var(--chart-1))",
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
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="rate"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
