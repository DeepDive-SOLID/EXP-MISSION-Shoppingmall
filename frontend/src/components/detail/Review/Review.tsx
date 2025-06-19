import styles from "./Review.module.scss";
import { profile_img } from "../../../assets";
import { FaStar } from "react-icons/fa6";

const Review = () => {
  return (
    <div className={styles.reviewWrapper}>
      <p className={styles.title}>리뷰</p>
      <div className={styles.reviewContainer}>
        <div className={styles.reviewHeader}>
          <img
            src={profile_img}
            alt="Profile"
            className={styles.profileImage}
          />
          <p className={styles.username}>user1</p>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={styles.starIcon} />
          ))}
        </div>
        <p className={styles.reviewText}>
          정말 재미있고 유익한 경험이었습니다! 가이드님이 친절하게 설명해주셔서
          좋았어요.
        </p>
      </div>
    </div>
  );
};
export default Review;
