import { create } from "zustand";

const useLocationStore = create((set) => ({
  // initial state
  lat: 0,
  lng: 0,
  name: "",

  // actions,
  setCoords: (lat, lng) => set({ lat, lng }),
  setName: (name) => set({ name }),
}));

export default useLocationStore;
