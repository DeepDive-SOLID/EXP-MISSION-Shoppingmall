import styles from "./Header.module.scss";
import { logo, logout } from "../../../assets/index";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { logout: logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser(); // AuthContext의 로그아웃 함수 사용
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
        <div className={styles.right} onClick={handleLogout}>
          <img src={logout} alt="Logout" className={styles.logoutIcon} />
          <p className={styles.logoutText}>로그아웃</p>
        </div>
      </header>
    </div>
  );
};

export default Header;
