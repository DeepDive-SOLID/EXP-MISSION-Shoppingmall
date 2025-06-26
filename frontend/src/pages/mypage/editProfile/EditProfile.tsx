import React, { useState } from "react";
import styles from "./EditProfile.module.scss";
import Header from "../../../components/common/Header_login/Header";
import Sidebar from "../../../components/common/Sidebar_mypage/Sidebar";
import profileImg from "../../../assets/images/profile1.jpg";

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

const EditProfile = () => {
  const userName = "사용자";
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    birth: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);

  // 전화번호 형식 검증 함수
  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  // 이메일 형식 검증 함수
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호 형식 검증 함수
  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
    return passwordRegex.test(password);
  };

  // 생년월일 검증 함수
  const validateBirthDate = (birth: string): boolean => {
    const selectedDate = new Date(birth);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // 오늘 날짜의 마지막 시간으로 설정
    return selectedDate <= today;
  };

  // 폼 검증 함수
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // 이름 검증
    if (!form.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    // 이메일 검증
    if (!form.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    // 전화번호 검증
    if (!form.phone.trim()) {
      newErrors.phone = "전화번호를 입력해주세요.";
    } else if (!validatePhoneNumber(form.phone)) {
      newErrors.phone = "전화번호는 010-XXXX-XXXX 형식으로 입력해주세요.";
    }

    // 비밀번호 검증
    if (!form.password.trim()) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (!validatePassword(form.password)) {
      newErrors.password = "최소 8자 이상, 숫자와 특수문자 포함";
    }

    // 생년월일 검증
    if (!form.birth) {
      newErrors.birth = "생년월일을 입력해주세요.";
    } else if (!validateBirthDate(form.birth)) {
      newErrors.birth = "생년월일은 오늘 이후 날짜를 입력할 수 없습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // spacebar 방지: 이메일, 전화번호, 비밀번호 필드에서 공백 제거
    const processedValue =
      name === "email" || name === "phone" || name === "password"
        ? value.replace(/\s/g, "")
        : value;

    setForm(prev => ({ ...prev, [name]: processedValue }));

    // 실시간 검증 (에러가 있을 때만)
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // 저장 로직
    alert("회원정보가 저장되었습니다.");
  };

  const handleWithdraw = () => {
    setShowWithdrawModal(true);
  };

  const handleWithdrawConfirm = () => {
    setShowWithdrawModal(false);
    setShowFinalConfirm(true);
  };

  const handleFinalWithdraw = () => {
    // TODO: 실제 회원 탈퇴 API 호출
    // const withdrawUser = async () => {
    //   try {
    //     await api.delete('/user/withdraw');
    //     // 탈퇴 성공 처리
    //   } catch (error) {
    //     console.error('회원 탈퇴 실패:', error);
    //     alert('회원 탈퇴 중 오류가 발생했습니다.');
    //     return;
    //   }
    // };

    // 탈퇴 완료 후 처리
    alert("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");

    // TODO: 로그아웃 처리 및 홈페이지로 리다이렉트
    // localStorage.removeItem('token');
    // window.location.href = "/";

    setShowFinalConfirm(false);
  };

  const handleCancelWithdraw = () => {
    setShowWithdrawModal(false);
    setShowFinalConfirm(false);
  };

  return (
    <div className={styles.editProfilePage}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar userName={userName} />
        <div className={styles.profileFormContainer}>
          <form className={styles.profileForm} onSubmit={handleSave}>
            <div className={styles.profileSection}>
              <div className={styles.profileImageBox}>
                <img
                  src={profileImg}
                  alt="프로필"
                  className={styles.profileImage}
                />
              </div>
              <div className={styles.profileActions}>
                <button type="button" className={styles.changePictureButton}>
                  프로필 사진 변경
                </button>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>이름 *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                className={errors.name ? styles.errorInput : ""}
              />
              {errors.name && (
                <span className={styles.errorMessage}>{errors.name}</span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label>이메일 *</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
                type="email"
                className={errors.email ? styles.errorInput : ""}
              />
              {errors.email && (
                <span className={styles.errorMessage}>{errors.email}</span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label>전화번호 *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="010-XXXX-XXXX"
                type="tel"
                className={errors.phone ? styles.errorInput : ""}
              />
              {errors.phone && (
                <span className={styles.errorMessage}>{errors.phone}</span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label>비밀번호 *</label>
              <div className={styles.passwordInputWrapper}>
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="비밀번호를 입력하세요"
                  type={showPassword ? "text" : "password"}
                  className={errors.password ? styles.errorInput : ""}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                  aria-label={
                    showPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                  }
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>
              {errors.password && (
                <span className={styles.errorMessage}>{errors.password}</span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label>생년월일 *</label>
              <input
                name="birth"
                value={form.birth}
                onChange={handleChange}
                placeholder="생년월일을 입력하세요"
                type="date"
                className={errors.birth ? styles.errorInput : ""}
              />
              {errors.birth && (
                <span className={styles.errorMessage}>{errors.birth}</span>
              )}
            </div>
            <button className={styles.saveButton} type="submit">
              저장하기
            </button>
            <button
              type="button"
              className={styles.withdrawButton}
              onClick={handleWithdraw}
            >
              회원 탈퇴
            </button>
          </form>
        </div>
      </div>

      {/* 회원 탈퇴 확인 모달 */}
      {showWithdrawModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>회원 탈퇴 확인</h3>
            <p>정말로 회원 탈퇴를 하시겠습니까?</p>
            <p>
              탈퇴 시{" "}
              <span className={styles.warningText}>
                모든 개인정보와 주문 내역이 삭제
              </span>
              되며,{" "}
              <span className={styles.warningText}>복구할 수 없습니다.</span>
            </p>
            <div className={styles.modalButtons}>
              <button
                onClick={handleWithdrawConfirm}
                className={styles.confirmButton}
              >
                탈퇴하기
              </button>
              <button
                onClick={handleCancelWithdraw}
                className={styles.cancelButton}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 최종 확인 모달 */}
      {showFinalConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>최종 확인</h3>
            <p>회원 탈퇴를 진행하시겠습니까?</p>
            <p>이 작업은 되돌릴 수 없습니다.</p>
            <div className={styles.modalButtons}>
              <button
                onClick={handleFinalWithdraw}
                className={styles.confirmButton}
              >
                탈퇴 완료
              </button>
              <button
                onClick={handleCancelWithdraw}
                className={styles.cancelButton}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
