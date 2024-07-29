import LazyBreadCrumb from "@/components/customs/lazy-breadcrumb";
import ContentLayout from "@/components/layouts/ContentLayout";
import { Card, CardContent } from "@/components/ui/card";
import CreateSpaceForm from "./CreateSpaceForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUsers } from "@/server/user";

const CreateSpacePage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["all-users"],
    queryFn: getUsers,
  });
  return (
    <ContentLayout title="Create a Space">
      <LazyBreadCrumb
        items={[
          { href: "#", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { href: "/messages", label: "Messages" },
          { href: "/group", label: "Group Space" },
          { label: "Create Space" },
        ]}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Card>
          <CardContent className="p-4">
            <CreateSpaceForm />
          </CardContent>
        </Card>
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default CreateSpacePage;
