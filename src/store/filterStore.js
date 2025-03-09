
import { create } from "zustand";
export const useFilterOrderStore = create((set) => ({
    filterOrder: [],
    setFilterOrder: (order) => set({ filterOrder: order }),
  }));
  
export const useFilterCountStore = create((set) => ({
    filterCount: 0,
    setFilterCount: (count) => set({ filterCount: count }),
  }));