import { Participant } from "@/server/definitions";
import { useEffect, useRef } from "react";
import ChatBottomBar from "./ChatBottomBar";
import { AnimatePresence, motion } from "framer-motion";
import { Message } from "ably";
import { cn } from "@/lib/utils";
import AvatarDisplay from "@/components/customs/avatar-display";

interface ChatListProps {
  messages?: Array<Message>;
  selectedUser: Participant;
  sendMessage: (message: string) => void;
  isMobile: boolean;
}

const ChatList = ({
  isMobile,
  selectedUser,
  messages,
  sendMessage,
}: ChatListProps) => {
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
                message.clientId !== selectedUser.id.toString()
                  ? "items-end"
                  : "items-start"
              )}
            >
              <div className="flex gap-3 items-center">
                {message.name === selectedUser.name && (
                  <AvatarDisplay
                    name={selectedUser.name}
                    profilePicture={selectedUser.profilePicture}
                    size="medium"
                    className=""
                  />
                )}
                <div className="flex flex-col">
                  {message.name === selectedUser.name && (
                    <span className="font-light text-xs">
                      {selectedUser.name}
                    </span>
                  )}
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

export default ChatList;
