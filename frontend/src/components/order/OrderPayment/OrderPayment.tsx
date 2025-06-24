import { useForm } from "react-hook-form";
import styles from "./OrderPayment.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import AddCard from "../AddCard/AddCard";

interface FormData {
  name: string;
  birthYear: string;
  birthMonth: string;
  phone: string;
  emailId: string;
  emailDomain: string;
  address: string;
  detailAddress: string;
}

const OrderPayment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [selectedCard, setSelectedCard] = useState<number | null>(0);

  const onSubmit = (data: FormData) => {
    console.log("입력된 정보:", data);
  };

  const handleCardSelect = (index: number) => {
    setSelectedCard(index);
  };

  const [showAddCard, setShowAddCard] = useState(false);
  const openAddCardModal = () => setShowAddCard(true);
  const closeAddCardModal = () => setShowAddCard(false);

  return (
    <div className={styles.paymentWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.infoSection}>
        <h3 className={styles.sectionTitle}>여행자 정보 입력</h3>

        <div className={styles.formRow}>
          <label>이름</label>
          <input
            {...register("name", { required: "이름은 필수입니다." })}
            placeholder="이름을 입력하세요"
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.formRow}>
          <label>생년 월일</label>
          <div className={styles.birthGroup}>
            <input {...register("birthYear")} placeholder="YYYY" />
            <span>-</span>
            <input {...register("birthMonth")} placeholder="MM" />
          </div>
        </div>

        <div className={styles.formRow}>
          <label>연락처</label>
          <input {...register("phone")} placeholder="연락처를 입력하세요" />
        </div>

        <div className={styles.formRow}>
          <label>이메일</label>
          <div className={styles.emailGroup}>
            <input {...register("emailId")} placeholder="아이디" />
            <span>@</span>
            <input {...register("emailDomain")} placeholder="도메인" />
          </div>
        </div>

        <div className={styles.formRow}>
          <label>주소</label>
          <div className={styles.addressGroup}>
            <input {...register("address")} placeholder="주소를 입력하세요" />
            <button type="button">주소확인</button>

            <input
              {...register("detailAddress")}
              placeholder="상세 주소를 입력하세요"
            />
          </div>
        </div>
      </form>

      <div className={styles.cardSection}>
        <h3 className={styles.sectionTitle}>결제 수단</h3>
        <div className={styles.cardTop}>
          <span className={styles.cardLabel}>카드 관리</span>
        </div>

        <div className={styles.cardBox}>
          <div className={styles.savedCard} onClick={() => handleCardSelect(0)}>
            <p>
              <strong>Samsung Card</strong> <span>3434-33**</span>
            </p>
            <div className={styles.allCheck}>
              <FaCheckCircle
                className={
                  selectedCard === 0 ? styles.checked : styles.unchecked
                }
              />
            </div>
          </div>

          <div className={styles.cardImage}></div>
          <p className={styles.cardNumber}>9999-9999-9999-9999</p>
          <p className={styles.cardExpiry}>02/22</p>
          <p className={styles.cardName}>삼성카드</p>
        </div>

        <div className={styles.savedCard} onClick={() => handleCardSelect(1)}>
          <p>
            <strong>Hyundai Card</strong> <span>5433-33**</span>
          </p>
          <div className={styles.allCheck}>
            <FaCheckCircle
              className={selectedCard === 1 ? styles.checked : styles.unchecked}
            />
          </div>
        </div>

        <div className={styles.newCardBox} onClick={openAddCardModal}>
          <div className={styles.plus}>+</div>
          <p>카드등록하고 1초만에 결제하세요</p>
        </div>

        <button className={styles.payBtn}>결제하기</button>
      </div>
      {showAddCard && <AddCard onClose={closeAddCardModal} />}
    </div>
  );
};

export default OrderPayment;
