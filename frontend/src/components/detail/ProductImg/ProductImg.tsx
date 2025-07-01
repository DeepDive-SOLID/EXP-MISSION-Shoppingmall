import styles from "./ProductImg.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";
import { useRef, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ProductDto } from "../../../types/home/homeProduct";
import { fetchProducts } from "../../../api/home/homeApi";

interface ProductImgProps {
  travelId: number;
  travelImg: string;
}

const ProductImg = ({ travelId, travelImg }: ProductImgProps) => {
  const [subItems, setSubItems] = useState<string[]>([]);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const loadSubImages = async () => {
      try {
        const allProducts: ProductDto[] = await fetchProducts();
        const filtered = allProducts
          .filter(p => !!p.productImg && !p.productSold)
          .map(p => p.productImg as string);

        setSubItems(filtered);
      } catch (err) {
        console.error("서브 이미지 불러오기 실패:", err);
      }
    };

    loadSubImages();
  }, [travelId]);

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
  }, [subItems]);

  return (
    <div>
      <div className={styles.leftSection}>
        <img src={travelImg} alt="Main Poster" className={styles.mainImg} />

        <div className={styles.sliderWrapper}>
          <Swiper
            key={subItems.length}
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={3}
            loop={true}
            onSwiper={swiper => {
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
