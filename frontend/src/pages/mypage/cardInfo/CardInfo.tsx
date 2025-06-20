import React, { useState } from "react";
import styles from "./CardInfo.module.scss";
import { FiCreditCard, FiPlus, FiX } from "react-icons/fi";
import Header from "../../../components/common/Header_login/Header";
import Sidebar from "../../../components/common/Sidebar_mypage/Sidebar";
import samsungCard from "../../../assets/images/samsung.jpg";
import kbCard from "../../../assets/images/kb.jpg";
import nhCard from "../../../assets/images/nh.jpg";
import kakaoCard from "../../../assets/images/kakao.jpg";

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
    cardNumber: "302-0812-3456-78",
    expiryDate: "08/26",
    cardImage: nhCard,
  },
  {
    cardId: "4",
    cardName: "카카오뱅크",
    cardNumber: "3333-12-3456789",
    expiryDate: "10/27",
    cardImage: kakaoCard,
  },
];

const CardInfo = () => {
  const userName = "사용자";
  const [cards, setCards] = useState(initialCards);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

  const [newCard, setNewCard] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
  });

  const handleAddCard = () => {
    setShowAddModal(true);
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
    setShowAddModal(false);
    setShowDeleteModal(false);
    setSelectedCard(null);
    setNewCard({
      cardName: "",
      cardNumber: "",
      expiryDate: "",
    });
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCard.cardName || !newCard.cardNumber || !newCard.expiryDate) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 카드번호 형식 검사 - 하이픈으로 구분된 숫자 그룹 허용
    const cardNumberRegex = /^\d+(?:-\d+)*$/;
    if (!cardNumberRegex.test(newCard.cardNumber)) {
      alert("카드번호 형식이 올바르지 않습니다. (예: 1234-1234-1234-1234)");
      return;
    }

    const expiryDateRegex = /^\d{2}\/\d{2}$/;
    if (!expiryDateRegex.test(newCard.expiryDate)) {
      alert("만료일 형식이 올바르지 않습니다. (MM/YY)");
      return;
    }

    const newCardItem: CardItem = {
      cardId: Date.now().toString(),
      cardName: newCard.cardName,
      cardNumber: newCard.cardNumber,
      expiryDate: newCard.expiryDate,
      cardImage: samsungCard, // 새 카드는 기본 이미지 사용
    };

    setCards(prevCards => [...prevCards, newCardItem]);
    closeModal();
    alert("카드가 추가되었습니다.");
  };

  const handleInputChange = (field: string, value: string) => {
    setNewCard(prev => ({ ...prev, [field]: value }));
  };

  const maskCardNumber = (cardNumber: string) => {
    const parts = cardNumber.split("-");

    // 하이픈으로 구분되지 않았거나, 매우 짧은 경우 원본 반환
    if (parts.length < 2) {
      return cardNumber;
    }

    const maskedParts = [];

    // 첫 번째 부분: 모두 노출
    maskedParts.push(parts[0]);

    // 두 번째 부분: 앞 2자리만 노출
    const secondPart = parts[1];
    const visibleSecond = secondPart.substring(0, 2);
    const maskedSecond = "*".repeat(Math.max(0, secondPart.length - 2));
    maskedParts.push(visibleSecond + maskedSecond);

    // 세 번째 부분부터: 모두 마스킹
    for (let i = 2; i < parts.length; i++) {
      maskedParts.push("*".repeat(parts[i].length));
    }

    return maskedParts.join("-");
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

      {showAddModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>카드 추가</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label htmlFor="cardName">카드 별칭</label>
                <input
                  type="text"
                  id="cardName"
                  value={newCard.cardName}
                  onChange={e => handleInputChange("cardName", e.target.value)}
                  placeholder="예: 내 체크카드"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="cardNumber">카드번호</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={newCard.cardNumber}
                  onChange={e =>
                    handleInputChange("cardNumber", e.target.value)
                  }
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="expiryDate">만료일</label>
                <input
                  type="text"
                  id="expiryDate"
                  value={newCard.expiryDate}
                  onChange={e =>
                    handleInputChange("expiryDate", e.target.value)
                  }
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={closeModal}
                >
                  취소
                </button>
                <button type="submit" className={styles.submitButton}>
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
