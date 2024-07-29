import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SpaceRoom } from "@/server/definitions";

interface GroupChatTopbarProps {
  room: SpaceRoom;
}

const GroupChatTopbar = ({ room }: GroupChatTopbarProps) => {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center space-x-4">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={room.spaceProfile}
            alt={room.name}
            width={6}
            height={6}
            className="w-10 h-10 "
          />
          <AvatarFallback className="items-center flex">
            {room.name
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{room.name}</p>
        </div>
      </div>
    </div>
  );
};

export default GroupChatTopbar;
