import styles from "./SearchSidebar.module.scss";
import { korea_map } from "../../../assets";

const SearchSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.mapSection}>
        <img src={korea_map} alt="지도" className={styles.mapImage} />
        <button className={styles.mapButton}>지도보기</button>
      </div>

      <div className={styles.section}>
        <h3>일정 선택</h3>
        <input type="date" className={styles.dateInput} />
      </div>

      <div className={styles.section}>
        <h3>인원 선택</h3>
        <select className={styles.select}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}명
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchSidebar;
