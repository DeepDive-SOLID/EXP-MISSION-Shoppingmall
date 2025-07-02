import styles from "./Review.module.scss";
import { profile_img } from "../../../assets";
import { FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { fetchReviews } from "../../../api/home/homeApi";
import { ReviewDto } from "../../../types/home/review";

interface ReviewProps {
  travelId: number;
}

const Review = ({ travelId }: ReviewProps) => {
  const [reviews, setReviews] = useState<ReviewDto[]>([]);

  // 리뷰 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchReviews(travelId);
        setReviews(res);
      } catch (err) {
        console.error("리뷰 로딩 실패:", err);
      }
    };
    fetchData();
  }, [travelId]);

  return (
    <div className={styles.reviewWrapper}>
      <p className={styles.title}>리뷰</p>
      {reviews.map((review, idx) => (
        <div className={styles.reviewContainer} key={idx}>
          <div className={styles.reviewHeader}>
            <img
              src={profile_img}
              alt="Profile"
              className={styles.profileImage}
            />
            <p className={styles.username}>{review.memberName}</p>
            {[...Array(review.reviewRate)].map((_, i) => (
              <FaStar key={i} className={styles.starIcon} />
            ))}
          </div>
          <p className={styles.reviewText}>{review.reviewComment}</p>
        </div>
      ))}
    </div>
  );
};

export default Review;
