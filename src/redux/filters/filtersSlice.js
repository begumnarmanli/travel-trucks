import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "Kyiv, Ukraine",
  equipment: {
    AC: false,
    transmission: false,
    kitchen: false,
    TV: false,
    bathroom: false,
  },
  vehicleType: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action) {
      return { ...state, ...action.payload };
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
