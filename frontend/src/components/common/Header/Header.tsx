import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { logo, logout, shopping_cart, menu_bar } from "../../../assets/index";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoggedIn, logout: logoutUser } = useAuth();

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

              <div className={styles.menu}>
                <img
                  src={shopping_cart}
                  alt="shopping_cart"
                  className={styles.menuIcon}
                />
                <p className={styles.menuText}>장바구니</p>
              </div>

              <div
                className={styles.menu}
                onClick={() => navigate("/mypage/order-list")}
              >
                <img
                  src={menu_bar}
                  alt="menu_bar"
                  className={styles.menuIcon}
                />
                <p className={styles.menuText}>마이페이지</p>
              </div>
            </>
          ) : (
            // 로그인되지 않은 상태
            <>
              <div className={styles.menu} onClick={() => navigate("/login")}>
                <p className={styles.menuText}>로그인</p>
              </div>

              <div className={styles.menu} onClick={() => navigate("/signup")}>
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
