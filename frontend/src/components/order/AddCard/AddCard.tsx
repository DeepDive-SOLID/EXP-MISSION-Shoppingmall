import { useForm } from "react-hook-form";
import styles from "./AddCard.module.scss";
import { card } from "../../../assets";

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

  const onSubmit = (data: CardFormData) => {
    console.log("카드 등록 정보:", data);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          x
        </button>
        <img src={card} alt="카드 이미지" className={styles.cardImage} />

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
          <input {...register("cvc")} />

          <label>카드 비밀번호</label>
          <input {...register("cardPassword")} />

          <button type="submit">카드 등록하기</button>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
