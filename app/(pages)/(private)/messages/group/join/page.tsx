import LazyBreadCrumb from "@/components/customs/lazy-breadcrumb";
import ContentLayout from "@/components/layouts/ContentLayout";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import RoomsLayout from "../_components/layout/RoomsLayout";
import { getAllSpace } from "@/server/space";

const JoinGroupPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["all-spaces"],
    queryFn: getAllSpace,
  });

  return (
    <ContentLayout title="Join Group">
      <LazyBreadCrumb
        items={[
          { href: "#", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { href: "/messages", label: "Messages" },
          { href: "/group", label: "Group Space" },
          { label: "Join Space" },
        ]}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RoomsLayout />
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default JoinGroupPage;
