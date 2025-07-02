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
import { useNavigate } from "react-router-dom";

const banners = [
  home_banner,
  home_banner1,
  home_banner2,
  home_banner3,
  home_banner4,
  home_banner5,
];

const HomeBanner = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // 검색 버튼 클릭 시 이동
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/search", {
      state: {
        name: destination,
        travelStartDt: date,
        travelAmount: people,
        sorted: 1,
      },
    });
  };

  // 배너 자동 전환
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
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="destination">여행지</label>
            <input
              id="destination"
              type="text"
              placeholder="여행지"
              value={destination}
              onChange={e => setDestination(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="date">출발 일정</label>
            <input
              id="date"
              type="date"
              placeholder="출발 일정"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="people">인원</label>
            <input
              id="people"
              type="number"
              placeholder="인원"
              value={people}
              onChange={e => setPeople(Number(e.target.value))}
              min={1}
            />
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
