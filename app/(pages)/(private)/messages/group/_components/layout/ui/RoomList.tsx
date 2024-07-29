"use client";
import { DataTable } from "@/components/customs/table";
import { TypographyP } from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { columns } from "./GroupColumn";
import { SpaceRoom } from "@/server/definitions";
import { useClient } from "@/store/use-client";

interface RoomListProps {
  isLoading: boolean;
  space: Array<SpaceRoom>;
}

const RoomList = ({ isLoading, space }: RoomListProps) => {
  const { client } = useClient();
  if (client == null) return null;

  const redefined = space.filter(
    (s) =>
      s.ownerId !== client.id && !s.users.some((user) => user.id === client.id)
  );

  return isLoading ? (
    <div className="p-0">
      <Skeleton className="w-full h-[280px]" />
    </div>
  ) : (
    <div className="p-0">
      {space.length > 0 ? (
        <DataTable data={redefined} columns={columns} />
      ) : (
        <div className="p-4 text-center">
          <TypographyP>No Space yet</TypographyP>
        </div>
      )}
    </div>
  );
};

export default RoomList;
