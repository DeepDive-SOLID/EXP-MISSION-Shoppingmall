import styles from "./Header.module.scss";
import { logo, logout, shopping_cart, menu_bar } from "../../../assets/index";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    navigate("/search", {
      state: {
        name: searchTerm,
        sorted: 1,
      },
    });

  const handleMyPageClick = () => {
    navigate("/mypage/order-list");
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
          <div className={styles.menu}>
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

          <div className={styles.menu} onClick={handleMyPageClick}>
            <img src={menu_bar} alt="menu_bar" className={styles.menuIcon} />
            <p className={styles.menuText}>마이페이지</p>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Header;
