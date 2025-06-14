import styles from "./Header.module.scss";
import { logo, logout } from "../../../assets/index";

const Header = () => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.left}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.right}>
          <img src={logout} alt="Logout" className={styles.logoutIcon} />
          <p className={styles.logoutText}>로그아웃</p>
        </div>
      </header>
    </div>
  );
};
export default Header;
