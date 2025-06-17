import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignUp.module.scss";
import { logo } from "../../../assets/index";

const EyeIcon = ({ visible }: { visible: boolean }) =>
  visible ? (
    // eye open
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
    // eye closed (eye-off)
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

function isValidPassword(password: string) {
  // 최소 8자, 숫자와 특수문자 포함
  return /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
    password,
  );
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    password: "",
    email: "",
    phone: "",
    birthDate: "",
  });
  const [agree, setAgree] = useState(false);
  const [idChecked, setIdChecked] = useState(false);
  const [idError, setIdError] = useState("");
  const [idSuccess, setIdSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordValid = isValidPassword(formData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (name === "id") {
      setIdChecked(false);
      setIdError("");
      setIdSuccess(false);
    }
  };

  // 임시 중복확인 로직 ("testuser"는 중복)
  const handleIdCheck = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.id) return;
    if (formData.id === "testuser") {
      setIdChecked(false);
      setIdError("이미 등록된 아이디 입니다.");
      setIdSuccess(false);
    } else {
      setIdChecked(true);
      setIdError("");
      setIdSuccess(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree || !idChecked || !passwordValid) return;
    // TODO: Implement signup logic
    console.log("Form submitted:", formData);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.signUpContainer}>
        <img src={logo} alt="로고" className={styles.logo} />
        <h1 className={styles.title}>계정을 만들어 시작하세요</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>이름</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="이름을 입력해주세요"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>ID</label>
            <div className={styles.idInputWrapper}>
              <input
                className={`${styles.input} ${styles.inputWithButton}`}
                type="text"
                name="id"
                placeholder="ID를 입력해주세요"
                value={formData.id}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className={styles.idCheckBtn}
                onClick={handleIdCheck}
                disabled={!formData.id}
              >
                중복확인
              </button>
            </div>
            {idError && <div className={styles.idError}>{idError}</div>}
            {idSuccess && (
              <div className={styles.idSuccess}>사용 가능한 아이디 입니다.</div>
            )}
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
            {!passwordValid && formData.password && (
              <div className={styles.passwordError}>
                최소 8자 이상, 숫자와 특수문자 포함
              </div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>이메일</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>전화번호</label>
            <input
              className={styles.input}
              type="tel"
              name="phone"
              placeholder="전화번호를 입력해주세요"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>생년월일</label>
            <input
              className={styles.input}
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>
          <div
            className={styles.inputGroup}
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          >
            <label className={styles.agreeLabel}>
              <input
                type="checkbox"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                style={{ marginRight: "0.5rem" }}
                required
              />
              이용약관과 개인정보 처리방침에 동의합니다
            </label>
          </div>
          <button
            className={styles.button}
            type="submit"
            disabled={!agree || !idChecked || !passwordValid}
          >
            가입하기
          </button>
        </form>
        <div className={styles.loginLink}>
          이미 계정이 있으신가요?
          <Link to="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
