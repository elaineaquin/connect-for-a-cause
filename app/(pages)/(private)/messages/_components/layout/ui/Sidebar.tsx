import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRoom } from "@/store/use-room";
import NewMessage from "./NewMessage";
import { Separator } from "@/components/ui/separator";
import AvatarDisplay from "@/components/customs/avatar-display";

interface SidebarProps {
  isCollapsed: boolean;
  onClick?: () => void;
  isMobile: boolean;
}

const Sidebar = ({ isCollapsed, isMobile }: SidebarProps) => {
  const { setCurrentRoom, rooms, currentRoom, createRoom } = useRoom();

  const handleCreateRoom = (email: string) => {
    createRoom({ email });
  };

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full w-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed ? (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-semibold">Chats</p>
            <span className="text-zinc-300">({rooms.length})</span>
          </div>
          <div>
            <NewMessage onCreateRoom={handleCreateRoom} />
          </div>
        </div>
      ) : (
        <div>
          <NewMessage onCreateRoom={handleCreateRoom} />
        </div>
      )}
      <Separator />
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {rooms.map((room, index) =>
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
                      name={room.participants
                        .find((user) => user.id === room.other)!
                        .name.split(" ")
                        .map((word) => word[0])
                        .join("")}
                      size="medium"
                      profilePicture={
                        room.participants.find(
                          (user) => user.id === room.other
                        )!.profilePicture
                      }
                    />
                    <span className="sr-only">
                      {
                        room.participants.find(
                          (user) => user.id === room.other
                        )!.name
                      }
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {
                    room.participants.find((user) => user.id === room.other)!
                      .name
                  }
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
                  <Avatar className="h-5 w-5">
                    <AvatarImage
                      src={
                        room.participants.find(
                          (user) => user.id === room.other
                        )!.profilePicture
                      }
                    />
                    <AvatarFallback className="items-center flex">
                      {room.participants
                        .find((user) => user.id === room.other)!
                        .name.split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="font-semibold">
                    {
                      room.participants.find((user) => user.id === room.other)!
                        .name
                    }
                  </div>
                </div>
              </div>
            </Button>
          )
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
