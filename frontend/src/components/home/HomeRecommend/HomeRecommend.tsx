import styles from "./HomeRecommend.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { HomeTravelDto } from "../../../types/home/homeTravel";
import { fetchRecommendedTravels } from "../../../api/home/homeApi";

const HomeRecommend = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [recommendations, setRecommendations] = useState<HomeTravelDto[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRecommendedTravels();
        setRecommendations(data);
      } catch (err) {
        console.error("추천 상품 로딩 실패", err);
      }
    };
    load();
  }, []);

  return (
    <div
      className={styles.recommendContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className={styles.title}>추천 상품</h2>
      <p className={styles.subtitle}>
        다녀온 사람들이 자신 있게 추천한 상품을 확인해보세요
      </p>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        className={styles.slider}
      >
        {recommendations.map(item => (
          <SwiperSlide key={item.travelId}>
            <div className={styles.card}>
              <img src={item.travelImg} alt={item.travelName} />
              <div className={styles.info}>
                <p className={styles.name}>{item.travelName}</p>
                <p className={styles.date}>
                  {item.travelStartDt} ~ {item.travelEndDt}
                </p>
                <p className={styles.price}>
                  {item.travelPrice.toLocaleString()}원
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div
          className={`swiper-button-prev ${styles.navArrow}`}
          style={{ display: isHovered ? "block" : "none" }}
        ></div>
        <div
          className={`swiper-button-next ${styles.navArrow}`}
          style={{ display: isHovered ? "block" : "none" }}
        ></div>
      </Swiper>
    </div>
  );
};

export default HomeRecommend;
