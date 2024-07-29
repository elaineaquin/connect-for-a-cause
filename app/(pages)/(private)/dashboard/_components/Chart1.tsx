"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { date: "2024-04-01", collaborators: 50, projects: 1 },
  { date: "2024-04-02", collaborators: 65, projects: 0 },
  { date: "2024-04-03", collaborators: 75, projects: 0 },
  { date: "2024-04-04", collaborators: 80, projects: 1 },
  { date: "2024-04-05", collaborators: 90, projects: 0 },
  { date: "2024-04-06", collaborators: 100, projects: 0 },
  { date: "2024-04-07", collaborators: 85, projects: 1 },
  { date: "2024-04-08", collaborators: 95, projects: 0 },
  { date: "2024-04-09", collaborators: 70, projects: 0 },
  { date: "2024-04-10", collaborators: 110, projects: 1 },
  { date: "2024-04-11", collaborators: 120, projects: 0 },
  { date: "2024-04-12", collaborators: 130, projects: 1 },
  { date: "2024-04-13", collaborators: 140, projects: 0 },
  { date: "2024-04-14", collaborators: 95, projects: 0 },
  { date: "2024-04-15", collaborators: 85, projects: 0 },
  { date: "2024-04-16", collaborators: 100, projects: 1 },
  { date: "2024-04-17", collaborators: 150, projects: 0 },
  { date: "2024-04-18", collaborators: 160, projects: 0 },
  { date: "2024-04-19", collaborators: 120, projects: 1 },
  { date: "2024-04-20", collaborators: 95, projects: 0 },
  { date: "2024-04-21", collaborators: 105, projects: 0 },
  { date: "2024-04-22", collaborators: 115, projects: 1 },
  { date: "2024-04-23", collaborators: 120, projects: 0 },
  { date: "2024-04-24", collaborators: 130, projects: 0 },
  { date: "2024-04-25", collaborators: 100, projects: 1 },
  { date: "2024-04-26", collaborators: 85, projects: 0 },
  { date: "2024-04-27", collaborators: 140, projects: 1 },
  { date: "2024-04-28", collaborators: 90, projects: 0 },
  { date: "2024-04-29", collaborators: 120, projects: 1 },
  { date: "2024-04-30", collaborators: 150, projects: 0 },
  { date: "2024-05-01", collaborators: 110, projects: 0 },
  { date: "2024-05-02", collaborators: 140, projects: 1 },
  { date: "2024-05-03", collaborators: 130, projects: 0 },
  { date: "2024-05-04", collaborators: 150, projects: 0 },
  { date: "2024-05-05", collaborators: 160, projects: 1 },
  { date: "2024-05-06", collaborators: 180, projects: 0 },
  { date: "2024-05-07", collaborators: 140, projects: 0 },
  { date: "2024-05-08", collaborators: 110, projects: 0 },
  { date: "2024-05-09", collaborators: 120, projects: 1 },
  { date: "2024-05-10", collaborators: 140, projects: 0 },
  { date: "2024-05-11", collaborators: 150, projects: 0 },
  { date: "2024-05-12", collaborators: 130, projects: 1 },
  { date: "2024-05-13", collaborators: 125, projects: 0 },
  { date: "2024-05-14", collaborators: 160, projects: 1 },
  { date: "2024-05-15", collaborators: 170, projects: 0 },
  { date: "2024-05-16", collaborators: 150, projects: 0 },
  { date: "2024-05-17", collaborators: 180, projects: 1 },
  { date: "2024-05-18", collaborators: 140, projects: 0 },
  { date: "2024-05-19", collaborators: 120, projects: 0 },
  { date: "2024-05-20", collaborators: 110, projects: 0 },
  { date: "2024-05-21", collaborators: 90, projects: 1 },
  { date: "2024-05-22", collaborators: 85, projects: 0 },
  { date: "2024-05-23", collaborators: 130, projects: 0 },
  { date: "2024-05-24", collaborators: 140, projects: 0 },
  { date: "2024-05-25", collaborators: 120, projects: 1 },
  { date: "2024-05-26", collaborators: 110, projects: 0 },
  { date: "2024-05-27", collaborators: 150, projects: 1 },
  { date: "2024-05-28", collaborators: 100, projects: 0 },
  { date: "2024-05-29", collaborators: 80, projects: 0 },
  { date: "2024-05-30", collaborators: 140, projects: 1 },
  { date: "2024-06-01", collaborators: 90, projects: 1 },
  { date: "2024-06-02", collaborators: 70, projects: 0 },
  { date: "2024-06-03", collaborators: 120, projects: 1 },
  { date: "2024-06-04", collaborators: 130, projects: 0 },
  { date: "2024-06-05", collaborators: 140, projects: 0 },
  { date: "2024-06-06", collaborators: 110, projects: 1 },
  { date: "2024-06-07", collaborators: 150, projects: 0 },
  { date: "2024-06-08", collaborators: 120, projects: 0 },
  { date: "2024-06-09", collaborators: 140, projects: 0 },
  { date: "2024-06-10", collaborators: 100, projects: 1 },
  { date: "2024-06-11", collaborators: 110, projects: 0 },
  { date: "2024-06-12", collaborators: 90, projects: 0 },
  { date: "2024-06-13", collaborators: 100, projects: 1 },
  { date: "2024-06-14", collaborators: 120, projects: 0 },
  { date: "2024-06-15", collaborators: 130, projects: 1 },
  { date: "2024-06-16", collaborators: 140, projects: 0 },
  { date: "2024-06-17", collaborators: 110, projects: 1 },
  { date: "2024-06-18", collaborators: 120, projects: 0 },
  { date: "2024-06-19", collaborators: 130, projects: 0 },
  { date: "2024-06-20", collaborators: 140, projects: 1 },
  { date: "2024-06-21", collaborators: 75, projects: 0 },
  { date: "2024-06-22", collaborators: 120, projects: 0 },
  { date: "2024-06-23", collaborators: 160, projects: 1 },
  { date: "2024-06-24", collaborators: 85, projects: 0 },
  { date: "2024-06-25", collaborators: 90, projects: 0 },
  { date: "2024-06-26", collaborators: 140, projects: 1 },
  { date: "2024-06-27", collaborators: 150, projects: 0 },
  { date: "2024-06-28", collaborators: 100, projects: 0 },
  { date: "2024-06-29", collaborators: 80, projects: 1 },
  { date: "2024-06-30", collaborators: 150, projects: 0 },
];

const chartConfig = {
  collaborators: {
    label: "Collaborators",
    color: "hsl(var(--chart-2))",
  },
  projects: {
    label: "Projects",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Chart1() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Projects - Collaborators Insight</CardTitle>
          <CardDescription>
            Showing total collaborators and projects
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient
                id="fillCollaborators"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-collaborators)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-collaborators)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillProjects" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-projects)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-projects)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="projects"
              type="natural"
              fill="url(#fillProjects)"
              stroke="var(--color-projects)"
              stackId="b"
            />
            <Area
              dataKey="collaborators"
              type="natural"
              fill="url(#fillCollaborators)"
              stroke="var(--color-collaborators)"
              stackId="c"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
