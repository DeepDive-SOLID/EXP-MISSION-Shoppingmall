import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CardInfo.module.scss";
import { FiCreditCard, FiPlus } from "react-icons/fi";
import Header from "../../../../components/common/Header_login/Header";
import Sidebar from "../../../../components/common/Sidebar_mypage/Sidebar";
import samsungCard from "../../../../assets/images/samsung.jpg";
import kbCard from "../../../../assets/images/kb.jpg";
import nhCard from "../../../../assets/images/nh.jpg";
import kakaoCard from "../../../../assets/images/kakao.jpg";

interface CardItem {
  cardId: string;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cardImage: string;
}

const initialCards: CardItem[] = [
  {
    cardId: "1",
    cardName: "삼성카드",
    cardNumber: "3434-3412-1234-1234",
    expiryDate: "09/27",
    cardImage: samsungCard,
  },
  {
    cardId: "2",
    cardName: "국민카드",
    cardNumber: "3434-3456-5678-5678",
    expiryDate: "01/27",
    cardImage: kbCard,
  },
  {
    cardId: "3",
    cardName: "농협카드",
    cardNumber: "3020-8123-4567-8901",
    expiryDate: "08/26",
    cardImage: nhCard,
  },
  {
    cardId: "4",
    cardName: "카카오뱅크",
    cardNumber: "3333-1234-5678-9012",
    expiryDate: "10/27",
    cardImage: kakaoCard,
  },
];

const CardInfo = () => {
  const navigate = useNavigate();
  const userName = "사용자";
  const [cards, setCards] = useState(initialCards);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

  const handleAddCard = () => {
    navigate("/mypage/card-add");
  };

  const handleDeleteCard = (card: CardItem) => {
    setSelectedCard(card);
    setShowDeleteModal(true);
  };

  const confirmDeleteCard = () => {
    if (selectedCard) {
      setCards(prevCards =>
        prevCards.filter(card => card.cardId !== selectedCard.cardId),
      );
      setShowDeleteModal(false);
      setSelectedCard(null);
      alert("카드가 삭제되었습니다.");
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setSelectedCard(null);
  };

  const maskCardNumber = (cardNumber: string) => {
    // 4자리-4자리-4자리-4자리 형식
    const parts = cardNumber.split("-");

    if (parts.length !== 4) {
      return cardNumber; // 형식이 맞지 않으면 원본 반환
    }

    return `${parts[0]}-${parts[1].substring(0, 2)}**-****-****`;
  };

  return (
    <div className={styles.cardInfoPage}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar userName={userName} />
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
                  <div key={card.cardId} className={styles.cardItem}>
                    <img
                      src={card.cardImage}
                      alt={card.cardName}
                      className={styles.cardImage}
                    />
                    <div className={styles.cardDetails}>
                      <span className={styles.cardName}>{card.cardName}</span>
                      <span className={styles.cardNumber}>
                        {maskCardNumber(card.cardNumber)}
                      </span>
                      <span className={styles.cardExpiry}>
                        ({card.expiryDate})
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
              <strong>{selectedCard.cardName}</strong> 카드를 삭제하시겠습니까?
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
