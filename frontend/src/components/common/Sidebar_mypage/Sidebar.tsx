import styles from "./Sidebar.module.scss";
import { FiList, FiUser, FiCreditCard } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import profileImg from "../../../assets/images/profile1.jpg";

interface SidebarProps {
  userName: string;
}

const Sidebar = ({ userName }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileBox}>
        <img src={profileImg} alt="프로필" className={styles.profileImg} />
        <div className={styles.greeting}>
          <span className={styles.userName}>{userName}</span>님, 반갑습니다
        </div>
      </div>

      <ul className={styles.menuList}>
        <li className={styles.item}>
          <Link
            to="/mypage/order-list"
            className={
              location.pathname === "/mypage/order-list" ? styles.active : ""
            }
          >
            <FiList />
            <span>주문 내역 조회</span>
          </Link>
        </li>

        <li className={styles.item}>
          <Link
            to="/mypage/card-info"
            className={
              location.pathname === "/mypage/card-info" ? styles.active : ""
            }
          >
            <FiCreditCard />
            <span>카드 정보 관리</span>
          </Link>
        </li>

        <li className={styles.item}>
          <Link
            to="/mypage/edit-profile"
            className={
              location.pathname === "/mypage/edit-profile" ? styles.active : ""
            }
          >
            <FiUser />
            <span>회원 정보 수정</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
