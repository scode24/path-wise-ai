import { create } from "zustand";

const useThemeStore = create((set) => ({
  selectedTheme: "light-theme",
  toggleTheme: (value) => set((state) => ({ selectedTheme: value })),
}));

export default useThemeStore;
