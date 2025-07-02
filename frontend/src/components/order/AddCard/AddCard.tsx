import { useForm } from "react-hook-form";
import styles from "./AddCard.module.scss";
import { addCard } from "../../../api/order/orderApi";
import { getCardImage } from "../../../api/mypage/cardApi";
import { getCurrentMemberId } from "../../../utils/auth";
import { useEffect, useState } from "react";
import { kakao_card } from "../../../assets";

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CardFormData>({ mode: "onChange" });
  const card1 = watch("card1");
  const [paymentName, setPaymentName] = useState("");
  const [cardImgUrl, setCardImgUrl] = useState<string | null>(null);

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

      getCardImage(card1)
        .then(url => setCardImgUrl(url))
        .catch(() => setCardImgUrl(null));
    } else {
      setPaymentName("");
      setCardImgUrl(null);
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
        <div className={styles.cardPreview}>
          <img
            src={cardImgUrl ?? kakao_card}
            alt="카드 이미지"
            className={styles.cardImage}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>카드번호</label>
          <div className={styles.cardNumberGroup}>
            {["card1", "card2", "card3", "card4"].map(field => (
              <div key={field} className={styles.inputBlock}>
                <input
                  {...register(field as keyof CardFormData, {
                    required: "필수 입력입니다",
                    pattern: {
                      value: /^\d{4}$/,
                      message: "숫자 4자리를 입력해주세요",
                    },
                  })}
                  maxLength={4}
                  inputMode="numeric"
                  onInput={e =>
                    (e.currentTarget.value = e.currentTarget.value.replace(
                      /\D/g,
                      "",
                    ))
                  }
                />
                {errors[field as keyof CardFormData] && (
                  <p className={styles.errorText}>
                    {errors[field as keyof CardFormData]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className={styles.inputBlock}>
            <label>만료일</label>
            <div className={styles.expiryGroup}>
              <div className={styles.inputBlock}>
                <input
                  {...register("expMonth", {
                    required: "필수 입력입니다",
                    pattern: {
                      value: /^(0[1-9]|1[0-2])$/,
                      message: "01~12 사이의 숫자 입력",
                    },
                  })}
                  placeholder="MM"
                  maxLength={2}
                  inputMode="numeric"
                  onInput={e =>
                    (e.currentTarget.value = e.currentTarget.value.replace(
                      /\D/g,
                      "",
                    ))
                  }
                />
                {errors.expMonth && (
                  <p className={styles.errorText}>{errors.expMonth.message}</p>
                )}
              </div>

              <div className={styles.inputBlock}>
                <input
                  {...register("expYear", {
                    required: "필수 입력입니다",
                    pattern: {
                      value: /^\d{2}$/,
                      message: "2자리 숫자 입력",
                    },
                  })}
                  placeholder="YY"
                  maxLength={2}
                  inputMode="numeric"
                  onInput={e =>
                    (e.currentTarget.value = e.currentTarget.value.replace(
                      /\D/g,
                      "",
                    ))
                  }
                />
                {errors.expYear && (
                  <p className={styles.errorText}>{errors.expYear.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.inputBlock}>
            <label>카드 소유자 이름</label>
            <input
              {...register("cardOwner", {
                required: "필수 입력입니다",
                minLength: {
                  value: 2,
                  message: "이름은 2자 이상 입력해주세요",
                },
              })}
              placeholder="카드 소유자 이름"
            />
            {errors.cardOwner && (
              <p className={styles.errorText}>{errors.cardOwner.message}</p>
            )}
          </div>

          <div className={styles.inputBlock}>
            <label>보안 코드 (CVC)</label>
            <input
              {...register("cvc", {
                required: "필수 입력입니다",
                pattern: {
                  value: /^\d{3}$/,
                  message: "3자리 숫자를 입력해주세요",
                },
              })}
              maxLength={3}
              placeholder="3자리 숫자"
              inputMode="numeric"
              onInput={e =>
                (e.currentTarget.value = e.currentTarget.value.replace(
                  /\D/g,
                  "",
                ))
              }
            />
            {errors.cvc && (
              <p className={styles.errorText}>{errors.cvc.message}</p>
            )}
          </div>

          <div className={styles.inputBlock}>
            <label>카드 비밀번호</label>
            <input
              {...register("cardPassword", {
                required: "필수 입력입니다",
                pattern: {
                  value: /^\d{4}$/,
                  message: "4자리 숫자를 입력해주세요",
                },
              })}
              maxLength={4}
              placeholder="4자리 숫자"
              inputMode="numeric"
              onInput={e =>
                (e.currentTarget.value = e.currentTarget.value.replace(
                  /\D/g,
                  "",
                ))
              }
            />
            {errors.cardPassword && (
              <p className={styles.errorText}>{errors.cardPassword.message}</p>
            )}
          </div>

          <button type="submit" disabled={!isValid}>
            카드 등록하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
