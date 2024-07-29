import LazyBreadCrumb from "@/components/customs/lazy-breadcrumb";
import ContentLayout from "@/components/layouts/ContentLayout";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import GroupChatLayout from "./_components/layout/GroupChatLayout";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getMySpace } from "@/server/space";
import { getClient } from "@/server/client";

export const metadata: Metadata = {
  title: "CC | Space Messages",
};

const GroupMessages = async () => {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["space-rooms"],
    queryFn: getMySpace,
  });

  await queryClient.prefetchQuery({
    queryKey: ["client"],
    queryFn: getClient,
  });
  return (
    <ContentLayout title="Group Messsages">
      <LazyBreadCrumb
        items={[
          { href: "#", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { href: "/messages", label: "Messages" },
          { label: "Group Space" },
        ]}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Card>
          <CardContent className="text-sm lg:flex flex-1 h-[560px] p-0">
            <GroupChatLayout
              defaultLayout={defaultLayout}
              navCollapsedSize={4}
            />
          </CardContent>
        </Card>
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default GroupMessages;
