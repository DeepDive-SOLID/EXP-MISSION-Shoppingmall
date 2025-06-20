import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignUp.module.scss";
import { logo } from "../../../assets/index";
import { authApi } from "../../../api/login/authApi";

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
    memberName: "",
    memberId: "",
    memberPw: "",
    memberEmail: "",
    memberPhone: "",
    memberBirth: "",
    authId: "USER", // 기본 권한 설정
  });
  const [agree, setAgree] = useState(false);
  const [idChecked, setIdChecked] = useState(false);
  const [idError, setIdError] = useState("");
  const [idSuccess, setIdSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // 필드별 에러 상태 추가
  const [fieldErrors, setFieldErrors] = useState({
    memberName: "",
    memberId: "",
    memberPw: "",
    memberEmail: "",
    memberPhone: "",
    memberBirth: "",
  });

  const passwordValid = isValidPassword(formData.memberPw);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // 필드 에러 초기화
    setFieldErrors(prev => ({
      ...prev,
      [name]: "",
    }));

    if (name === "memberId") {
      setIdChecked(false);
      setIdError("");
      setIdSuccess(false);
    }
  };

  // 아이디 중복 확인
  const handleIdCheck = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.memberId) return;

    setIsCheckingId(true);
    setIdError("");
    setIdSuccess(false);

    try {
      const isDuplicate = await authApi.checkId({
        memberId: formData.memberId,
      });

      if (isDuplicate) {
        setIdChecked(false);
        setIdError("이미 등록된 아이디 입니다.");
        setIdSuccess(false);
      } else {
        setIdChecked(true);
        setIdError("");
        setIdSuccess(true);
      }
    } catch (error) {
      console.error("아이디 중복 확인 오류:", error);
      setIdError("아이디 중복 확인 중 오류가 발생했습니다.");
      setIdSuccess(false);
    } finally {
      setIsCheckingId(false);
    }
  };

  // 폼 유효성 검사 함수
  const validateForm = () => {
    const errors = {
      memberName: "",
      memberId: "",
      memberPw: "",
      memberEmail: "",
      memberPhone: "",
      memberBirth: "",
    };

    if (!formData.memberName.trim()) {
      errors.memberName = "이름을 입력해주세요";
    }

    if (!formData.memberId.trim()) {
      errors.memberId = "아이디를 입력해주세요";
    } else if (!idChecked) {
      errors.memberId = "아이디 중복확인을 해주세요";
    }

    if (!formData.memberPw) {
      errors.memberPw = "비밀번호를 입력해주세요";
    } else if (!passwordValid) {
      errors.memberPw =
        "비밀번호는 최소 8자 이상, 숫자와 특수문자를 포함해야 합니다";
    }

    if (!formData.memberEmail.trim()) {
      errors.memberEmail = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.memberEmail)) {
      errors.memberEmail = "올바른 이메일 형식을 입력해주세요";
    }

    if (!formData.memberPhone.trim()) {
      errors.memberPhone = "전화번호를 입력해주세요";
    }

    if (!formData.memberBirth) {
      errors.memberBirth = "생년월일을 선택해주세요";
    }

    setFieldErrors(errors);
    return !Object.values(errors).some(error => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 유효성 검사
    if (!validateForm()) {
      return;
    }

    if (!agree) {
      alert("이용약관에 동의해주세요.");
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      const response = await authApi.signUp(formData);

      if (response === "SUCCESS") {
        alert("회원가입이 완료되었습니다!");
        // 로그인 페이지로 이동
        window.location.href = "/login";
      } else {
        setSubmitError(response || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      setSubmitError("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
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
              className={`${styles.input} ${fieldErrors.memberName ? styles.inputError : ""}`}
              type="text"
              name="memberName"
              placeholder="이름을 입력해주세요"
              value={formData.memberName}
              onChange={handleChange}
              required
            />
            {fieldErrors.memberName && (
              <div className={styles.fieldError}>{fieldErrors.memberName}</div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>ID</label>
            <div className={styles.idInputWrapper}>
              <input
                className={`${styles.input} ${styles.inputWithButton} ${fieldErrors.memberId ? styles.inputError : ""}`}
                type="text"
                name="memberId"
                placeholder="ID를 입력해주세요"
                value={formData.memberId}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className={styles.idCheckBtn}
                onClick={handleIdCheck}
                disabled={!formData.memberId || isCheckingId}
              >
                {isCheckingId ? "확인중..." : "중복확인"}
              </button>
            </div>
            {fieldErrors.memberId && (
              <div className={styles.fieldError}>{fieldErrors.memberId}</div>
            )}
            {idError && <div className={styles.idError}>{idError}</div>}
            {idSuccess && (
              <div className={styles.idSuccess}>사용 가능한 아이디 입니다.</div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>비밀번호</label>
            <div className={styles.passwordInputWrapper}>
              <input
                className={`${styles.input} ${fieldErrors.memberPw ? styles.inputError : ""}`}
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
            {fieldErrors.memberPw && (
              <div className={styles.fieldError}>{fieldErrors.memberPw}</div>
            )}
            {!passwordValid && formData.memberPw && !fieldErrors.memberPw && (
              <div className={styles.passwordError}>
                최소 8자 이상, 숫자와 특수문자 포함
              </div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>이메일</label>
            <input
              className={`${styles.input} ${fieldErrors.memberEmail ? styles.inputError : ""}`}
              type="email"
              name="memberEmail"
              placeholder="이메일을 입력해주세요"
              value={formData.memberEmail}
              onChange={handleChange}
              required
            />
            {fieldErrors.memberEmail && (
              <div className={styles.fieldError}>{fieldErrors.memberEmail}</div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>전화번호</label>
            <input
              className={`${styles.input} ${fieldErrors.memberPhone ? styles.inputError : ""}`}
              type="tel"
              name="memberPhone"
              placeholder="전화번호를 입력해주세요"
              value={formData.memberPhone}
              onChange={handleChange}
              required
            />
            {fieldErrors.memberPhone && (
              <div className={styles.fieldError}>{fieldErrors.memberPhone}</div>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>생년월일</label>
            <input
              className={`${styles.input} ${fieldErrors.memberBirth ? styles.inputError : ""}`}
              type="date"
              name="memberBirth"
              value={formData.memberBirth}
              onChange={handleChange}
              required
            />
            {fieldErrors.memberBirth && (
              <div className={styles.fieldError}>{fieldErrors.memberBirth}</div>
            )}
          </div>
          <div className={`${styles.inputGroup} ${styles.agreeGroup}`}>
            <label className={styles.agreeLabel}>
              <input
                type="checkbox"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                required
              />
              이용약관과 개인정보 처리방침에 동의합니다
            </label>
          </div>
          {submitError && (
            <div className={styles.submitError}>{submitError}</div>
          )}
          <button className={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? "가입중..." : "가입하기"}
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
