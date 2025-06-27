import styles from "./Header.module.scss";
import { logo, logout } from "../../../assets/index";
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
        <div className={styles.right} onClick={() => navigate("/")}>
          <img src={logout} alt="Logout" className={styles.logoutIcon} />
          <p className={styles.logoutText}>로그아웃</p>
        </div>
      </header>
    </div>
  );
};
export default Header;
