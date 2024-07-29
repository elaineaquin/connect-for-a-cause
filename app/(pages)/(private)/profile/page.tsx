import ContentLayout from "@/components/layouts/ContentLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import ProfileLayout from "./_components/ProfileLayout";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProfile } from "@/server/profile";
import LazyBreadCrumb from "@/components/customs/lazy-breadcrumb";

const Profile = async () => {
  const profileClient = new QueryClient();
  await profileClient.prefetchQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  return (
    <ContentLayout title="Profile">
      <LazyBreadCrumb
        items={[
          { href: "#", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { label: "Profile" },
        ]}
      />
      <HydrationBoundary state={dehydrate(profileClient)}>
        <ProfileLayout />
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default Profile;
