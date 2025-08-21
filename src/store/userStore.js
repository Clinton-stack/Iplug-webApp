import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      role: "requester", // default
      setRole: (role) => set({ role }),
      toggleRole: () => {
        const current = get().role;
        set({ role: current === "requester" ? "provider" : "requester" });
      },
    }),
    {
      name: "user-role", // localStorage key
    }
  )
);
