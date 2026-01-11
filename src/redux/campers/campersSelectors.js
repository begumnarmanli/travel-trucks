import { createSelector } from "@reduxjs/toolkit";

export const selectItems = (state) => state.campers?.items || [];
export const selectIsLoading = (state) => state.campers?.isLoading;
export const getSelectedCamper = (state) => state.campers?.selectedItem;
export const selectFilters = (state) => state.filters || {};

export const getFilteredCampers = createSelector(
  [selectItems, selectFilters],
  (campers, filters) => {
    if (!campers || campers.length === 0) return [];

    return campers.filter((camper) => {
      const filterLoc = filters.location?.toLowerCase().trim() || "";
      const matchesLocation =
        !filterLoc || camper.location?.toLowerCase().includes(filterLoc);

      const typeMapping = {
        Van: "panelTruck",
        "Fully Integrated": "fullyIntegrated",
        Alcove: "alcove",
      };

      const selectedType = filters.vehicleType;
      const apiTypeNeeded = typeMapping[selectedType] || selectedType;

      const matchesType = !selectedType || camper.form === apiTypeNeeded;

      const matchesEquipment = Object.entries(filters.equipment || {}).every(
        ([key, value]) => {
          if (value === true) {
            if (key === "transmission")
              return camper.transmission === "automatic";

            return (
              camper[key] === true ||
              (camper.details && camper.details[key] === true)
            );
          }
          return true;
        }
      );

      return matchesLocation && matchesType && matchesEquipment;
    });
  }
);
