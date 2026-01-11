import React from "react";
import styles from "./Features.module.css";
import VehicleDetails from "../VehicleDetails/VehicleDetails.jsx";

import iconAC from "../../assets/icons/icon-ac.svg";
import iconKitchen from "../../assets/icons/icon-kitchen.svg";
import iconTV from "../../assets/icons/icon-tv.svg";
import iconBathroom from "../../assets/icons/icon-bathroom.svg";
import iconTransmission from "../../assets/icons/icon-transmission.svg";
import iconEngine from "../../assets/icons/icon-engine.svg";
import iconRadio from "../../assets/icons/icon-radio.svg";
import iconRefrigerator from "../../assets/icons/icon-refrigerator.svg";
import iconMicrowave from "../../assets/icons/icon-microwave.svg";
import iconGas from "../../assets/icons/icon-gas.svg";
import iconWater from "../../assets/icons/icon-water.svg";
import iconStar from "../../assets/icons/icon-star.svg";
import iconMapPin from "../../assets/icons/icon-map-pin.svg";

const iconMap = {
  AC: iconAC,
  kitchen: iconKitchen,
  TV: iconTV,
  bathroom: iconBathroom,
  radio: iconRadio,
  refrigerator: iconRefrigerator,
  microwave: iconMicrowave,
  gas: iconGas,
  water: iconWater,
  transmission: iconTransmission,
  engine: iconEngine,
  star: iconStar,
  mapPin: iconMapPin,
};
const Features = ({ camper }) => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className={styles.featuresContainer}>
      <div className={styles.iconsGrid}>
        <div className={styles.iconCard}>
          <img
            src={iconTransmission}
            alt="Transmission"
            className={styles.iconImage}
          />
          <span className={styles.iconLabel}>
            {capitalize(camper.transmission)}
          </span>
        </div>

        <div className={styles.iconCard}>
          <img src={iconEngine} alt="Engine" className={styles.iconImage} />
          <span className={styles.iconLabel}>{capitalize(camper.engine)}</span>
        </div>

        {Object.keys(iconMap).map(
          (feature) =>
            camper[feature] === true && (
              <div key={feature} className={styles.iconCard}>
                <img
                  src={iconMap[feature]}
                  alt={feature}
                  className={styles.iconImage}
                />
                <span className={styles.iconLabel}>{capitalize(feature)}</span>
              </div>
            )
        )}
      </div>

      <div className={styles.vehicleDetailsSection}>
        <h2 className={styles.detailsTitle}>Vehicle details</h2>
        <hr className={styles.divider} />
        <VehicleDetails camper={camper} />
      </div>
    </div>
  );
};

export default Features;
