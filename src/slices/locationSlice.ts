// src/slices/locationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocationData {
  address: string;
  coords: [number, number];
}

interface LocationState {
  fromLocation: LocationData | null;
  toLocation: LocationData | null;
}

const initialState: LocationState = {
  fromLocation: null,
  toLocation: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setFromLocation(state, action: PayloadAction<LocationData>) {
      console.log("setFromLocation action fired with:", action.payload);
      state.fromLocation = action.payload;
    },
    setToLocation(state, action: PayloadAction<LocationData>) {
      console.log("setToLocation action fired with:", action.payload);
      state.toLocation = action.payload;
    },
  },
});

export const { setFromLocation, setToLocation } = locationSlice.actions;
export default locationSlice.reducer;
