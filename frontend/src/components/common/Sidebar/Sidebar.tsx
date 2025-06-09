import { useState } from "react";
import styles from "./Sidebar.module.scss";
import {
  FiAirplay,
  FiBox,
  FiUsers,
  FiClipboard,
  FiBriefcase,
  FiDatabase,
} from "react-icons/fi";

const Sidebar = () => {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (menu: string) => {
    setOpen(open === menu ? null : menu);
  };

  return (
    <aside className={styles.sidebar}>
      <ul>
        <li className={styles.item}>
          <FiDatabase />
          <span>대시보드</span>
        </li>

        <li className={styles.item}>
          <FiClipboard />
          <span>주문관리</span>
        </li>

        <li className={styles.item} onClick={() => toggle("product")}>
          <FiBox />
          <span>상품관리</span>
        </li>

        {open === "product" && (
          <ul className={styles.subMenu}>
            <li className={styles.item}>
              <FiAirplay />
              <span>물품 관리</span>
            </li>
            <li className={styles.item}>
              <FiBriefcase />
              <span>여행 상품 관리</span>
            </li>
          </ul>
        )}

        <li className={styles.item}>
          <FiUsers />
          <span>사용자관리</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
