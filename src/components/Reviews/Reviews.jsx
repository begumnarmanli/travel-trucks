import ReviewItem from "./ReviewItem.jsx";

const Reviews = ({ reviews }) => {
  return (
    <div>
      {reviews?.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <ReviewItem review={review} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;
