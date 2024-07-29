import { Separator } from "@/components/ui/separator";
import React from "react";
import NewGroup from "./NewGroup";
import JoinSpace from "./JoinSpace";
import { useSpace } from "@/store/use-space";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AvatarDisplay from "@/components/customs/avatar-display";

interface GroupSidebarProps {
  isCollapsed: boolean;
  onClick?: () => void;
  isMobile: boolean;
}
const GroupSidebar = ({ isCollapsed, isMobile }: GroupSidebarProps) => {
  const { spaces, currentRoom, setCurrentRoom } = useSpace();

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full w-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed ? (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-semibold">Space</p>
            <span className="text-zinc-300">({spaces.length})</span>
          </div>
          <div className="flex items-center">
            <NewGroup />
            <JoinSpace />
          </div>
        </div>
      ) : (
        <div className="flex items-center flex-col">
          <NewGroup />
          <JoinSpace />
        </div>
      )}
      <Separator />
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {spaces.map((room, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setCurrentRoom(room)}
                    variant="outline"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      "h-10 w-10 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                      currentRoom?.id === room.id && "bg-muted"
                    )}
                  >
                    <AvatarDisplay
                      name={room.name}
                      profilePicture={room.spaceProfile}
                      size="medium"
                    />
                    <span className="sr-only">{room.name}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {room.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              variant="outline"
              key={room.id}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                currentRoom?.id === room.id && "bg-muted"
              )}
              onClick={() => {
                setCurrentRoom(room);
              }}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center gap-2">
                  <AvatarDisplay
                    name={room.name}
                    profilePicture={room.spaceProfile}
                    size="small"
                  />
                  <div className="font-semibold">{room.name}</div>
                </div>
              </div>
            </Button>
          )
        )}
      </nav>
    </div>
  );
};

export default GroupSidebar;
