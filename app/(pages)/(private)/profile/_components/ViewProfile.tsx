"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { encodeBase64, toBase64 } from "@/lib/image";
import { updateProfilePicture } from "@/server/profile";
import { verifySession } from "@/server/session";
import { useMutation } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DisplayProfile from "./DisplayProfile";
import { ImageUploader } from "@/components/customs/image-uploader";

interface ViewProfileProps {
  profilePicture?: string;
  name: string;
}

const ViewProfile = ({ profilePicture, name }: ViewProfileProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [profile, setProfile] = useState<string | undefined>(profilePicture);

  const { mutate: update, isPending } = useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: (data) => {
      setProfile(data.data);
      setIsDialogOpen(false);
    },
    onError: (err) => {
      toast.error(`Something went wrong ${err}`);
    },
  });

  const onHandleChangeProfile = async (file: File) => {
    try {
      const { userId } = await verifySession();
      const encodedImg = encodeBase64(await toBase64(file));
      update({ userId, buffer: encodedImg });
      setIsDialogOpen(false);
    } catch (error) {
      console.error(`Something went wrong ${error}`);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="relative flex items-center px-4 py-2">
        <div className="absolute bottom-0 right-0 z-20">
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    className="rounded-md h-8"
                    variant="outline"
                    size="default"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Edit color="green" className="h-4 w-4 lg:me-2" />
                    <span className="hidden lg:block">EDIT</span>
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Edit Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Browse your folder and upload a picture
              </DialogDescription>
            </DialogHeader>
            <ImageUploader hanlder={onHandleChangeProfile} />
          </DialogContent>
        </div>
        <h2>Profile</h2>
      </div>
      <DisplayProfile name={name} image={profile} isPending={isPending} />
    </Dialog>
  );
};
export default ViewProfile;
