import styles from "./Sidebar.module.scss";
import {
  FiAirplay,
  FiBox,
  FiUsers,
  FiClipboard,
  FiBriefcase,
  FiDatabase,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // 현재 경로가 물품관리나 여행상품관리 페이지인지 확인
  const isProductPage =
    location.pathname === "/manage-product" ||
    location.pathname === "/manage-travel";

  return (
    <aside className={styles.sidebar}>
      <ul>
        <li className={styles.item}>
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? styles.active : ""}
          >
            <FiDatabase />
            <span>대시보드</span>
          </Link>
        </li>

        <li className={styles.item}>
          <Link
            to="/manage-order"
            className={
              location.pathname === "/manage-order" ? styles.active : ""
            }
          >
            <FiClipboard />
            <span>주문관리</span>
          </Link>
        </li>

        <li className={styles.item}>
          <Link
            to="/manage-user"
            className={
              location.pathname === "/manage-user" ? styles.active : ""
            }
          >
            <FiUsers />
            <span>사용자관리</span>
          </Link>
        </li>

        <li
          className={`${styles.item} ${styles.productMenu} ${isProductPage ? styles.activeParent : ""}`}
        >
          <div className={styles.menuTitle}>
            <FiBox />
            <span>상품관리</span>
          </div>
          <ul className={styles.subMenu}>
            <li className={styles.subItem}>
              <Link
                to="/manage-product"
                className={
                  location.pathname === "/manage-product" ? styles.active : ""
                }
              >
                <FiAirplay />
                <span>물품 관리</span>
              </Link>
            </li>
            <li className={styles.subItem}>
              <Link
                to="/manage-travel"
                className={
                  location.pathname === "/manage-travel" ? styles.active : ""
                }
              >
                <FiBriefcase />
                <span>여행 상품 관리</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
