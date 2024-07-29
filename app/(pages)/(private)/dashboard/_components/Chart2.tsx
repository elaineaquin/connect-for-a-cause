"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { project: "Project A", funds: 12000, fill: "var(--color-project-a)" },
  { project: "Project B", funds: 9500, fill: "var(--color-project-b)" },
  { project: "Project C", funds: 8030.32, fill: "var(--color-project-c)" },
  { project: "Project D", funds: 7530, fill: "var(--color-project-d)" },
  { project: "Project E", funds: 6202, fill: "var(--color-project-e)" },
];

const chartConfig = {
  funds: {
    label: "Funds",
  },
  "project-a": {
    label: "Project A",
    color: "hsl(var(--chart-1))",
  },
  "project-b": {
    label: "Project B",
    color: "hsl(var(--chart-2))",
  },
  "project-c": {
    label: "Project C",
    color: "hsl(var(--chart-3))",
  },
  "project-d": {
    label: "Project D",
    color: "hsl(var(--chart-4))",
  },
  "project-e": {
    label: "Project E",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function Chart2() {
  const totalFunds = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.funds, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Fund Raising</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="funds"
              nameKey="project"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl"
                        >
                          {totalFunds.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Funds Raised
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total funds raised for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
