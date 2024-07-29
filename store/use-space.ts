"use client";

import { fixTinaResults } from "@/lib/utils";
import { SpaceRoom } from "@/server/definitions";
import { getMySpace } from "@/server/space";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { create } from "zustand";

interface SpaceState {
  currentRoom: SpaceRoom | null;
  setCurrentRoom: (room: SpaceRoom) => void;
}

const useSpaceStore = create<SpaceState>((set) => ({
  currentRoom: null,
  setCurrentRoom: (room: SpaceRoom) => set({ currentRoom: room }),
}));

export function useSpace() {
  const [spaces, setSpaces] = useState<Array<SpaceRoom>>([]);
  const { currentRoom, setCurrentRoom } = useSpaceStore();

  const { data, isLoading } = useQuery({
    queryKey: ["space-rooms"],
    queryFn: getMySpace,
  });

  useEffect(() => {
    if (!isLoading && data?.data) {
      const fetchedSpaces = fixTinaResults(data.data);
      setSpaces(fetchedSpaces);
      if (!currentRoom) setCurrentRoom(fetchedSpaces[0]);
    }
  }, [isLoading, data, currentRoom, setCurrentRoom, setSpaces]);

  return { spaces, currentRoom, setCurrentRoom };
}
