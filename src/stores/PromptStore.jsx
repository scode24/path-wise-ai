import { create } from "zustand";

const usePromptStore = create((set) => ({
  promptQuery: "",
  setPromptQuery: (query) =>
    set((state) => {
      localStorage.setItem("promptQuery", query);
      return { prompt: query };
    }),
}));

export default usePromptStore;
