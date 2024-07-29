"use client";
import { SpaceRoom } from "@/server/definitions";
import { Message } from "ably";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useClient } from "@/store/use-client";
import AvatarDisplay from "@/components/customs/avatar-display";
import ChatBottomBar from "../../../../_components/layout/ui/ChatBottomBar";

interface GroupChatListProps {
  messages?: Array<Message>;
  room: SpaceRoom;
  sendMessage: (message: string) => void;
  isMobile: boolean;
}

const GroupChatList = ({
  isMobile,
  room,
  sendMessage,
  messages,
}: GroupChatListProps) => {
  const { client } = useClient();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.clientId === client?.id.toString()
                  ? "items-end"
                  : "items-start"
              )}
            >
              <div className="flex gap-3 items-center">
                {message.name !== client!.name && (
                  <AvatarDisplay
                    name={message.name!}
                    profilePicture={
                      room.users.find(
                        (user) => message.clientId === user.id.toString()
                      )?.profilePicture
                    }
                    size="medium"
                    className=""
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-light text-xs">{message.name}</span>
                  <span className=" bg-accent p-3 rounded-md max-w-xs">
                    {message.data}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottomBar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
};

export default GroupChatList;
