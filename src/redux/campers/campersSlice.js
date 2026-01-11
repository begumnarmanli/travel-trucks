import { createSlice } from "@reduxjs/toolkit";
import { fetchCamperById, fetchAllCampers } from "./campersOperations";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    selectedItem: null,
    isLoading: false,
    error: null,
    filters: {
      location: "",
      form: "",
      equipment: [],
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = { location: "", form: "", equipment: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamperById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.selectedItem = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, resetFilters } = campersSlice.actions;

export const campersReducer = campersSlice.reducer;
