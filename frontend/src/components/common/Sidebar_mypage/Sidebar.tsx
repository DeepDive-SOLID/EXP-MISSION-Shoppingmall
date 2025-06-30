import styles from "./Sidebar.module.scss";
import { FiList, FiUser, FiCreditCard } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemberProfile } from "../../../api/mypage/memberApi";
import { MypageMemberProfileDto } from "../../../types/mypage/member";
import profileImg from "../../../assets/images/profile1.jpg";

interface SidebarProps {
  memberId?: string;
}

const Sidebar = ({ memberId = "boon" }: SidebarProps) => {
  const location = useLocation();
  const [memberProfile, setMemberProfile] =
    useState<MypageMemberProfileDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberProfile = async () => {
      try {
        const profile = await getMemberProfile(memberId);
        setMemberProfile(profile);
      } catch (error) {
        console.error("회원 정보를 가져오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    if (memberId) {
      fetchMemberProfile();
    }
  }, [memberId]);

  if (loading) {
    return (
      <aside className={styles.sidebar}>
        <div className={styles.profileBox}>
          <div className={styles.greeting}>로딩 중...</div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileBox}>
        <img
          src={memberProfile?.memberImg || profileImg}
          alt="프로필"
          className={styles.profileImg}
        />
        <div className={styles.greeting}>
          <span className={styles.userName}>
            {memberProfile?.memberName || "사용자"}
          </span>
          님, 반갑습니다
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
