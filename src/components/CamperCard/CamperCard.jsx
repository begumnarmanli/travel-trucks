import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import { selectFavorites } from "../../redux/favorites/favoritesSelectors";
import styles from "./CamperCard.module.css";

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
import iconHeart from "../../assets/icons/icon-heart.svg";

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
};

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();

  const favoriteItems = useSelector(selectFavorites);

  const isFavorite = favoriteItems.includes(camper.id);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(camper.id));
  };

  return (
    <div className={styles.camperCard}>
      <div className={styles.imageContainer}>
        <img src={camper.gallery[0].original} alt={camper.name} />
      </div>

      <div className={styles.details}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>{camper.name}</h2>
            <div className={styles.priceContainer}>
              <span className={styles.price}>€{camper.price.toFixed(2)}</span>
              <button
                className={styles.favoriteBtn}
                onClick={handleFavoriteClick}
                type="button"
              >
                <img
                  src={iconHeart}
                  alt="Favorite"
                  style={{
                    filter: isFavorite
                      ? "invert(27%) sepia(91%) saturate(2352%) hue-rotate(346deg) brightness(104%) contrast(97%)"
                      : "none",
                  }}
                />
              </button>
            </div>
          </div>

          <div className={styles.meta}>
            <span className={styles.rating}>
              <img src={iconStar} alt="Rating" />
              {camper.rating} ({camper.reviews.length} Reviews)
            </span>
            <span className={styles.location}>
              <img src={iconMapPin} alt="Location" />
              {camper.location}
            </span>
          </div>

          <p className={styles.description}>{camper.description}</p>

          <div className={styles.features}>
            <div className={styles.featureBox}>
              <img src={iconTransmission} alt="Transmission" />
              <span className={styles.featureText}>{camper.transmission}</span>
            </div>
            <div className={styles.featureBox}>
              <img src={iconEngine} alt="Engine" />
              <span className={styles.featureText}>{camper.engine}</span>
            </div>

            {Object.keys(iconMap).map((key) => {
              if (camper[key] === true) {
                return (
                  <div key={key} className={styles.featureBox}>
                    <img src={iconMap[key]} alt={key} />
                    <span className={styles.featureText}>
                      {key === "AC"
                        ? "AC"
                        : key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <Link
          to={`/catalog/${camper.id}`}
          className={`btn-reset ${styles.showMoreBtn}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;
