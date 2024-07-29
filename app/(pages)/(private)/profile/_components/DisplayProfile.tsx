import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React from "react";

interface DisplayProfileProps {
  image?: string;
  isPending: boolean;
  name: string;
}

const DisplayProfile = ({ image, isPending, name }: DisplayProfileProps) => {
  return (
    <div className="flex justify-center">
      {isPending ? (
        <Skeleton className="h-[180px] w-[180px] rounded-full" />
      ) : (
        <Avatar className="flex justify-center items-center w-28 h-28">
          <AvatarImage src={image} alt={name} width={6} height={6} />
          <AvatarFallback className="items-center flex">
            {name
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default DisplayProfile;
