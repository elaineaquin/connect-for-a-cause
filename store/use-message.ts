"use client";

import { sendPrivateMessage } from "@/server/message";
import { PrivateMessage } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Message } from "ably";
import { useState } from "react";

export function useMessage(defaultMessage: Array<PrivateMessage>) {
  const [receivedMessages, setMessages] = useState<Array<Message>>(
    defaultMessage.map((message) => ({
      clientId: message.clientId,
      connectionId: message.connectionId,
      data: message.text,
      id: message.id,
      name: message.name,
    }))
  );

  const { mutate } = useMutation({
    mutationKey: ["send-private-message"],
    mutationFn: sendPrivateMessage,
  });

  return { sendNewPrivateMessage: mutate, receivedMessages, setMessages };
}
