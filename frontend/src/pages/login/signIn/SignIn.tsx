import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignIn.module.scss";
import { logo } from "../../../assets/index";

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
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "id") setIdError("");
    if (name === "password") setPwError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!formData.id) {
      setIdError("아이디를 입력하세요");
      valid = false;
    }
    if (!formData.password) {
      setPwError("비밀번호를 입력하세요");
      valid = false;
    }
    if (!valid) return;
    // TODO: 로그인 처리
    console.log("로그인 시도:", formData);
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
              className={styles.input}
              type="text"
              name="id"
              placeholder="ID를 입력하세요"
              value={formData.id}
              onChange={handleChange}
              required
            />
            {idError && <div className={styles.inputError}>{idError}</div>}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>비밀번호</label>
            <div className={styles.passwordInputWrapper}>
              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
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
            {pwError && <div className={styles.inputError}>{pwError}</div>}
          </div>
          <Link to="/find-pw" className={styles.forgotPwLink}>
            비밀번호를 잊으셨나요?
          </Link>
          <button className={styles.button} type="submit">
            로그인
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
