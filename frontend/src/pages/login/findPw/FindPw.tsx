import React, { useState } from "react";
import styles from "./Find.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../../assets";
import backIcon from "../../../assets/icons/back.svg";
import { authApi } from "../../../api/login/authApi";

// 비밀번호 유효성 검사 함수 (SignUp.tsx에서 가져옴)
function isValidPassword(password: string) {
  // 최소 8자, 숫자와 특수문자 포함
  return /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
    password,
  );
}

// 비밀번호 보이기/숨기기 아이콘 (SignUp.tsx에서 가져옴)
const EyeIcon = ({ visible }: { visible: boolean }) =>
  visible ? (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <ellipse cx="12" cy="12" rx="8" ry="5" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <ellipse cx="12" cy="12" rx="8" ry="5" />
      <circle cx="12" cy="12" r="2.5" />
      <line x1="4" y1="4" x2="20" y2="20" />
    </svg>
  );

const FindPw: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: 인증 정보
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [verificationError, setVerificationError] = useState("");

  // Step 2: 비밀번호 재설정 정보
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleTab = (idx: number) => {
    setTab(idx);
    if (idx === 0) {
      navigate("/find-id");
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim() || !email.trim()) {
      setVerificationError("아이디와 이메일을 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setVerificationError("");

    try {
      const result = await authApi.checkIdEmail({
        memberId: id.trim(),
        memberEmail: email.trim(),
      });

      if (result === "SUCCESS") {
        setIsVerified(true);
        setVerificationError("");
      } else {
        setVerificationError("일치하는 사용자 정보가 없습니다.");
      }
    } catch (error: unknown) {
      console.error("인증 오류:", error);
      setVerificationError("일치하는 사용자 정보가 없습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword) {
      setPasswordError("새 비밀번호를 입력해주세요.");
      return;
    }
    if (!isValidPassword(newPassword)) {
      setPasswordError(
        "비밀번호는 최소 8자 이상, 숫자와 특수문자를 포함해야 합니다.",
      );
      return;
    }

    setIsLoading(true);
    setPasswordError("");

    try {
      const result = await authApi.updatePassword({
        memberId: id,
        memberPw: newPassword,
      });

      if (result === "SUCCESS") {
        alert("비밀번호가 성공적으로 재설정되었습니다.");
        navigate("/login");
      } else {
        setPasswordError("비밀번호 재설정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("비밀번호 재설정 오류:", error);
      setPasswordError("비밀번호 재설정 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
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

        {!isVerified ? (
          // 1단계: 인증
          <form className={styles.form} onSubmit={handleVerification}>
            <div className={styles.inputGroup}>
              <label htmlFor="id">ID</label>
              <input
                id="id"
                type="text"
                placeholder="아이디를 입력하세요"
                value={id}
                onChange={e => {
                  // spacebar 방지: 아이디 필드에서 공백 제거
                  const processedValue = e.target.value.replace(/\s/g, "");
                  setId(processedValue);
                  setVerificationError("");
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={e => {
                  // spacebar 방지: 이메일 필드에서 공백 제거
                  const processedValue = e.target.value.replace(/\s/g, "");
                  setEmail(processedValue);
                  setVerificationError("");
                }}
              />
            </div>
            {verificationError && (
              <div className={styles.errorText}>{verificationError}</div>
            )}
            <button
              className={styles.button}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "확인 중..." : "인증하기"}
            </button>
          </form>
        ) : (
          // 2단계: 비밀번호 재설정
          <form className={styles.form} onSubmit={handlePasswordReset}>
            <div className={styles.inputGroup}>
              <label htmlFor="newPassword">새 비밀번호</label>
              <div className={styles.passwordInputWrapper}>
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="새 비밀번호 (8자 이상, 숫자, 특수문자 포함)"
                  value={newPassword}
                  onChange={e => {
                    // spacebar 방지: 새 비밀번호 필드에서 공백 제거
                    const processedValue = e.target.value.replace(/\s/g, "");
                    setNewPassword(processedValue);
                    setPasswordError("");
                  }}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowNewPassword(v => !v)}
                  tabIndex={-1}
                >
                  <EyeIcon visible={showNewPassword} />
                </button>
              </div>
            </div>
            {passwordError && (
              <div className={styles.errorText}>{passwordError}</div>
            )}
            <button
              className={styles.button}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "변경 중..." : "비밀번호 재설정"}
            </button>
          </form>
        )}

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
