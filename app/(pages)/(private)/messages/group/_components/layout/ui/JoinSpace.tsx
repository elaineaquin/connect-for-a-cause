"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const JoinSpace = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <Button variant={"ghost"}>
            <Link href={"/messages/group/join"}>
              <CirclePlus size={20} />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Join a Space</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default JoinSpace;
