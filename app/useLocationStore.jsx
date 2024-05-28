import { create } from "zustand";

const useLocationStore = create((set) => ({
  // initial state
  lat: 0,
  lng: 0,
  name: "",
  spotLocation: [],
  currentMarker: null,

  // actions,
  setCoords: (lat, lng) => set({ lat, lng }),
  setLat: (lat) => set({ lat }),
  setLng: (lng) => set({ lng }),
  setName: (name) => set({ name }),
  setSpotLocation: (spotLocation) => set({ spotLocation }),
  setCurrentMarker: (currentMarker) => set({ currentMarker }),
}));

export default useLocationStore;
