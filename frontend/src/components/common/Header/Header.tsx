import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { logo, logout, shopping_cart, menu_bar } from "../../../assets/index";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoggedIn, isManager, logout: logoutUser } = useAuth();

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    navigate("/search", {
      state: {
        name: searchTerm,
        sorted: 1,
      },
    });
  };

  const handleLogout = () => {
    logoutUser();
  };

  const handleMyPageClick = () => {
    // 관리자인 경우 대시보드로, 일반 사용자인 경우 마이페이지로 이동
    if (isManager) {
      navigate("/dashboard");
    } else {
      navigate("/mypage/order-list");
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.left}>
          <img
            src={logo}
            alt="Logo"
            className={styles.logo}
            onClick={() => navigate("/")}
          />
        </div>

        <div className={styles.center}>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className={styles.searchInput}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <IoIosSearch className={styles.searchIcon} onClick={handleSearch} />
        </div>

        <div className={styles.right}>
          {isLoggedIn ? (
            // 로그인된 상태
            <>
              <div className={styles.menu} onClick={handleLogout}>
                <img src={logout} alt="Logout" className={styles.menuIcon} />
                <p className={styles.menuText}>로그아웃</p>
              </div>

              {!isManager && (
                // 일반 사용자만 장바구니 표시
                <div className={styles.menu}>
                  <img
                    src={shopping_cart}
                    alt="shopping_cart"
                    className={styles.menuIcon}
                  />
                  <p className={styles.menuText}>장바구니</p>
                </div>
              )}

              <div className={styles.menu} onClick={handleMyPageClick}>
                <img
                  src={menu_bar}
                  alt="menu_bar"
                  className={styles.menuIcon}
                />
                <p className={styles.menuText}>
                  {isManager ? "관리자 대시보드" : "마이페이지"}
                </p>
              </div>
            </>
          ) : (
            // 로그인되지 않은 상태
            <>
              <div className={styles.menu} onClick={() => navigate("/login")}>
                <CiLogin className={styles.menuIcon} />
                <p className={styles.menuText}>로그인</p>
              </div>

              <div className={styles.menu} onClick={() => navigate("/signup")}>
                <FaUserPlus className={styles.menuIcon} />
                <p className={styles.menuText}>회원가입</p>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
