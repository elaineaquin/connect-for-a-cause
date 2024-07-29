import ContentLayout from "@/components/layouts/ContentLayout";
import Prototype from "./_components/Prototype";
import LazyBreadCrumb from "@/components/customs/lazy-breadcrumb";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserProjectStat, getUsers } from "@/server/user";

export const metadata: Metadata = {
  title: "CC | Dashboard",
};

const DashboardPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["project-stats"],
    queryFn: getUserProjectStat,
  });

  await queryClient.prefetchQuery({
    queryKey: ["all-users"],
    queryFn: getUsers,
  });

  return (
    <ContentLayout title="Dashboard">
      <LazyBreadCrumb
        items={[{ href: "#", label: "Home" }, { label: "Dashboard" }]}
        display={2}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Prototype />
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default DashboardPage;
