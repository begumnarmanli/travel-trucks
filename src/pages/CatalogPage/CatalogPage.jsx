import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampers } from "../../services/api.js";
import { selectFilters } from "../../redux/filters/filtersSelectors.js";
import { resetFilters } from "../../redux/filters/filtersSlice.js";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";
import CamperCard from "../../components/CamperCard/CamperCard.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import NotFoundFeedback from "../../pages/NotFoundPage/NotFoundPage.jsx";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  useEffect(() => {
    document.title = "Catalog | TravelTrucks";
  }, []);
  const dispatch = useDispatch();
  const [campers, setCampers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const filters = useSelector(selectFilters);

  const getCampersData = async (
    currentPage,
    currentFilters,
    isNewSearch = false
  ) => {
    setIsLoading(true);
    try {
      const data = await fetchCampers({
        ...currentFilters,
        page: currentPage,
        limit: 4,
      });

      const items = Array.isArray(data) ? data : data.items || [];

      if (isNewSearch) {
        setCampers(items);
      } else {
        setCampers((prev) => [...prev, ...items]);
      }

      setHasMore(items.length === 4);
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (campers.length === 0 && !isLoading) {
      getCampersData(1, filters, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleFilterSubmit = () => {
    setPage(1);
    getCampersData(1, filters, true);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getCampersData(nextPage, filters, false);
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setPage(1);
    getCampersData(1, {}, true);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Filters onFilterSubmit={handleFilterSubmit} />
      </aside>

      <main className={styles.mainContent}>
        {isLoading && page === 1 ? (
          <Loader />
        ) : (
          <>
            {campers.length === 0 ? (
              <div className={styles.notFoundWrapper}>
                <NotFoundFeedback onReset={handleResetFilters} />
              </div>
            ) : (
              <div className={styles.catalogPage}>
                {campers.map((camper) => (
                  <CamperCard key={camper.id} camper={camper} />
                ))}
              </div>
            )}

            {!isLoading && campers.length > 0 && hasMore && (
              <LoadMoreBtn onClick={handleLoadMore} />
            )}

            {isLoading && page > 1 && <Loader />}
          </>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;
