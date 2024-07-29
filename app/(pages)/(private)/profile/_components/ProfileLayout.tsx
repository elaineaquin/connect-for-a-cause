"use client";
import ViewProfile from "./ViewProfile";
import ViewIntro from "./ViewIntro";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/server/profile";
import { useClient } from "@/store/use-client";

const ProfileLayout = () => {
  const { client } = useClient();
  const { data: userProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  return (
    <Card>
      <CardTitle>
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">Edit Profile</h1>
        </div>
      </CardTitle>
      <CardContent>
        <Separator />
        <ViewProfile
          profilePicture={userProfile?.profilePicture}
          name={client?.name ?? ""}
        />
        <Separator className="my-4" />
        <ViewIntro {...userProfile!} />
        <Separator className="my-4" />
        <div>
          <div className="relative flex items-center px-4 py-2">
            <h2>Verification</h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileLayout;
