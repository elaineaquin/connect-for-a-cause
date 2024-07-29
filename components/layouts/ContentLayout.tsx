import { getClient } from "@/server/client";
import Navbar from "./ui/navbar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default async function ContentLayout({
  children,
  title,
}: ContentLayoutProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["client"],
    queryFn: getClient,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Navbar title={title} />
      </HydrationBoundary>
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}
