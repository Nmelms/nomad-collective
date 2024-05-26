import { create } from "zustand";

const useLocationStore = create((set) => ({
  // initial state
  lat: 0,
  lng: 0,
  name: "",
  spotLocation: [],

  // actions,
  setCoords: (lat, lng) => set({ lat, lng }),
  setName: (name) => set({ name }),
  setSpotLocation: (spotLocation) => set({ spotLocation }),
}));

export default useLocationStore;
