import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCampers } from "../../redux/campers/campersOperations.js";
import {
  getFilteredCampers,
  selectIsLoading,
} from "../../redux/campers/campersSelectors.js";
import { resetFilters } from "../../redux/filters/filtersSlice.js";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";
import CamperCard from "../../components/CamperCard/CamperCard.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import NotFoundFeedback from "../../pages/NotFoundPage/NotFoundPage.jsx";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const dispatchReset = () => dispatch(resetFilters());

  const filteredCampers = useSelector(getFilteredCampers);
  const isLoading = useSelector(selectIsLoading);

  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    document.title = "Catalog | TravelTrucks";
    dispatch(fetchAllCampers());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleResetFilters = () => {
    dispatchReset();
    setVisibleCount(4);
  };

  const campersToDisplay = filteredCampers.slice(0, visibleCount);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Filters onFilterSubmit={() => setVisibleCount(4)} />
      </aside>

      <main className={styles.mainContent}>
        {isLoading && filteredCampers.length === 0 ? (
          <Loader />
        ) : (
          <>
            {filteredCampers.length === 0 ? (
              <div className={styles.notFoundWrapper}>
                <NotFoundFeedback onReset={handleResetFilters} />
              </div>
            ) : (
              <div className={styles.catalogPage}>
                {campersToDisplay.map((camper) => (
                  <CamperCard key={camper.id} camper={camper} />
                ))}
              </div>
            )}

            {!isLoading && filteredCampers.length > visibleCount && (
              <LoadMoreBtn onClick={handleLoadMore} />
            )}

            {isLoading && filteredCampers.length > 0 && <Loader />}
          </>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;
