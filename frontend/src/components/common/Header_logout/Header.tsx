import styles from "./Header.module.scss";
import { logo } from "../../../assets/index";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
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
          />
          <IoIosSearch />
        </div>

        <div className={styles.right}>
          <div className={styles.menu}>
            <p className={styles.menuText} onClick={() => navigate("/login")}>
              로그인
            </p>
          </div>

          <div className={styles.menu}>
            <p className={styles.menuText} onClick={() => navigate("/signup")}>
              회원가입
            </p>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Header;
