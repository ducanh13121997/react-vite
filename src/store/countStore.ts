import { create } from "zustand";

interface CountState {
  count: number;
  increase: () => void;
  decrease: () => void;
}

const useStore = create<CountState>((set) => ({
  count: 0,
  increase: () =>
    set((state: { count: number }) => ({ count: state.count + 1 })),
  decrease: () =>
    set((state: { count: number }) => ({ count: state.count - 1 })),
}));

export default useStore;
