import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.scss";
import { logo } from "../../../assets/index";
import { authApi } from "../../../api/login/authApi";

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

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    memberId: "",
    memberPw: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // spacebar 방지: 아이디와 비밀번호 필드에서 공백 제거
    const processedValue =
      name === "memberId" || name === "memberPw"
        ? value.replace(/\s/g, "")
        : value;

    setFormData(prev => ({ ...prev, [name]: processedValue }));
    if (name === "memberId") setIdError("");
    if (name === "memberPw") setPwError("");
    setSubmitError(""); // 제출 에러도 초기화
  };

  const validateForm = () => {
    let valid = true;

    if (!formData.memberId.trim()) {
      setIdError("아이디를 입력하세요");
      valid = false;
    }

    if (!formData.memberPw) {
      setPwError("비밀번호를 입력하세요");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      const token = await authApi.signIn(formData);

      // JWT 토큰을 localStorage에 저장
      localStorage.setItem("token", token);

      // 로그인 성공 시 홈페이지로 이동
      alert("로그인에 성공했습니다!");
      navigate("/");
    } catch (error: unknown) {
      console.error("로그인 오류:", error);

      // 에러 메시지 처리
      if (error && typeof error === "object" && "response" in error) {
        const errorResponse = error as {
          response: { status: number; data: string };
        };
        const { status, data } = errorResponse.response;

        if (status === 401) {
          if (data.includes("존재하지 않는 사용자")) {
            setIdError("존재하지 않는 사용자입니다.");
          } else if (data.includes("비밀번호가 일치하지 않습니다")) {
            setPwError("비밀번호가 일치하지 않습니다.");
          } else {
            setSubmitError("아이디 또는 비밀번호가 올바르지 않습니다.");
          }
        } else if (status === 500) {
          setSubmitError(
            "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
          );
        } else {
          setSubmitError("로그인 중 오류가 발생했습니다.");
        }
      } else {
        setSubmitError(
          "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.signInContainer}>
        <img src={logo} alt="로고" className={styles.logo} />
        <h1 className={styles.title}>계정에 로그인하세요</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>ID</label>
            <input
              className={`${styles.input} ${idError ? styles.inputError : ""}`}
              type="text"
              name="memberId"
              placeholder="ID를 입력하세요"
              value={formData.memberId}
              onChange={handleChange}
              required
            />
            {idError && <div className={styles.fieldError}>{idError}</div>}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>비밀번호</label>
            <div className={styles.passwordInputWrapper}>
              <input
                className={`${styles.input} ${pwError ? styles.inputError : ""}`}
                type={showPassword ? "text" : "password"}
                name="memberPw"
                placeholder="비밀번호를 입력하세요"
                value={formData.memberPw}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
            {pwError && <div className={styles.fieldError}>{pwError}</div>}
          </div>
          <Link to="/find-id" className={styles.forgotPwLink}>
            비밀번호를 잊으셨나요?
          </Link>
          {submitError && (
            <div className={styles.submitError}>{submitError}</div>
          )}
          <button className={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>
        <div className={styles.signUpGuide}>
          계정이 없으신가요?{" "}
          <Link to="/signup" className={styles.signUpLink}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
