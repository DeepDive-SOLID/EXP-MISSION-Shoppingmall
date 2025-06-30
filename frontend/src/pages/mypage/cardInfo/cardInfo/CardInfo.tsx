import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CardInfo.module.scss";
import { FiCreditCard, FiPlus } from "react-icons/fi";
import Header from "../../../../components/common/Header/Header";
import Sidebar from "../../../../components/common/Sidebar_mypage/Sidebar";
import { getPaymentList, deleteCard } from "../../../../api/mypage/cardApi";
import { CardInfo } from "../../../../types/mypage/card";
import { useAuth } from "../../../../contexts/AuthContext";

const CardInfo = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth(); // 현재 로그인한 사용자 정보 가져오기
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // 현재 로그인한 사용자의 memberId 사용
  const memberId = userInfo?.memberId;

  // 카드 리스트 조회
  useEffect(() => {
    const fetchCards = async () => {
      if (!memberId) {
        setLoading(false);
        return;
      }

      try {
        const paymentList = await getPaymentList(memberId);
        setCards(paymentList);
      } catch (error) {
        console.error("카드 리스트 조회 에러:", error);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [memberId]);

  const handleAddCard = () => {
    navigate("/mypage/card-add");
  };

  const handleDeleteCard = (card: CardInfo) => {
    setSelectedCard(card);
    setShowDeleteModal(true);
  };

  const confirmDeleteCard = async () => {
    if (selectedCard) {
      try {
        const res = await deleteCard(selectedCard.paymentId);
        if (res === "SUCCESS") {
          setCards(prevCards =>
            prevCards.filter(card => card.paymentId !== selectedCard.paymentId),
          );
          setShowDeleteModal(false);
          setSelectedCard(null);
          alert("카드가 삭제되었습니다.");
        } else {
          alert("카드 삭제에 실패했습니다.");
        }
      } catch {
        alert("카드 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setSelectedCard(null);
  };

  const maskCardNumber = (cardNumber: string) => {
    // 문자열을 4자리씩 나누기
    if (cardNumber.length !== 16) {
      return cardNumber; // 16자리가 아니면 원본 반환
    }

    const parts = [
      cardNumber.substring(0, 4),
      cardNumber.substring(4, 8),
      cardNumber.substring(8, 12),
      cardNumber.substring(12, 16),
    ];

    return `${parts[0]}-${parts[1].substring(0, 2)}**-****-****`;
  };

  const formatExpiryDate = (expiryDate: string) => {
    // "YYYY-MM" 형식을 "MM/YY" 형식으로 변환
    if (expiryDate && expiryDate.includes("-")) {
      const [year, month] = expiryDate.split("-");
      return `${month}/${year.substring(2)}`;
    }
    return expiryDate;
  };

  if (loading) {
    return (
      <div className={styles.cardInfoPage}>
        <Header />
        <div className={styles.mainContent}>
          <Sidebar />
          <div className={styles.cardInfoContainer}>
            <div className={styles.cardInfoForm}>
              <div className={styles.pageHeader}>
                <h1>카드 관리</h1>
              </div>
              <div className={styles.loadingState}>
                <p>카드 정보를 불러오는 중...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardInfoPage}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.cardInfoContainer}>
          <div className={styles.cardInfoForm}>
            <div className={styles.pageHeader}>
              <h1>카드 관리</h1>
              <button className={styles.addButton} onClick={handleAddCard}>
                <FiPlus /> 카드 추가
              </button>
            </div>

            <div className={styles.cardList}>
              {cards.length === 0 ? (
                <div className={styles.emptyState}>
                  <FiCreditCard className={styles.emptyIcon} />
                  <p>등록된 카드가 없습니다</p>
                  <button
                    className={styles.addFirstButton}
                    onClick={handleAddCard}
                  >
                    첫 번째 카드 추가하기
                  </button>
                </div>
              ) : (
                cards.map(card => (
                  <div key={card.paymentId} className={styles.cardItem}>
                    <img
                      src={card.paymentImg}
                      alt={card.paymentName}
                      className={styles.cardImage}
                    />
                    <div className={styles.cardDetails}>
                      <span className={styles.cardName}>
                        {card.paymentName}
                      </span>
                      <span className={styles.cardNumber}>
                        {maskCardNumber(card.paymentNum)}
                      </span>
                      <span className={styles.cardExpiry}>
                        ({formatExpiryDate(card.paymentEndDt)})
                      </span>
                    </div>
                    <div className={styles.cardActions}>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteCard(card)}
                      >
                        카드 삭제
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && selectedCard && (
        <div className={styles.deleteModal}>
          <div className={styles.modalContent}>
            <h2>카드 삭제</h2>
            <p className={styles.deleteWarning}>
              <strong>{selectedCard.paymentName}</strong> 카드를
              삭제하시겠습니까?
            </p>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={closeModal}>
                취소
              </button>
              <button
                className={styles.confirmDeleteButton}
                onClick={confirmDeleteCard}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardInfo;
