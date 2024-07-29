import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface State {
  isOpen: boolean;
}

interface Action {
  toggle: () => void;
}

export default create(
  persist<State & Action>(
    (set, get) => ({
      isOpen: true,
      toggle: () => {
        set({ isOpen: !get().isOpen });
      },
    }),
    { name: "sidebar", storage: createJSONStorage(() => localStorage) }
  )
);
