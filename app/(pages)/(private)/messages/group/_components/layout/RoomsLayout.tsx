"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";
import RoomList from "./ui/RoomList";
import { getAllSpace } from "@/server/space";

const RoomsLayout = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-spaces"],
    queryFn: getAllSpace,
  });

  return (
    <div className="space-y-2">
      <Card>
        <CardContent className="p-4 space-y-6">
          <Button variant={"outline"}>
            <Link href={"/messages/group/create"} className="gap-2 flex">
              <SquarePen size={20} />
              Create Space
            </Link>
          </Button>
          <RoomList isLoading={isLoading} space={data?.data ?? []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomsLayout;
