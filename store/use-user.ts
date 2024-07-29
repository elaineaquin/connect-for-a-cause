"use client";

import { fixTinaResults } from "@/lib/utils";
import { UserProfile } from "@/server/definitions";
import { getUsers } from "@/server/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useUser() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: getUsers,
  });

  useEffect(() => {
    if (!isLoading && data?.data) setUsers(fixTinaResults(data.data));
  }, [isLoading]);

  return { users };
}
