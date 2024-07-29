"use client";

import { fixTinaResults } from "@/lib/utils";
import { getClient } from "@/server/client";
import { ClientProfile } from "@/server/definitions";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useClient() {
  const [client, setClient] = useState<ClientProfile | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["client"],
    queryFn: getClient,
  });

  useEffect(() => {
    if (!isLoading && data?.data) setClient(fixTinaResults(data.data));
  }, [isLoading]);
  return { client, isLoading };
}
