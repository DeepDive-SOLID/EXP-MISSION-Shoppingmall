import styles from "./HomeDeadline.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { HomeTravelDto } from "../../../types/home/homeTravel";
import { fetchDeadlineTravels } from "../../../api/home/homeApi";
import { useNavigate } from "react-router-dom";
import type { Swiper as SwiperType } from "swiper";

const HomeDeadline = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [deadlineTravels, setDeadlineTravels] = useState<HomeTravelDto[]>([]);
  const navigate = useNavigate();

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // 마감 임박 여행 상품 불러오기
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchDeadlineTravels();
        setDeadlineTravels(data);
      } catch (err) {
        console.error("마감 임박 상품 로딩 실패", err);
      }
    };
    load();
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
  }, [deadlineTravels]);

  return (
    <div
      className={styles.DeadlineContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className={styles.title}>마감 임박 여행</h2>
      <p className={styles.subtitle}>
        출발일이 얼마 남지 않았어요! 지금 예약하세요!
      </p>

      <div className={styles.sliderWrapper}>
        <Swiper
          key={deadlineTravels.length}
          modules={[Navigation]}
          loop={false}
          spaceBetween={20}
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          className={styles.slider}
        >
          {deadlineTravels
            .filter(item => {
              const travelStartDate = new Date(item.travelStartDt);
              const reservationDeadline = new Date(travelStartDate);
              reservationDeadline.setDate(travelStartDate.getDate() - 8);

              const today = new Date();
              today.setHours(0, 0, 0, 0);

              return today <= reservationDeadline;
            })
            .map(item => {
              const travelStartDate = new Date(item.travelStartDt);
              const reservationDeadline = new Date(travelStartDate);
              reservationDeadline.setDate(travelStartDate.getDate() - 7);

              const today = new Date();
              const timeDiff = reservationDeadline.getTime() - today.getTime();
              const dDay = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
              const dDayText =
                dDay > 0 ? `예약 마감 D-${dDay}` : dDay <= 0 ? "예약 마감" : "";

              return (
                <SwiperSlide key={item.travelId}>
                  <div
                    className={styles.card}
                    onClick={() =>
                      navigate(`/detail/${item.travelId}`, {
                        state: { travel: item },
                      })
                    }
                  >
                    <div className={styles.imgWrapper}>
                      <img src={item.travelImg} alt={item.travelName} />
                    </div>
                    <div className={styles.info}>
                      <p className={styles.name}>
                        {item.travelName}
                        {dDayText && (
                          <span className={styles.dDayBadge}>{dDayText}</span>
                        )}
                      </p>

                      <p className={styles.date}>
                        {item.travelStartDt} ~ {item.travelEndDt}
                      </p>
                      <p className={styles.price}>
                        {item.travelPrice.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
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

export default HomeDeadline;
