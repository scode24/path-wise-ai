import { create } from "zustand";

const useMessageStore = create((set) => ({
  message: "",
  type: "",
  isOpen: false,
  showMessage: (message, type, isOpen = true) =>
    set((state) => ({ message, type, isOpen })),
  closeMessage: (isOpen = false) => set((state) => ({ isOpen })),
}));

export default useMessageStore;
