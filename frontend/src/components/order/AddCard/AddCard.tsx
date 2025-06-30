import { useForm } from "react-hook-form";
import styles from "./AddCard.module.scss";
import { addCard } from "../../../api/order/orderApi";
import { getCurrentMemberId } from "../../../utils/auth";

interface CardFormData {
  card1: string;
  card2: string;
  card3: string;
  card4: string;
  expMonth: string;
  expYear: string;
  cardOwner: string;
  cvc: string;
  cardPassword: string;
}

interface AddCardModalProps {
  onClose: () => void;
}

const AddCard = ({ onClose }: AddCardModalProps) => {
  const { register, handleSubmit } = useForm<CardFormData>();

  const onSubmit = async (data: CardFormData) => {
    const memberId = getCurrentMemberId();
    if (!memberId) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    const cardNum = `${data.card1}${data.card2}${data.card3}${data.card4}`;
    const paymentEndDt = `${data.expMonth}/${data.expYear}`;

    const cardData = {
      memberId,
      paymentName: data.cardOwner,
      paymentNum: cardNum,
      paymentEndDt,
      paymentOwner: data.cardOwner,
      paymentSecurity: data.cvc,
      paymentPw: data.cardPassword,
    };

    const result = await addCard(cardData);
    if (result === "SUCCESS") {
      alert("카드가 등록되었습니다.");
      onClose();
    } else {
      alert("카드 등록에 실패했습니다.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          x
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>카드 번호</label>
          <div className={styles.cardNumberGroup}>
            <input {...register("card1")} maxLength={4} />
            <input {...register("card2")} maxLength={4} />
            <input {...register("card3")} maxLength={4} />
            <input {...register("card4")} maxLength={4} />
          </div>

          <label>만료일</label>
          <div className={styles.expiryGroup}>
            <input {...register("expMonth")} placeholder="MM" maxLength={2} />
            <span>/</span>
            <input {...register("expYear")} placeholder="YY" maxLength={2} />
          </div>

          <label>카드 소유자 이름</label>
          <input {...register("cardOwner")} placeholder="카드 소유자 이름" />

          <label>보안 코드 (CVC)</label>
          <input {...register("cvc")} maxLength={3} placeholder="3자리 숫자" />

          <label>카드 비밀번호</label>
          <input
            {...register("cardPassword")}
            maxLength={4}
            placeholder="4자리 숫자"
          />

          <button type="submit">카드 등록하기</button>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
