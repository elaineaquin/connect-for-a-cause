"use client";

import { create } from "zustand";
import { fixTinaResults } from "@/lib/utils";
import { PrivateRoom } from "@/server/definitions";
import { createPrivateRoom, getRooms } from "@/server/room";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface RoomState {
  currentRoom: PrivateRoom | null;
  setCurrentRoom: (room: PrivateRoom) => void;
}

const useRoomStore = create<RoomState>((set) => ({
  currentRoom: null,
  setCurrentRoom: (room: PrivateRoom) => set({ currentRoom: room }),
}));

export function useRoom() {
  const queryClient = useQueryClient();
  const [rooms, setRooms] = useState<Array<PrivateRoom>>([]);
  const { currentRoom, setCurrentRoom } = useRoomStore();

  const { mutate: createRoom } = useMutation({
    mutationKey: ["create-room"],
    mutationFn: createPrivateRoom,
    onSuccess: (data) => {
      if (data.data) {
        const newRoom = fixTinaResults(data.data);
        setCurrentRoom(newRoom);
        setRooms([...rooms, newRoom]);
        return queryClient.invalidateQueries({ queryKey: ["private-rooms"] });
      }
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error}`);
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["private-rooms"],
    queryFn: getRooms,
    enabled: true,
    refetchInterval: 30000,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!isLoading && data?.data) {
      const fetchedRooms = fixTinaResults(data.data);
      setRooms(fetchedRooms);
      if (!currentRoom) {
        setCurrentRoom(fetchedRooms[0]);
      }
    }
  }, [isLoading, data, currentRoom, setRooms, setCurrentRoom]);

  return {
    createRoom,
    currentRoom,
    rooms,
    setCurrentRoom,
  };
}
