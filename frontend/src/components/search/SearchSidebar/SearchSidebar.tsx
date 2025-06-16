import styles from "./SearchSidebar.module.scss";
import { korea_map } from "../../../assets";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

const SearchSidebar = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <div className={styles.sidebar}>
      <div className={styles.mapSection}>
        <img src={korea_map} alt="지도" className={styles.mapImage} />
        <button className={styles.mapButton}>지도보기</button>
      </div>

      <div className={styles.calendarSection}>
        <h2 className={styles.sectionTitle}>일정 선택</h2>
        <DatePicker
          selected={startDate}
          onChange={dates => {
            const [start, end] = dates as [Date, Date];
            setStartDate(start);
            setEndDate(end);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          locale={ko}
        />
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
