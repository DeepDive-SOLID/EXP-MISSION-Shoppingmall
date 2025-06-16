import styles from "./HomeBanner.module.scss";
import {
  home_banner,
  home_banner1,
  home_banner2,
  home_banner3,
  home_banner4,
  home_banner5,
} from "../../../assets";
import { useEffect, useState } from "react";

const banners = [
  home_banner,
  home_banner1,
  home_banner2,
  home_banner3,
  home_banner4,
  home_banner5,
];

const HomeBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`배너 ${index + 1}`}
            className={`${styles.bannerImage} ${
              index === currentIndex ? styles.active : ""
            }`}
          />
        ))}
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
