import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller, useWatch } from "react-hook-form";
import styles from "./Filters.module.css";
import iconMapPin from "../../assets/icons/icon-map-pin.svg";
import { setFilters } from "../../redux/filters/filtersSlice";
import { EQUIPMENT } from "../../utils/constants";

import iconAC from "../../assets/icons/icon-ac.svg";
import iconTransmission from "../../assets/icons/icon-transmission.svg";
import iconKitchen from "../../assets/icons/icon-kitchen.svg";
import iconTV from "../../assets/icons/icon-tv.svg";
import iconBathroom from "../../assets/icons/icon-bathroom.svg";
import iconVan from "../../assets/icons/icon-radio.svg";
import iconFully from "../../assets/icons/icon-bi_grid.svg";
import iconAlcove from "../../assets/icons/icon-bi_grid-3x3-gap.svg";

const Filters = ({ onFilterSubmit }) => {
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);
  const { handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      location: "Kyiv, Ukraine",
      equipment: {
        AC: false,
        transmission: false,
        kitchen: false,
        TV: false,
        bathroom: false,
      },
      vehicleType: "",
    },
  });

  const equipment = useWatch({ control, name: "equipment" });
  const vehicleType = useWatch({ control, name: "vehicleType" });

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleEquipmentToggle = (key) => {
    const currentEquipment = getValues("equipment");
    const newEquipment = {
      ...currentEquipment,
      [key]: !currentEquipment[key],
    };

    setValue("equipment", newEquipment, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleVehicleTypeSelect = (type) => {
    setValue("vehicleType", vehicleType === type ? "" : type);
  };

  const onSubmit = (data) => {
    dispatch(setFilters(data));
    if (onFilterSubmit) onFilterSubmit(data);
    if (isDrawerOpen) closeDrawer();
  };

  const filterContent = (
    <>
      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle}>Vehicle equipment</h3>
        <hr className={styles.divider} />
        <div className={styles.grid}>
          {/* AC */}
          <div
            className={`${styles.card} ${
              equipment?.AC ? styles.cardSelected : ""
            }`}
            onClick={() => handleEquipmentToggle(EQUIPMENT.AC)}
          >
            <img src={iconAC} alt="AC" className={styles.icon} />
            <span>AC</span>
          </div>

          <div
            className={`${styles.card} ${
              equipment?.transmission ? styles.cardSelected : ""
            }`}
            onClick={() => handleEquipmentToggle("transmission")}
          >
            <img
              src={iconTransmission}
              alt="Transmission"
              className={styles.icon}
            />
            <span>Automatic</span>
          </div>

          <div
            className={`${styles.card} ${
              equipment?.kitchen ? styles.cardSelected : ""
            }`}
            onClick={() => handleEquipmentToggle(EQUIPMENT.KITCHEN)}
          >
            <img src={iconKitchen} alt="Kitchen" className={styles.icon} />
            <span>Kitchen</span>
          </div>

          <div
            className={`${styles.card} ${
              equipment?.TV ? styles.cardSelected : ""
            }`}
            onClick={() => handleEquipmentToggle(EQUIPMENT.TV)}
          >
            <img src={iconTV} alt="TV" className={styles.icon} />
            <span>TV</span>
          </div>

          <div
            className={`${styles.card} ${
              equipment?.bathroom ? styles.cardSelected : ""
            }`}
            onClick={() => handleEquipmentToggle(EQUIPMENT.BATHROOM)}
          >
            <img src={iconBathroom} alt="Bathroom" className={styles.icon} />
            <span>Bathroom</span>
          </div>
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle}>Vehicle type</h3>
        <hr className={styles.divider} />
        <div className={styles.grid}>
          <div
            className={`${styles.card} ${
              vehicleType === "Van" ? styles.cardSelected : ""
            }`}
            onClick={() => handleVehicleTypeSelect("Van")}
          >
            <img src={iconVan} alt="Van" className={styles.icon} />
            <span>Van</span>
          </div>
          <div
            className={`${styles.card} ${
              vehicleType === "Fully Integrated" ? styles.cardSelected : ""
            }`}
            onClick={() => handleVehicleTypeSelect("Fully Integrated")}
          >
            <img
              src={iconFully}
              alt="Fully Integrated"
              className={styles.icon}
            />
            <span>Fully Integrated</span>
          </div>
          <div
            className={`${styles.card} ${
              vehicleType === "Alcove" ? styles.cardSelected : ""
            }`}
            onClick={() => handleVehicleTypeSelect("Alcove")}
          >
            <img src={iconAlcove} alt="Alcove" className={styles.icon} />
            <span>Alcove</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.locationSection}>
          <label className={styles.label}>Location</label>
          <div className={styles.inputWrapper}>
            <img src={iconMapPin} alt="Location" className={styles.inputIcon} />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className={styles.locationInput}
                  placeholder="City"
                />
              )}
            />
          </div>
        </div>

        {/* Mobilde Filters Butonu */}
        <button
          type="button"
          className={styles.filtersButton}
          onClick={toggleDrawer}
        >
          Filters
        </button>

        {/* Desktop'ta normal görünüm */}
        <div className={styles.desktopFilters}>
          <p className={styles.filtersLabel}>Filters</p>
          {filterContent}
          <button className="btnBase btnPrimary" type="submit">
            Search
          </button>
        </div>
      </form>

      {/* Mobil Side Drawer */}
      {isDrawerOpen && (
        <>
          <div className={styles.drawerOverlay} onClick={closeDrawer} />
          <div className={styles.drawer}>
            <div className={styles.drawerHeader}>
              <h2 className={styles.drawerTitle}>Filters</h2>
              <button
                type="button"
                className={styles.drawerClose}
                onClick={closeDrawer}
              >
                ×
              </button>
            </div>
            <div className={styles.drawerContent}>
              {filterContent}
              <button
                className="btnBase btnPrimary"
                type="button"
                onClick={handleSubmit(onSubmit)}
              >
                Search
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Filters;
