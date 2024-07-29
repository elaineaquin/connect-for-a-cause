import { TypographyP } from "@/components/typography";
import { SpaceRoom } from "@/server/definitions";
import { sendGroupMessage } from "@/server/message";
import { useClient } from "@/store/use-client";
import { useMutation } from "@tanstack/react-query";
import { Message } from "ably";
import { useEffect, useState } from "react";
import GroupChatTopbar from "./GroupChatTopbar";
import GroupChatList from "./GroupChatList";
import { useChannel } from "ably/react";

interface GroupChatProps {
  isMobile: boolean;
  currentRoom: SpaceRoom;
}
const GroupChat = ({ isMobile, currentRoom }: GroupChatProps) => {
  const { client } = useClient();
  const { mutate } = useMutation({ mutationFn: sendGroupMessage });

  const [receivedMessages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    if (currentRoom.messages) {
      setMessages(
        currentRoom.messages.map((message) => ({
          clientId: message.clientId,
          connectionId: message.connectionId,
          data: message.text,
          id: message.id,
          name: message.name,
        }))
      );
    }
  }, [currentRoom, setMessages]);

  const { channel, ably } = useChannel(currentRoom.id, (message: Message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  const sendMessage = (message: string) => {
    if (message.trim()) {
      channel.publish({
        name: client!.name,
        data: message,
      });
      mutate({
        connectionId: ably.connection.id!,
        name: client!.name,
        spaceId: currentRoom.id,
        text: message,
      });
    }
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <GroupChatTopbar room={currentRoom} />
      <GroupChatList
        isMobile={isMobile}
        room={currentRoom}
        sendMessage={sendMessage}
        messages={receivedMessages}
      />
    </div>
  );
};

export default GroupChat;
