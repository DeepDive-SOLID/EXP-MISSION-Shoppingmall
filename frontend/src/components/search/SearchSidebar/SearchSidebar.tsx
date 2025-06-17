import styles from "./SearchSidebar.module.scss";
import { korea_map } from "../../../assets";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { format } from "date-fns";

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
        <p className={styles.sectionTitle}>일정 선택</p>

        {startDate && endDate && (
          <p className={styles.helperText}>
            선택된 기간: {format(startDate, "yyyy.MM.dd")} ~{" "}
            {format(endDate, "yyyy.MM.dd")}
          </p>
        )}

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
          calendarStartDay={1}
        />
      </div>

      <div className={styles.memberSection}>
        <p className={styles.sectionTitle}>인원 선택</p>
        <select className={styles.select}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i < 9 ? `${i + 1}명` : "10명 이상"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchSidebar;
