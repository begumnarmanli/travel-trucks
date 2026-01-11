import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick, isHidden }) => {
  if (isHidden) return null;

  return (
    <div className={styles.loadMoreBtnWrapper}>
      <button className="btnBase btnOutline" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
