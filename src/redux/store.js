import { configureStore } from "@reduxjs/toolkit";
import { campersReducer } from "./campers/campersSlice";
import { favoritesReducer } from "./favorites/favoritesSlice";
import { filtersReducer } from "./filters/filtersSlice";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});
