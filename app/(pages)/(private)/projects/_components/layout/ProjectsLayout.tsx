"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProjectsByAuthor } from "@/server/project";
import { useClient } from "@/store/use-client";
import { useQuery } from "@tanstack/react-query";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import ProjectList from "./ui/ProjectList";

interface ProjectsLayoutProps {
  userId: number;
}
const ProjectsLayout = ({ userId }: ProjectsLayoutProps) => {
  const { client } = useClient();
  const { data, isPending } = useQuery({
    queryKey: ["projects-by-author"],
    queryFn: () => getProjectsByAuthor({ userId }),
  });
  return (
    <div className="space-y-2">
      <Card>
        <CardContent className="p-4 space-y-6">
          {userId === client?.id && (
            <div className="flex justify-end">
              <Button variant={"default"}>
                <Link href={"/projects/create"} className="gap-2 flex">
                  <SquarePen size={20} />
                  New Project
                </Link>
              </Button>
            </div>
          )}
          <ProjectList isPending={isPending} projects={data?.data ?? []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsLayout;
