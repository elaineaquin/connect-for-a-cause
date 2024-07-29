import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SendHorizontal, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { EmojiPicker } from "./EmojiPicker";

interface ChatBottombarProps {
  sendMessage: (newMessage: string) => void;
  isMobile: boolean;
}

const ChatBottomBar = ({ isMobile, sendMessage }: ChatBottombarProps) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = () => {
    sendMessage("👍");
    setMessage("");
  };

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      const newHeight = Math.min(inputRef.current.scrollHeight, 100);
      inputRef.current.style.height = `${newHeight}px`;
    }
  }, [message]);

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2 relative border ">
      <div className="w-full relative rounded-xl dark:bg-slate-800 bg-slate-50">
        <Textarea
          autoComplete="off"
          value={message}
          ref={inputRef}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          name="message"
          placeholder="Reply..."
          className="w-[96%] resize-none items-center overflow-y-auto mr-5"
          style={{
            maxHeight: "100px",
            border: "none", // Remove border
            outline: "none", // Remove outline
            boxShadow: "none", // Remove box-shadow if any
          }}
        ></Textarea>
        <div className="absolute bottom-2 right-2">
          <EmojiPicker
            onChange={(value) => {
              setMessage(message + value);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          />
        </div>
      </div>
      {message.trim() ? (
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-14 w-14",
            "dark:bg-muted dark:text-muted-foreground bg-slate-50 dark:hover:bg-muted dark:hover:text-white shrink-0"
          )}
          onClick={handleSend}
        >
          <SendHorizontal size={20} className="text-muted-foreground" />
        </Link>
      ) : (
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-14 w-14",
            "dark:bg-muted dark:text-muted-foreground bg-slate-50 dark:hover:bg-muted dark:hover:text-white shrink-0"
          )}
          onClick={handleThumbsUp}
        >
          <ThumbsUp size={20} className="text-muted-foreground" />
        </Link>
      )}
    </div>
  );
};

export default ChatBottomBar;
