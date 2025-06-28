import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CardAdd.module.scss";
import Header from "../../../../components/common/Header_login/Header";
import Sidebar from "../../../../components/common/Sidebar_mypage/Sidebar";
import kbCard from "../../../../assets/images/kb.jpg";
import { addCard, getCardImage } from "../../../../api/mypage/cardApi";

// 비밀번호 보이기/숨기기 아이콘 컴포넌트
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

const CardAdd = () => {
  const navigate = useNavigate();
  const cardNumberInputs = useRef<(HTMLInputElement | null)[]>([]);
  const expiryDateInputs = useRef<(HTMLInputElement | null)[]>([]);

  const [newCard, setNewCard] = useState({
    cardOwner: "",
    cardNumber: ["", "", "", ""],
    cardPassword: "",
    expiryDate: ["", ""],
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardOwner: "",
    cardNumber: "",
    cardPassword: "",
    expiryDate: "",
    cvv: "",
  });

  // 비밀번호 보이기/숨기기 상태
  const [showCvv, setShowCvv] = useState(false);
  const [showCardPassword, setShowCardPassword] = useState(false);

  const [cardImgUrl, setCardImgUrl] = useState<string | null>(null);
  const [paymentName, setPaymentName] = useState<string>("");

  // 카드번호 앞 4자리로 카드사 매칭
  const getPaymentNameByCardNumber = (cardNumber: string): string => {
    if (cardNumber.length !== 4) return "";

    const cardBins: { [key: string]: string } = {
      "1111": "카카오카드",
      "2222": "국민카드",
      "3333": "농협카드",
      "4444": "삼성카드",
      "5555": "신한카드",
    };

    return cardBins[cardNumber] || "";
  };

  useEffect(() => {
    const firstFour = newCard.cardNumber[0];
    if (firstFour.length === 4) {
      // 카드 이미지 가져오기
      getCardImage(firstFour)
        .then(res => {
          setCardImgUrl(res);
        })
        .catch(() => {
          setCardImgUrl(null);
        });

      // 카드사명 자동 매칭
      const matchedPaymentName = getPaymentNameByCardNumber(firstFour);
      setPaymentName(matchedPaymentName);
    } else {
      setCardImgUrl(null);
      setPaymentName("");
    }
  }, [newCard.cardNumber[0]]);

  const handleInputChange = (field: string, value: string) => {
    setNewCard(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleCardNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;

    const newCardNumber = [...newCard.cardNumber];
    newCardNumber[index] = value;
    setNewCard(prev => ({ ...prev, cardNumber: newCardNumber }));

    if (value.length === 4 && index < 3) {
      cardNumberInputs.current[index + 1]?.focus();
    }
  };

  const handleExpiryDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;

    const newExpiryDate = [...newCard.expiryDate];
    newExpiryDate[index] = value;
    setNewCard(prev => ({ ...prev, expiryDate: newExpiryDate }));

    if (value.length === 2 && index < 1) {
      expiryDateInputs.current[index + 1]?.focus();
    }
  };

  const handleCardNumberKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (
      e.key === "Backspace" &&
      newCard.cardNumber[index] === "" &&
      index > 0
    ) {
      cardNumberInputs.current[index - 1]?.focus();
    }
  };

  const handleExpiryDateKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (
      e.key === "Backspace" &&
      newCard.expiryDate[index] === "" &&
      index > 0
    ) {
      expiryDateInputs.current[index - 1]?.focus();
    }
  };

  const handleCardNumberPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasteData.length === 16) {
      const newCardNumber = [
        pasteData.substring(0, 4),
        pasteData.substring(4, 8),
        pasteData.substring(8, 12),
        pasteData.substring(12, 16),
      ];
      setNewCard(prev => ({ ...prev, cardNumber: newCardNumber }));
      cardNumberInputs.current[3]?.focus();
    }
  };

  const validateForm = () => {
    const newErrors = {
      cardOwner: "",
      cardNumber: "",
      cardPassword: "",
      expiryDate: "",
      cvv: "",
    };

    // 카드 소유자 검증
    if (!newCard.cardOwner.trim()) {
      newErrors.cardOwner = "카드 소유자 이름을 입력해주세요.";
    } else if (newCard.cardOwner.trim().length < 2) {
      newErrors.cardOwner = "카드 소유자 이름은 2자 이상 입력해주세요.";
    }

    // 카드번호 검증
    const fullCardNumber = newCard.cardNumber.join("");
    if (fullCardNumber.length !== 16) {
      newErrors.cardNumber = "카드번호 16자리를 모두 입력해주세요.";
    }

    // 카드 비밀번호 검증
    if (!newCard.cardPassword) {
      newErrors.cardPassword = "카드 비밀번호를 입력해주세요.";
    } else if (newCard.cardPassword.length !== 4) {
      newErrors.cardPassword = "카드 비밀번호는 4자리 숫자입니다.";
    } else if (!/^\d{4}$/.test(newCard.cardPassword)) {
      newErrors.cardPassword = "카드 비밀번호는 숫자만 입력 가능합니다.";
    }

    // 만료일 검증
    const [month, year] = newCard.expiryDate;
    if (month.length !== 2 || year.length !== 2) {
      newErrors.expiryDate = "만료일을 모두 입력해주세요.";
    } else {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = "유효하지 않은 월입니다.";
      } else if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = "만료된 카드입니다.";
      }
    }

    // CVV 검증
    const cvvRegex = /^\d{3,4}$/;
    if (!newCard.cvv) {
      newErrors.cvv = "보안 코드(CVV/CVC)를 입력해주세요.";
    } else if (!cvvRegex.test(newCard.cvv)) {
      newErrors.cvv = "보안 코드(CVV/CVC)는 3-4자리 숫자입니다.";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // PaymentAddDto 형태로 데이터 변환
      const currentYear = new Date().getFullYear();
      const inputYear = parseInt(newCard.expiryDate[1]);
      const fullYear = currentYear - (currentYear % 100) + inputYear; // 2자리 연도를 4자리로 변환

      const paymentDto = {
        memberId: "boon", // TODO: 실제 로그인 사용자 정보로 대체
        paymentName: paymentName,
        paymentNum: Number(newCard.cardNumber.join("")),
        paymentEndDt: `${fullYear}-${newCard.expiryDate[0].padStart(2, "0")}`, // YYYY-MM 형식
        paymentOwner: newCard.cardOwner,
        paymentSecurity: Number(newCard.cvv),
        paymentPw: Number(newCard.cardPassword),
      };
      try {
        const res = await addCard(paymentDto);
        if (res === "SUCCESS") {
          navigate("/mypage/card-add/complete");
        } else {
          navigate("/mypage/card-add/fail");
        }
      } catch (error) {
        console.log("카드 추가 에러:", error);
        // Primary Key 중복이나 기타 에러 시 실패 페이지로 이동
        navigate("/mypage/card-add/fail");
      }
    }
  };

  const handleCancel = () => {
    navigate("/mypage/card-info");
  };

  return (
    <div className={styles.cardAddPage}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.cardAddContainer}>
          <div className={styles.cardAddForm}>
            <div className={styles.pageHeader}>
              <h1>카드 추가</h1>
            </div>

            <div className={styles.cardPreview}>
              {cardImgUrl ? (
                <img
                  src={cardImgUrl}
                  alt="카드 이미지"
                  className={styles.cardImage}
                />
              ) : (
                <img
                  src={kbCard}
                  alt="기본 카드"
                  className={styles.cardImage}
                />
              )}
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="cardOwner">카드 소유자 *</label>
                <input
                  type="text"
                  id="cardOwner"
                  value={newCard.cardOwner}
                  onChange={e => handleInputChange("cardOwner", e.target.value)}
                  placeholder="카드 소유자 이름"
                  className={errors.cardOwner ? styles.error : ""}
                />
                {errors.cardOwner && (
                  <span className={styles.errorText}>{errors.cardOwner}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="cardNumber-0">카드번호 *</label>
                <div
                  className={styles.cardNumberGroup}
                  onPaste={handleCardNumberPaste}
                >
                  {newCard.cardNumber.map((value, index) => (
                    <React.Fragment key={index}>
                      <input
                        type="text"
                        id={`cardNumber-${index}`}
                        ref={el => {
                          cardNumberInputs.current[index] = el;
                        }}
                        value={value}
                        onChange={e => handleCardNumberChange(e, index)}
                        onKeyDown={e => handleCardNumberKeyDown(e, index)}
                        maxLength={4}
                        placeholder="XXXX"
                        className={errors.cardNumber ? styles.error : ""}
                        inputMode="numeric"
                      />
                      {index < 3 && <span className={styles.separator}>-</span>}
                    </React.Fragment>
                  ))}
                </div>
                {errors.cardNumber && (
                  <span className={styles.errorText}>{errors.cardNumber}</span>
                )}
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label htmlFor="expiryDate-0">만료일 *</label>
                  <div className={styles.expiryDateGroup}>
                    <input
                      type="text"
                      id="expiryDate-0"
                      ref={el => {
                        expiryDateInputs.current[0] = el;
                      }}
                      value={newCard.expiryDate[0]}
                      onChange={e => handleExpiryDateChange(e, 0)}
                      onKeyDown={e => handleExpiryDateKeyDown(e, 0)}
                      placeholder="MM"
                      maxLength={2}
                      className={errors.expiryDate ? styles.error : ""}
                      inputMode="numeric"
                    />
                    <span className={styles.separator}>/</span>
                    <input
                      type="text"
                      id="expiryDate-1"
                      ref={el => {
                        expiryDateInputs.current[1] = el;
                      }}
                      value={newCard.expiryDate[1]}
                      onChange={e => handleExpiryDateChange(e, 1)}
                      onKeyDown={e => handleExpiryDateKeyDown(e, 1)}
                      placeholder="YY"
                      maxLength={2}
                      className={errors.expiryDate ? styles.error : ""}
                      inputMode="numeric"
                    />
                  </div>
                  {errors.expiryDate && (
                    <span className={styles.errorText}>
                      {errors.expiryDate}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cvv">보안 코드(CVV/CVC) *</label>
                  <div className={styles.cvvGroup}>
                    <input
                      type={showCvv ? "text" : "password"}
                      id="cvv"
                      value={newCard.cvv}
                      onChange={e =>
                        handleInputChange(
                          "cvv",
                          e.target.value.replace(/\D/g, ""),
                        )
                      }
                      placeholder="CVV/CVC"
                      maxLength={4}
                      className={errors.cvv ? styles.error : ""}
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() => setShowCvv(!showCvv)}
                    >
                      <EyeIcon visible={showCvv} />
                    </button>
                  </div>
                  {errors.cvv && (
                    <span className={styles.errorText}>{errors.cvv}</span>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="cardPassword">카드 비밀번호 *</label>
                <div className={styles.cardPasswordGroup}>
                  <input
                    type={showCardPassword ? "text" : "password"}
                    id="cardPassword"
                    value={newCard.cardPassword}
                    onChange={e =>
                      handleInputChange(
                        "cardPassword",
                        e.target.value.replace(/\D/g, ""),
                      )
                    }
                    placeholder="카드 비밀번호 4자리"
                    maxLength={4}
                    className={errors.cardPassword ? styles.error : ""}
                  />
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => setShowCardPassword(!showCardPassword)}
                  >
                    <EyeIcon visible={showCardPassword} />
                  </button>
                </div>
                {errors.cardPassword && (
                  <span className={styles.errorText}>
                    {errors.cardPassword}
                  </span>
                )}
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCancel}
                >
                  취소
                </button>
                <button type="submit" className={styles.submitButton}>
                  카드 추가
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAdd;
