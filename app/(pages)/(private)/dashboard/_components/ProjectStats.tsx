"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserProjectStat } from "@/server/user";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from shadcn
import { formatPercentage } from "@/lib/utils";

const ProjectStats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["project-stats"],
    queryFn: getUserProjectStat,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Projects</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <Skeleton className="w-full h-12 mb-2" />
            <Skeleton className="w-16 h-4" />
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">
              {data ? data.currentMonthProjects : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {data ? formatPercentage(data.percentageChange!) : 0} from last
              month
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectStats;
