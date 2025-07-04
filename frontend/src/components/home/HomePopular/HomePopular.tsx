import styles from "./HomePopular.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { HomeTravelDto } from "../../../types/home/homeTravel";
import { fetchPopularTravels } from "../../../api/home/homeApi";
import { useNavigate } from "react-router-dom";
import type { Swiper as SwiperType } from "swiper";

const HomePopular = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [populars, setPopulars] = useState<HomeTravelDto[]>([]);
  const navigate = useNavigate();

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // 인기 상품 불러오기
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

  // 커스텀 swiper 네비게이션 설정
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        swiperRef.current &&
        swiperRef.current.params.navigation &&
        typeof swiperRef.current.params.navigation !== "boolean" &&
        prevRef.current &&
        nextRef.current
      ) {
        swiperRef.current.params.navigation.prevEl = prevRef.current;
        swiperRef.current.params.navigation.nextEl = nextRef.current;

        swiperRef.current.navigation.destroy();
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [populars]);

  return (
    <div
      className={styles.popularContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className={styles.title}>인기 상품</h2>
      <p className={styles.subtitle}>
        여행객들이 가장 만족한 상품만 모았어요 !
      </p>

      <div className={styles.sliderWrapper}>
        <Swiper
          key={populars.length}
          modules={[Navigation]}
          spaceBetween={20}
          loop={true}
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className={styles.slider}
        >
          {populars.map(item => (
            <SwiperSlide key={item.travelId}>
              <div
                className={styles.card}
                onClick={() =>
                  navigate(`/detail/${item.travelId}`, {
                    state: { travel: item },
                  })
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
        </Swiper>

        <div
          ref={prevRef}
          className={`swiper-button-prev ${styles.navArrow}`}
          style={{ display: isHovered ? "block" : "none" }}
        ></div>
        <div
          ref={nextRef}
          className={`swiper-button-next ${styles.navArrow}`}
          style={{ display: isHovered ? "block" : "none" }}
        ></div>
      </div>
    </div>
  );
};

export default HomePopular;
