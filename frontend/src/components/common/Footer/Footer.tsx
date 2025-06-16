import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <h3 className={styles.logo}>KOREA_TRIP</h3>
          <p className={styles.copy}>
            © 2025 KOREA_TRIP. All rights reserved.
          </p>
        </div>

        <div className={styles.linkSection}>
          <p>이용약관</p>
          <p>개인정보처리방침</p>
          <p>고객센터</p>
          <p>자주 묻는 질문</p>
          <p>1:1 문의</p>
        </div>

        <div className={styles.infoSection}>
          <p>사업자등록번호: 123-45-67890</p>
          <p>대표 : SOLID</p>
          <p>이메일: solid@koreatrip.com</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
