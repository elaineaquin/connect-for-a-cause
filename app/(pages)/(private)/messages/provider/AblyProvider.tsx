"use client";

import { useRoom } from "@/store/use-room";
import * as Ably from "ably";
import { AblyProvider as NextAblyProvider, ChannelProvider } from "ably/react";
import Chat from "../_components/layout/ui/Chat";

interface AblyProviderProps {
  isMobile: boolean;
}

export default function AblyProvider({ isMobile }: AblyProviderProps) {
  const { currentRoom } = useRoom();
  const client = new Ably.Realtime({ authUrl: "/api/ably" });

  if (!currentRoom) return null;

  return (
    <NextAblyProvider client={client}>
      <ChannelProvider channelName={currentRoom.id}>
        <Chat isMobile={isMobile} currentRoom={currentRoom} />
      </ChannelProvider>
    </NextAblyProvider>
  );
}
