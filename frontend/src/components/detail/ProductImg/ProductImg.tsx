import styles from "./ProductImg.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";
import { useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { carrier, pilow, travelkit, snorkel, umbrella } from "../../../assets";

const subItems = [carrier, pilow, travelkit, snorkel, umbrella];

interface ProductImgProps {
  travelImg: string;
}

const ProductImg = ({ travelImg }: ProductImgProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params.navigation &&
      typeof swiperRef.current.params.navigation !== "boolean"
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div>
      <div className={styles.leftSection}>
        <img src={travelImg} alt="Main Poster" className={styles.mainImg} />
        <div className={styles.sliderWrapper}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={3}
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={swiper => {
              swiperRef.current = swiper;
            }}
            className={styles.slider}
          >
            {subItems.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`추가 이미지 ${idx}`}
                  className={styles.subImg}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div ref={prevRef} className={`${styles.arrow} ${styles.leftArrow}`}>
            <FiChevronLeft />
          </div>
          <div ref={nextRef} className={`${styles.arrow} ${styles.rightArrow}`}>
            <FiChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductImg;
