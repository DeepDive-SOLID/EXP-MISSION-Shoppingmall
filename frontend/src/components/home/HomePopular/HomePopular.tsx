import styles from "./HomePopular.module.scss";
import { home_banner } from "../../../assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

const mockPopulars = [
  {
    title: "경주 당일치기",
    date: "25.06.02(화) 출발",
    price: "20,000원",
    img: home_banner,
  },
  {
    title: "경주 당일치기",
    date: "25.06.02(화) 출발",
    price: "20,000원",
    img: home_banner,
  },
  {
    title: "경주 당일치기",
    date: "25.06.02(화) 출발",
    price: "20,000원",
    img: home_banner,
  },
  {
    title: "경주 당일치기",
    date: "25.06.02(화) 출발",
    price: "20,000원",
    img: home_banner,
  },
  {
    title: "경주 당일치기",
    date: "25.06.02(화) 출발",
    price: "20,000원",
    img: home_banner,
  },
  {
    title: "경주 당일치기",
    date: "25.06.02(화) 출발",
    price: "20,000원",
    img: home_banner,
  },
];

const HomePopular = () => {
  const [isHovered, setIsHovered] = useState(false);

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
        {mockPopulars.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className={styles.card}>
              <img src={item.img} alt={item.title} />
              <div className={styles.info}>
                <p className={styles.name}>{item.title}</p>
                <p className={styles.date}>{item.date}</p>
                <p className={styles.price}>{item.price}</p>
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
