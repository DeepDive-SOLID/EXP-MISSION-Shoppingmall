import { useForm } from "react-hook-form";
import styles from "./AddCard.module.scss";
import { addCard } from "../../../api/order/orderApi";
import { getCurrentMemberId } from "../../../utils/auth";
import { useEffect, useState } from "react";

// 카드 폼 데이터 타입
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

// 모달 props 타입
interface AddCardModalProps {
  onClose: () => void;
}

const AddCard = ({ onClose }: AddCardModalProps) => {
  const { register, handleSubmit, watch } = useForm<CardFormData>();
  const card1 = watch("card1");
  const [paymentName, setPaymentName] = useState("");

  useEffect(() => {
    if (card1?.length === 4) {
      const cardBins: { [key: string]: string } = {
        "1111": "카카오카드",
        "2222": "국민카드",
        "3333": "농협카드",
        "4444": "삼성카드",
        "5555": "신한카드",
      };
      setPaymentName(cardBins[card1] || "");
    } else {
      setPaymentName("");
    }
  }, [card1]);

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
      paymentName,
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
            <input
              {...register("card1", { required: true })}
              maxLength={4}
              inputMode="numeric"
              pattern="[0-9]*"
              onInput={e =>
                (e.currentTarget.value = e.currentTarget.value.replace(
                  /\D/g,
                  "",
                ))
              }
            />
            <input
              {...register("card2", { required: true })}
              maxLength={4}
              inputMode="numeric"
              pattern="[0-9]*"
              onInput={e =>
                (e.currentTarget.value = e.currentTarget.value.replace(
                  /\D/g,
                  "",
                ))
              }
            />
            <input
              {...register("card3", { required: true })}
              maxLength={4}
              inputMode="numeric"
              pattern="[0-9]*"
              onInput={e =>
                (e.currentTarget.value = e.currentTarget.value.replace(
                  /\D/g,
                  "",
                ))
              }
            />
            <input
              {...register("card4", { required: true })}
              maxLength={4}
              inputMode="numeric"
              pattern="[0-9]*"
              onInput={e =>
                (e.currentTarget.value = e.currentTarget.value.replace(
                  /\D/g,
                  "",
                ))
              }
            />
          </div>

          <label>만료일</label>
          <div className={styles.expiryGroup}>
            <input
              {...register("expMonth", { required: true })}
              placeholder="MM"
              maxLength={2}
              inputMode="numeric"
              pattern="[0-9]*"
              onInput={e =>
                (e.currentTarget.value = e.currentTarget.value.replace(
                  /\D/g,
                  "",
                ))
              }
            />
            <span>/</span>
            <input
              {...register("expYear", { required: true })}
              placeholder="YY"
              maxLength={2}
              inputMode="numeric"
              pattern="[0-9]*"
              onInput={e =>
                (e.currentTarget.value = e.currentTarget.value.replace(
                  /\D/g,
                  "",
                ))
              }
            />
          </div>

          <label>카드 소유자 이름</label>
          <input
            {...register("cardOwner", { required: true })}
            placeholder="카드 소유자 이름"
          />

          <label>보안 코드 (CVC)</label>
          <input
            {...register("cvc", { required: true })}
            maxLength={3}
            placeholder="3자리 숫자"
            inputMode="numeric"
            pattern="[0-9]*"
            onInput={e =>
              (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""))
            }
          />

          <label>카드 비밀번호</label>
          <input
            {...register("cardPassword", { required: true })}
            maxLength={4}
            placeholder="4자리 숫자"
            inputMode="numeric"
            pattern="[0-9]*"
            onInput={e =>
              (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""))
            }
          />

          <button type="submit">카드 등록하기</button>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
