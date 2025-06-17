import styles from "./SearchMain.module.scss";
import { home_banner2 } from "../../../assets/";
import { FaRegStar } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";

const mockSearchResults = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  title: "[부산] 먹방투어",
  badges: ["# 먹방", "# 부산", "# 투어"],
  date: "1박 2일 (2025.06.02 ~ 2025.06.03)",
  rating: 4.8,
  comments: 12,
  price: "150,000원",
}));

const SearchMain = () => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.headerRow}>
        <h2>"검색어" 검색 결과</h2>
        <div className={styles.searchfilter}>
          <div className={styles.filterOption}>
            <span className={styles.filterText}>정렬 기준:</span>
            <select className={styles.filterSelect}>
              <option value="popular">인기순</option>
              <option value="recent">최신순</option>
              <option value="rating">평점순</option>
            </select>
          </div>
        </div>
      </div>

      {mockSearchResults.map(item => (
        <div className={styles.searchItem} key={item.id}>
          <div className={styles.leftSection}>
            <img
              src={home_banner2}
              alt="검색 배너"
              className={styles.listImg}
            />
          </div>
          <div className={styles.rightSection}>
            <div className={styles.listHeader}>
              <p className={styles.listTitle}>{item.title}</p>
              <div className={styles.listBadge}>
                {item.badges.map((badge, idx) => (
                  <span className={styles.badge} key={idx}>
                    {badge}
                  </span>
                ))}
              </div>
              <p className={styles.listDate}>{item.date}</p>
            </div>
            <div className={styles.listContent}>
              <FaRegStar className={styles.starIcon} />
              <span className={styles.starRating}>{item.rating}</span>
              <FaComments className={styles.commentIcon} />
              <span className={styles.commentCount}>{item.comments}</span>
              <span className={styles.price}>{item.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchMain;
