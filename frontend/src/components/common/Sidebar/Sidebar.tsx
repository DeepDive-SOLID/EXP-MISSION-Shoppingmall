import { useState, useEffect } from "react";
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
  const [open, setOpen] = useState<string | null>(null);
  const location = useLocation();

  // 현재 경로가 물품관리나 여행상품관리 페이지일 경우 상품관리 메뉴를 자동으로 열기
  useEffect(() => {
    if (
      location.pathname === "/manage-product" ||
      location.pathname === "/manage-travel"
    ) {
      setOpen("product");
    }
  }, [location.pathname]);

  const toggle = (menu: string) => {
    setOpen(open === menu ? null : menu);
  };

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

        <li className={styles.item} onClick={() => toggle("product")}>
          <FiBox />
          <span>상품관리</span>
        </li>

        {open === "product" && (
          <ul className={styles.subMenu}>
            <li className={styles.item}>
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
            <li className={styles.item}>
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
        )}

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
      </ul>
    </aside>
  );
};

export default Sidebar;
