import { createSelector } from "@reduxjs/toolkit";

export const getSelectedCamper = (state) => state.campers.selectedItem;
export const getFilteredCampers = createSelector(
  [(state) => state.campers.items, (state) => state.campers.filters],
  (campers, filters) => {
    return campers.filter((camper) => {
      const matchesLocation = filters.location
        ? camper.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;

      const matchesType = filters.type ? camper.form === filters.type : true;

      const matchesEquipment =
        filters.equipment.length > 0
          ? filters.equipment.every((item) => {
              return camper[item] === true;
            })
          : true;

      return matchesLocation && matchesType && matchesEquipment;
    });
  }
);
