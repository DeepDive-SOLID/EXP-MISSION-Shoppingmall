import styles from "./HomePopular.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { HomeTravelDto } from "../../../types/home/homeTravel";
import { fetchPopularTravels } from "../../../api/home/homeApi";
import { useNavigate } from "react-router-dom";

const HomePopular = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [populars, setPopulars] = useState<HomeTravelDto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPopulars = async () => {
      try {
        const data = await fetchPopularTravels();
        setPopulars(data);
      } catch (err) {
        console.error("인기 상품 로딩 실패", err);
      }
    };
    loadPopulars();
  }, []);

  return (
    <div
      className={styles.popularContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className={styles.title}>인기 상품</h2>
      <p className={styles.subtitle}>
        가장 많은 여행객이 선택한 상품을 확인해보세요
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
        {populars.map(item => (
          <SwiperSlide key={item.travelId}>
            <div
              className={styles.card}
              onClick={() =>
                navigate(`/detail/${item.travelId}`, { state: item })
              }
            >
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

export default HomePopular;
