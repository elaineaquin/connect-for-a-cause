"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getUsers } from "@/server/user";
import { useClient } from "@/store/use-client";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function RecentCollaborators() {
  const { client } = useClient();
  const { data, isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: getUsers,
  });

  if (!data?.data) {
    return null;
  }
  const collaborators =
    data.data.filter((user) => user.id !== client?.id) ?? [];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Latest Collaborators</CardTitle>
        <CardDescription>
          + {collaborators.length} Collaborators this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-8">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex items-center">
                <Skeleton className="h-9 w-9 rounded-full" />{" "}
                <div className="ml-4 space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>
            ))}
          </div>
        ) : collaborators.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground">
            No collaborators
          </div>
        ) : (
          <div className="space-y-8">
            {collaborators.map((user) => (
              <div key={user.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={user.profilePicture || "/default-avatar.png"}
                    alt="Avatar"
                  />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
