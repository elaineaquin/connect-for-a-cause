import ContentLayout from "@/components/layouts/ContentLayout";
import ProjectDetailsForm from "./ProjectDetailsForm";
import { Card, CardContent } from "@/components/ui/card";
import LazyBreadCrumb from "@/components/customs/lazy-breadcrumb";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUsers } from "@/server/user";

const Projects = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["all-users"],
    queryFn: getUsers,
  });

  return (
    <ContentLayout title="Projects">
      <LazyBreadCrumb
        items={[
          { href: "#", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { href: "/projects", label: "Projects" },
          { label: "Create" },
        ]}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Card>
          <CardContent className="p-4">
            <ProjectDetailsForm />
          </CardContent>
        </Card>
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default Projects;
