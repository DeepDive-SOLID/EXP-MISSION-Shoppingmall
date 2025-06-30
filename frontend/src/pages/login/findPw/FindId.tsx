import React, { useState } from "react";
import styles from "./Find.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../../assets";
import backIcon from "../../../assets/icons/back.svg";
import { authApi } from "../../../api/login/authApi";

const FindId: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [foundId, setFoundId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState(0);

  const handleTab = (idx: number) => {
    setTab(idx);
    if (idx === 1) {
      navigate("/find-pw");
    }
  };

  const handleFindId = async () => {
    if (!email.trim()) {
      setError("이메일을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setFoundId("");
    setError("");

    try {
      const memberId = await authApi.findId({ memberEmail: email });
      setFoundId(memberId);
    } catch (err) {
      setError("일치하는 사용자가 없습니다.");
      console.error("아이디 찾기 오류:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // spacebar 방지: 이메일 필드에서 공백 제거
    const processedValue = e.target.value.replace(/\s/g, "");
    setEmail(processedValue);
    setFoundId("");
    setError("");
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
        <img
          src={logo}
          alt="로고"
          className={styles.logo}
          onClick={() => navigate("/")}
        />
        <div className={styles.tabs}>
          <div
            className={
              tab === 0 ? `${styles.tab} ${styles.active}` : styles.tab
            }
            onClick={() => handleTab(0)}
            role="button"
            tabIndex={0}
          >
            아이디 찾기
          </div>
          <div
            className={
              tab === 1 ? `${styles.tab} ${styles.active}` : styles.tab
            }
            onClick={() => handleTab(1)}
            role="button"
            tabIndex={0}
          >
            비밀번호 찾기
          </div>
        </div>
        <form
          className={styles.form}
          onSubmit={e => {
            e.preventDefault();
            handleFindId();
          }}
        >
          <div className={styles.inputGroup}>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={handleEmailChange}
              className={error ? styles.inputError : ""}
            />
            {error && <div className={styles.errorText}>{error}</div>}
          </div>
          {foundId && (
            <div className={styles.inputGroup}>
              <label htmlFor="id">ID</label>
              <div className={styles["id-box"]}>{foundId}</div>
            </div>
          )}
          <button className={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? "확인 중..." : "아이디 찾기"}
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

export default FindId;
