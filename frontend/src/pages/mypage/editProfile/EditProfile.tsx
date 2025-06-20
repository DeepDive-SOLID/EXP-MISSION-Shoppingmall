import React, { useState } from "react";
import styles from "./EditProfile.module.scss";
import Header from "../../../components/common/Header_login/Header";
import Sidebar from "../../../components/common/Sidebar_mypage/Sidebar";
import profileImg from "../../../assets/images/profile1.jpg";

const EditProfile = () => {
  const userName = "사용자";
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    birth: "",
  });

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
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
              <label>이름</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>이메일</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
                type="email"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>전화번호</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="전화번호를 입력하세요"
                type="tel"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>비밀번호</label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                type="password"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>생년월일</label>
              <input
                name="birth"
                value={form.birth}
                onChange={handleChange}
                placeholder="생년월일을 입력하세요"
                type="date"
              />
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
