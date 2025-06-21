import styles from "./Header.module.scss";
import { logo } from "../../../assets/index";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.left}>
          <img src={logo} alt="Logo" className={styles.logo} />
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
            <p className={styles.menuText}>로그인</p>
          </div>

          <div className={styles.menu}>
            <p className={styles.menuText}>회원가입</p>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Header;
