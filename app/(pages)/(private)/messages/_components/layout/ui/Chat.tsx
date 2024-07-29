import { PrivateRoom } from "@/server/definitions";
import { useMessage } from "@/store/use-message";
import ChatTopbar from "./ChatTopbar";
import ChatList from "./ChatList";
import { useChannel } from "ably/react";
import { Message } from "ably";
import { useClient } from "@/store/use-client";
import { useEffect } from "react";

interface ChatProps {
  isMobile: boolean;
  currentRoom: PrivateRoom;
}

const Chat = ({ isMobile, currentRoom }: ChatProps) => {
  const { client } = useClient();
  const { receivedMessages, sendNewPrivateMessage, setMessages } = useMessage(
    currentRoom?.messages ?? []
  );

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
      sendNewPrivateMessage({
        connectionId: ably.connection.id!,
        name: client!.name,
        recipientId: currentRoom.other,
        roomId: currentRoom.id,
        text: message,
      });
    }
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      {currentRoom.participants && (
        <ChatTopbar
          selectedUser={
            currentRoom.participants.find(
              (participant) => participant.id === currentRoom.other
            )!
          }
        />
      )}
      {currentRoom.participants && (
        <ChatList
          isMobile={isMobile}
          selectedUser={
            currentRoom.participants.find(
              (participant) => participant.id === currentRoom.other
            )!
          }
          sendMessage={sendMessage}
          messages={receivedMessages}
        />
      )}
    </div>
  );
};

export default Chat;
