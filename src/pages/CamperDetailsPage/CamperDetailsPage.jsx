import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CamperDetailsPage.module.css";
import { fetchCamperById } from "../../redux/campers/campersOperations";
import { getSelectedCamper } from "../../redux/campers/campersSelectors";
import Loader from "../../components/Loader/Loader";
import { formatPrice } from "../../utils/formatPrice";
import Features from "../../components/Features/Features";
import BookingForm from "../../components/BookingForm/BookingForm";
import Reviews from "../../components/Reviews/Reviews";

import iconStar from "../../assets/icons/icon-star.svg";
import iconMapPin from "../../assets/icons/icon-map-pin.svg";

const CamperDetailsPage = () => {
  useEffect(() => {
    document.title = "Details | TravelTrucks";
  }, []);
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(getSelectedCamper);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (!camper) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <section className={styles.headerSection}>
        <div className={styles.headerContent}>
          <h2 className={styles.camperName}>{camper.name}</h2>

          <div className={styles.metaRow}>
            <div className={styles.ratingInfo}>
              <img src={iconStar} alt="Star" className={styles.icon} />
              <span className={styles.ratingText}>
                {camper.rating} ({camper.reviews?.length} Reviews)
              </span>
            </div>

            <div className={styles.locationInfo}>
              <img
                src={iconMapPin}
                alt="Location"
                className={styles.locationIcon}
              />
              <span className={styles.locationText}>{camper.location}</span>
            </div>
          </div>

          <p className={styles.priceTag}>{formatPrice(camper.price)}</p>
        </div>
      </section>

      <section className={styles.galleryContainer}>
        {camper.gallery?.map((img, index) => (
          <div key={index} className={styles.galleryItem}>
            <img
              src={img.original}
              alt={`${camper.name} ${index}`}
              className={styles.galleryImg}
            />
          </div>
        ))}
      </section>

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tabBtn} ${
            activeTab === "features" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>

        <button
          type="button"
          className={`${styles.tabBtn} ${
            activeTab === "reviews" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={styles.contentGrid}>
        <div
          className={
            activeTab === "features" ? styles.featuresSide : styles.reviewsSide
          }
        >
          {activeTab === "features" ? (
            <Features camper={camper} />
          ) : (
            <Reviews reviews={camper.reviews} />
          )}
        </div>
        <aside className={styles.bookingSide}>
          <BookingForm />
        </aside>
      </div>
    </div>
  );
};

export default CamperDetailsPage;
