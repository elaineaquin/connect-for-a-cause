import LazyBreadCrumb from "@/components/customs/lazy-breadcrumb";
import ContentLayout from "@/components/layouts/ContentLayout";
import { findProject } from "@/server/project";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import ProjectDetailsForm from "../ProjectDetailsForm";
import { getUsers } from "@/server/user";
import { TypographyP } from "@/components/typography";

const ReadProjectPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["all-users"],
    queryFn: getUsers,
  });

  const project = await findProject(params);

  return (
    <ContentLayout title="Projects">
      <LazyBreadCrumb
        items={[
          { href: "#", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { href: "/projects", label: "Projects" },
          { label: "Edit" },
        ]}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Card>
          <CardContent className="p-4">
            {project.data ? (
              <ProjectDetailsForm project={project.data} />
            ) : (
              <TypographyP>Project Not Found</TypographyP>
            )}
          </CardContent>
        </Card>
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default ReadProjectPage;
