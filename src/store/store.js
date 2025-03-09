import { create } from "zustand";

const useCountStore = create((set) => ({
  tootalCount: 0,
  setTootalCount: (count) => set({ tootalCount: count }),
}));

 

export default useCountStore;
