import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/server/definitions";
import { columns } from "./ProjectColumn";
import { DataTable } from "@/components/customs/table";
import { TypographyP } from "@/components/typography";

interface ProjectDisplayListProps {
  isPending: boolean;
  projects: Array<Project>;
}

const ProjectList = ({ isPending, projects }: ProjectDisplayListProps) => {
  return isPending ? (
    <div className="p-0">
      <Skeleton className="w-full h-[280px]" />
    </div>
  ) : (
    <div className="p-0">
      {projects.length > 0 ? (
        <DataTable data={projects} columns={columns} />
      ) : (
        <div className="p-4 text-center">
          <TypographyP>No Projects Found :3</TypographyP>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
