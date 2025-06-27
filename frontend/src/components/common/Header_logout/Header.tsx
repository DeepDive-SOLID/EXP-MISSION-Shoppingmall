import styles from "./Header.module.scss";
import { logo } from "../../../assets/index";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    navigate("/search", {
      state: {
        name: searchTerm,
        sorted: 1,
      },
    });
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
          <div className={styles.menu} onClick={() => navigate("/login")}>
            <p className={styles.menuText}>로그인</p>
          </div>

          <div className={styles.menu} onClick={() => navigate("/signup")}>
            <p className={styles.menuText}>회원가입</p>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Header;
