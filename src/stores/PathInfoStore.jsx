import { create } from "zustand";

const usePathInfoStore = create((set) => ({
  pathInfo:
    localStorage.getItem("pathInfo") === null
      ? []
      : JSON.parse(localStorage.getItem("pathInfo")),
  fetchDataStatus: "done",
  updatePathInfo: (data, fetchStatus) =>
    set((state) => {
      localStorage.setItem("pathInfo", JSON.stringify(data));
      return { pathInfo: data, fetchDataStatus: fetchStatus };
    }),
}));

export default usePathInfoStore;
