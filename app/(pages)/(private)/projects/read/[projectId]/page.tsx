import LazyBreadCrumb from "@/components/customs/lazy-breadcrumb";
import ContentLayout from "@/components/layouts/ContentLayout";
import { findProject } from "@/server/project";
import DisplayProject from "../../_components/ui/DisplayProject";
import { TypographyP } from "@/components/typography";

const ReadProjectPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const project = await findProject(params);

  return (
    <ContentLayout title="Projects">
      <LazyBreadCrumb
        items={[
          { href: "#", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { href: "/projects", label: "Projects" },
          { label: "Read" },
        ]}
      />
      {project.data ? (
        <DisplayProject project={project.data} />
      ) : (
        <TypographyP>Project Not Found :3</TypographyP>
      )}
    </ContentLayout>
  );
};

export default ReadProjectPage;
