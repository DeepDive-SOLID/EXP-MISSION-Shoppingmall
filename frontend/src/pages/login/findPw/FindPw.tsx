import React, { useState } from "react";
import styles from "./Find.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../../assets";
import backIcon from "../../../assets/icons/back.svg";

const FindPw: React.FC = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [foundPw, setFoundPw] = useState("");
  const [tab, setTab] = useState(1);

  const handleTab = (idx: number) => {
    setTab(idx);
    if (idx === 0) {
      navigate("/find-id"); // 아이디 찾기 경로로 이동
    }
  };

  const handleFindPw = () => {
    if (id === "testuser" && email === "test@example.com") {
      setFoundPw("password1234");
    } else {
      setFoundPw("일치하는 사용자가 없습니다");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.findPwContainer}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate("/login")}
          aria-label="뒤로가기"
        >
          <img
            src={backIcon}
            alt="뒤로가기"
            style={{ width: 28, height: 28 }}
          />
        </button>
        <img src={logo} alt="로고" className={styles.logo} />
        <div className={styles.tabs}>
          <div
            className={
              tab === 0 ? `${styles.tab} ${styles.active}` : styles.tab
            }
            onClick={() => handleTab(0)}
          >
            아이디 찾기
          </div>
          <div
            className={
              tab === 1 ? `${styles.tab} ${styles.active}` : styles.tab
            }
            onClick={() => handleTab(1)}
          >
            비밀번호 찾기
          </div>
        </div>
        <form
          className={styles.form}
          onSubmit={e => {
            e.preventDefault();
            handleFindPw();
          }}
        >
          <div className={styles.inputGroup}>
            <label htmlFor="id">ID</label>
            <input
              id="id"
              type="text"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={e => setId(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          {foundPw && (
            <div className={styles.inputGroup}>
              <label htmlFor="pw">비밀번호</label>
              <div className={styles["id-box"]}>{foundPw}</div>
            </div>
          )}
          <button className={styles.button} type="submit">
            비밀번호 찾기
          </button>
        </form>
        <div className={styles["bottom-text"]}>
          계정이 없으신가요?
          <Link to="/signup" className={styles.signup}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FindPw;
