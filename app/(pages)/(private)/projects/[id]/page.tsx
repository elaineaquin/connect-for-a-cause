import LazyBreadCrumb from "@/components/customs/lazy-breadcrumb";
import ContentLayout from "@/components/layouts/ContentLayout";
import { getAllProjects } from "@/server/project";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProjectsLayout from "../_components/layout/ProjectsLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CC | Projects",
  description: "A task and issue tracker build using Tanstack Table.",
};

const ProjectsPage = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["all-projects"],
    queryFn: () => getAllProjects({}),
  });

  if (isNaN(parseInt(params.id))) {
    return (
      <div className="h-96 overflow-y-hidden">
        <div className="flex h-full justify-center items-center">
          Invalid User ID :3
        </div>
      </div>
    );
  }

  return (
    <ContentLayout title="Projects">
      <LazyBreadCrumb
        items={[
          { href: "#", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { label: "Projects" },
        ]}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectsLayout userId={parseInt(params.id)} />
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default ProjectsPage;
