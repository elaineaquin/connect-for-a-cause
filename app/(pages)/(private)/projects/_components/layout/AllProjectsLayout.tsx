"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getAllProjects } from "@/server/project";
import { useQuery } from "@tanstack/react-query";
import ProjectList from "./ui/ProjectList";

const AllProjectsLayout = () => {
  const { data, isPending } = useQuery({
    queryKey: ["all-projects"],
    queryFn: () => getAllProjects({}),
  });

  return (
    <div className="space-y-2">
      <Card>
        <CardContent className="p-4 space-y-6">
          <ProjectList isPending={isPending} projects={data?.data ?? []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AllProjectsLayout;
