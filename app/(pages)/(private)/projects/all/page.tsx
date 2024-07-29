import LazyBreadCrumb from "@/components/customs/lazy-breadcrumb";
import ContentLayout from "@/components/layouts/ContentLayout";
import { getAllProjects } from "@/server/project";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AllProjectsLayout from "../_components/layout/AllProjectsLayout";

const AllProjectsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["all-projects"],
    queryFn: () => getAllProjects({}),
  });
  return (
    <ContentLayout title="Projects">
      <LazyBreadCrumb
        items={[
          { href: "#", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { href: "/projects", label: "Projects" },
          { label: "All Projects" },
        ]}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllProjectsLayout />
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default AllProjectsPage;
