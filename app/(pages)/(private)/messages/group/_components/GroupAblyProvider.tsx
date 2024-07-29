"use client";

import * as Ably from "ably";
import { AblyProvider as NextAblyProvider, ChannelProvider } from "ably/react";
import GroupChat from "./layout/ui/GroupChat";
import { useSpace } from "@/store/use-space";

interface GroupAblyProviderProps {
  isMobile: boolean;
}

export default function GroupAblyProviderProps({
  isMobile,
}: GroupAblyProviderProps) {
  const { currentRoom } = useSpace();
  const client = new Ably.Realtime({ authUrl: "/api/ably" });

  if (!currentRoom) return null;

  return (
    <NextAblyProvider client={client}>
      <ChannelProvider channelName={currentRoom.id}>
        <GroupChat isMobile={isMobile} currentRoom={currentRoom} />
      </ChannelProvider>
    </NextAblyProvider>
  );
}
