import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useConfigOptionsStore = create(
  persist(
    (set) => ({
      displayName: "",
      roomName: "",
      setDisplayName: (displayName) => set({ displayName }),
      setRoomName: (roomName) => set({ roomName }),
      clearDisplayName: () => set({ displayName: null }),
      clearRoomName: () => set({ roomName: null }),
    }),
    {
      name: "config-options-storage",
    }
  )
);

export const useMembersStore = create(
  persist(
    (set) => ({
      members: [],
      setMembers: (members) => set({ members }),
      clearMembers: () => set({ members: [] }),
    }),
    {
      name: "members-storage",
    }
  )
);
