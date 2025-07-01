import styles from "./Sidebar.module.scss";
import { FiList, FiUser, FiCreditCard } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemberProfile } from "../../../api/mypage/memberApi";
import { MypageMemberProfileDto } from "../../../types/mypage/member";
import profileImg from "../../../assets/images/profile1.jpg";
import { useAuth } from "../../../contexts/AuthContext";

interface SidebarProps {
  memberId?: string;
}

const Sidebar = ({ memberId }: SidebarProps) => {
  const location = useLocation();
  const { userInfo } = useAuth();
  const [memberProfile, setMemberProfile] =
    useState<MypageMemberProfileDto | null>(null);
  const [loading, setLoading] = useState(true);

  // 사용할 memberId 결정: props로 전달된 값이 있으면 사용, 없으면 현재 로그인한 사용자 ID 사용
  const currentMemberId = memberId || userInfo?.memberId;

  // 사용자 프로필 정보 가져오기
  useEffect(() => {
    const fetchMemberProfile = async () => {
      try {
        // memberId가 없으면 에러 처리
        if (!currentMemberId) {
          console.error("사용자 ID를 찾을 수 없습니다.");
          setLoading(false);
          return;
        }

        // API를 통해 사용자 프로필 정보 가져오기
        const profile = await getMemberProfile(currentMemberId);
        setMemberProfile(profile);
      } catch (error) {
        console.error("회원 정보를 가져오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    // memberId가 있을 때만 프로필 정보 가져오기
    if (currentMemberId) {
      fetchMemberProfile();
    } else {
      setLoading(false);
    }
  }, [currentMemberId]); // currentMemberId가 변경될 때마다 실행

  // 로딩 중일 때 표시할 UI
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
      {/* 사용자 프로필 섹션 */}
      <div className={styles.profileBox}>
        <img
          src={memberProfile?.memberImg || profileImg} // 프로필 이미지 (없으면 기본 이미지 사용)
          alt="프로필"
          className={styles.profileImg}
        />
        <div className={styles.greeting}>
          <span className={styles.userName}>
            {memberProfile?.memberName || "사용자"}{" "}
          </span>
          님, 반갑습니다
        </div>
      </div>

      {/* 마이페이지 메뉴 목록 */}
      <ul className={styles.menuList}>
        {/* 주문 내역 조회 메뉴 */}
        <li className={styles.item}>
          <Link
            to="/mypage/order-list"
            className={
              location.pathname === "/mypage/order-list" ? styles.active : "" // 현재 페이지면 활성화 스타일 적용
            }
          >
            <FiList />
            <span>주문 내역 조회</span>
          </Link>
        </li>

        {/* 카드 정보 관리 메뉴 */}
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

        {/* 회원 정보 수정 메뉴 */}
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
