import ContentLayout from "@/components/layouts/ContentLayout";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUsers } from "@/server/user";
import { getRooms } from "@/server/room";
import LazyBreadCrumb from "@/components/customs/lazy-breadcrumb";
import { cookies } from "next/headers";
import { Card, CardContent } from "@/components/ui/card";
import ChatLayout from "./_components/layout/ChatLayout";
import { Metadata } from "next";
import { getClient } from "@/server/client";

export const metadata: Metadata = {
  title: "CC | Private Messages",
};

const MessagesPage = async () => {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["all-users"],
    queryFn: getUsers,
  });

  await queryClient.prefetchQuery({
    queryKey: ["private-rooms"],
    queryFn: getRooms,
  });

  await queryClient.prefetchQuery({
    queryKey: ["client"],
    queryFn: getClient,
  });

  return (
    <ContentLayout title="Private Messages">
      <LazyBreadCrumb
        items={[
          { href: "#", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { href: "/messages", label: "Messages" },
          { label: "Private Messages" },
        ]}
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Card>
          <CardContent className="text-sm lg:flex flex-1 h-[560px] p-0">
            <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={4} />
          </CardContent>
        </Card>
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default MessagesPage;
