import styles from "./SearchMain.module.scss";
import { FaStar } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";
import { useMemo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchTravels } from "../../../api/home/homeApi";
import { HomeTravelDto } from "../../../types/home/homeTravel";
import { useNavigate } from "react-router-dom";

const SearchMain = () => {
  const [results, setResults] = useState<HomeTravelDto[]>([]);
  const [sorted, setSorted] = useState<1 | 2 | 3>(1); // 1: 최신순, 2: 인기순, 3: 평점순
  const location = useLocation();
  const baseParams = useMemo(() => location.state || {}, [location.state]);
  const navigate = useNavigate();

  // 검색 결과 불러오기
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await searchTravels({ ...baseParams, sorted });
        setResults(res);
      } catch (err) {
        console.error("검색 실패:", err);
      }
    };
    fetch();
  }, [sorted, baseParams]);

  return (
    <div className={styles.mainContent}>
      <div className={styles.headerRow}>
        <h2>
          {baseParams.name
            ? `"${baseParams.name}" 검색 결과`
            : "전체 검색 결과"}
        </h2>
        <div className={styles.searchfilter}>
          <div className={styles.filterOption}>
            <span className={styles.filterText}>정렬 기준:</span>
            <select
              className={styles.filterSelect}
              value={
                sorted === 2 ? "popular" : sorted === 3 ? "rating" : "recent"
              }
              onChange={e => {
                const value = e.target.value;
                if (value === "popular") setSorted(2);
                else if (value === "rating") setSorted(3);
                else setSorted(1);
              }}
            >
              <option value="popular">인기순</option>
              <option value="recent">최신순</option>
              <option value="rating">리뷰순</option>
            </select>
          </div>
        </div>
      </div>

      {results.map(item => (
        <div
          className={styles.searchItem}
          key={item.travelId}
          onClick={() =>
            navigate(`/detail/${item.travelId}`, {
              state: {
                travel: item,
              },
            })
          }
        >
          <div className={styles.leftSection}>
            <img
              src={item.travelImg}
              alt="검색 배너"
              className={styles.listImg}
            />
          </div>
          <div className={styles.rightSection}>
            <div className={styles.listHeader}>
              <p className={styles.listTitle}>{item.travelName}</p>
              <div className={styles.listBadge}>
                {item.travelLabel.split(",").map((badge, idx) => (
                  <span className={styles.badge} key={idx}>
                    #{badge.trim()}
                  </span>
                ))}
              </div>
              <p className={styles.listDate}>
                {item.travelStartDt} ~ {item.travelEndDt}
              </p>
            </div>
            <div className={styles.listContent}>
              <FaStar className={styles.starIcon} />
              <span className={styles.starRating}>
                {(item.rate ?? 0).toFixed(1)}
              </span>
              <FaComments className={styles.commentIcon} />
              <span className={styles.commentCount}>{item.reviewCount}</span>
              <span className={styles.price}>
                {item.travelPrice.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchMain;
