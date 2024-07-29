"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useClient } from "@/store/use-client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Redirect = () => {
  const { client } = useClient();
  const router = useRouter();

  useEffect(() => {
    if (client?.id) {
      router.push(`/projects/${client.id}`);
    }
  }, [client, router]);

  return (
    <Card>
      <CardContent className="p-6 space-y-2">
        <Skeleton className="h-56 w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Redirect;
