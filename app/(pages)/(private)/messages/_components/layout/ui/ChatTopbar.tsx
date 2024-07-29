import AvatarDisplay from "@/components/customs/avatar-display";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Participant } from "@/server/definitions";

interface ChatTopbarProps {
  selectedUser: Participant;
}

const ChatTopbar = ({ selectedUser }: ChatTopbarProps) => {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center space-x-4">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={selectedUser.profilePicture}
            alt={selectedUser.name}
            width={6}
            height={6}
            className="w-10 h-10 "
          />
          <AvatarFallback className="items-center flex">
            {selectedUser.name
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">
            {selectedUser.name}
          </p>
          <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatTopbar;
