import { create } from "zustand";

const useLoaderErrorStore = create((set) => ({
  isLoading: false,
  errorMessage: "",
  setLoading: (loading) => set({ isLoading: loading }),
  setErrorMessage: (message) => set({ errorMessage: message }),
}));

export default useLoaderErrorStore;
