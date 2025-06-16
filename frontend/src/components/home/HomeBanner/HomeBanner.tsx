import styles from "./HomeBanner.module.scss";
import { home_banner } from "../../../assets";

const HomeBanner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={home_banner} alt="배너 이미지" />
      </div>

      <div className={styles.right}>
        <form className={styles.formCard}>
          <div className={styles.inputGroup}>
            <label htmlFor="destination">여행지</label>
            <input id="destination" type="text" placeholder="여행지" />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="date">출발 일정</label>
            <input id="date" type="text" placeholder="출발 일정" />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="people">인원</label>
            <input id="people" type="number" placeholder="인원" />
          </div>

          <button type="submit" className={styles.submitButton}>
            확인하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeBanner;
