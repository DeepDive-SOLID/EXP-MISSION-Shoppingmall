import { useForm } from "react-hook-form";
import styles from "./OrderPayment.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddCard from "../AddCard/AddCard";
import { useNavigate } from "react-router-dom";
import { getCurrentMemberId } from "../../../utils/auth";
import {
  fetchCardList,
  addOrder,
  fetchOrderMemberInfo,
} from "../../../api/order/orderApi";
import { PaymentCardDto, OrderAddDto } from "../../../types/order/order";
import { BasketListDto } from "../../../types/basket/basket";
import { deleteFromBasket } from "../../../api/basket/basketApi";
import DaumPostcode from "react-daum-postcode";

// 폼 데이터 타입
interface FormData {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDate: string;
  phone: string;
  emailId: string;
  emailDomain: string;
  address: string;
  detailAddress: string;
}

// props 타입
interface OrderPaymentProps {
  selectedItems: (BasketListDto & {
    personCount: number;
    extraCount: number;
  })[];
  isAgreed: boolean;
}

const OrderPayment = ({ selectedItems, isAgreed }: OrderPaymentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const [cardList, setCardList] = useState<PaymentCardDto[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const navigate = useNavigate();
  const memberId = getCurrentMemberId();
  const [showPostcode, setShowPostcode] = useState(false);

  const handleComplete = (data: { address: string; zonecode: string }) => {
    const fullAddress = data.address;
    setValue("address", fullAddress);
    setShowPostcode(false);
  };

  const [items, setItems] = useState<
    (BasketListDto & { personCount: number; extraCount: number })[]
  >([]);

  useEffect(() => {
    const initialized = selectedItems.map(item => ({
      ...item,
      personCount: item.basketTravelAmount,
      extraCount: item.basketProductAmount,
      basketProducts: item.basketProducts ?? [],
    }));
    setItems(initialized);
  }, [selectedItems]);

  // 카드 목록 불러오기
  const fetchCardListData = async () => {
    if (!memberId) return;
    const cards = await fetchCardList(memberId);
    console.log("불러온 카드 목록:", cards);
    setCardList(cards);
  };

  // 카드 목록 초기 로딩
  useEffect(() => {
    fetchCardListData();
  }, [memberId]);

  // 카드 추가 모달 열고/닫기
  const openAddCardModal = () => setShowAddCard(true);
  const closeAddCardModal = () => setShowAddCard(false);

  // 카드 선택 처리
  const handleCardSelect = (paymentId: number) => {
    if (selectedCardId === paymentId) {
      setSelectedCardId(null);
    } else {
      setSelectedCardId(paymentId);
    }
  };

  // 결제 처리
  const onSubmit = async (form: FormData) => {
    if (!memberId) return alert("로그인 정보가 없습니다.");
    if (!selectedCardId) return alert("카드를 선택해주세요.");
    if (!isAgreed) return alert("약관에 동의해야 합니다.");

    try {
      for (const item of items) {
        const products = item.basketProducts?.length
          ? item.basketProducts
              .filter(p => p.productId !== null && p.productId !== undefined)
              .map(p => ({
                productId: p.productId,
                orderProductAmount: p.basketProductAmount,
              }))
          : [];

        const order: OrderAddDto = {
          orderAddr: form.address,
          orderAddrDetail: form.detailAddress,
          orderTravelAmount: item.personCount,
          travelId: item.travelId,
          paymentId: selectedCardId,
          memberId,
          products,
        };

        const result = await addOrder(order);
        if (result !== "SUCCESS") throw new Error("결제 실패");

        await deleteFromBasket({ travelId: item.travelId, memberId });
      }

      const travelTotal = items[0].personCount * items[0].travelPrice;
      const extraTotal = selectedItems.reduce((sum, item) => {
        return (
          sum +
          item.basketProducts.reduce(
            (subSum, p) =>
              subSum + (p.productPrice ?? 0) * p.basketProductAmount,
            0,
          )
        );
      }, 0);

      const totalPrice = travelTotal + extraTotal;

      navigate("/order/payresult/success", {
        state: {
          memberName: form.name,
          items: items.map(item => ({
            travelName: item.travelName,
            travelStartDt: item.travelStartDt,
            travelEndDt: item.travelEndDt,
            personCount: item.personCount,
            travelPrice: item.travelPrice,
            productDetails: item.basketProducts.map(p => ({
              productName: p.productName,
              productCount: p.basketProductAmount,
              productPrice: p.productPrice,
              total: (p.productPrice ?? 0) * p.basketProductAmount,
            })),
            total:
              item.personCount * item.travelPrice +
              item.basketProducts.reduce(
                (sum, p) => sum + (p.productPrice ?? 0) * p.basketProductAmount,
                0,
              ),
          })),
          totalPrice,
        },
      });
    } catch (error) {
      console.error("결제 오류:", error);
      navigate("/order/payresult/fail");
    }
  };

  useEffect(() => {
    const loadOrderMemberInfo = async () => {
      if (!memberId) return;

      try {
        const info = await fetchOrderMemberInfo(memberId);
        console.log("불러온 유저 정보:", info);

        setValue("name", info.memberName);

        const birth = info.memberBirth.replaceAll("-", "");
        setValue("birthYear", birth.slice(0, 4));
        setValue("birthMonth", birth.slice(4, 6));
        setValue("birthDate", birth.slice(6, 8));

        setValue("phone", info.memberPhone);

        const [emailId, emailDomain] = info.memberEmail.split("@");
        setValue("emailId", emailId);
        setValue("emailDomain", emailDomain);
      } catch (err) {
        console.error("주문자 정보 조회 실패:", err);
      }
    };

    loadOrderMemberInfo();
  }, [memberId, setValue]);

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
            <input
              {...register("birthYear", {
                required: "연도는 필수입니다.",
                validate: value =>
                  value.length === 4 || "연도는 4자리를 입력해야 합니다.",
              })}
              placeholder="YYYY"
            />
            <span>/</span>
            <input
              {...register("birthMonth", {
                required: "월은 필수입니다.",
                validate: value =>
                  value.length === 2 || "월은 2자리를 입력해야 합니다.",
              })}
              placeholder="MM"
            />
            <span>/</span>
            <input
              {...register("birthDate", {
                required: "일은 필수입니다.",
                validate: value =>
                  value.length === 2 || "일은 2자리를 입력해야 합니다.",
              })}
              placeholder="DD"
            />
          </div>
          {(errors.birthYear || errors.birthMonth || errors.birthDate) && (
            <p className={styles.error}>
              {errors.birthYear?.message ||
                errors.birthMonth?.message ||
                errors.birthDate?.message}
            </p>
          )}
        </div>

        <div className={styles.formRow}>
          <label>연락처</label>
          <input
            {...register("phone", {
              required: "연락처는 필수입니다.",
              validate: value =>
                value.length === 13 || "연락처 형식이 올바르지 않습니다.",
            })}
            placeholder="연락처를 입력하세요"
            maxLength={13}
            onChange={e => {
              const raw = e.target.value.replace(/[^0-9]/g, "");
              let formatted = raw;
              if (raw.length <= 3) {
                formatted = raw;
              } else if (raw.length <= 7) {
                formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
              } else {
                formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7)}`;
              }
              e.target.value = formatted;
            }}
          />
          {errors.phone && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}
        </div>

        <div className={styles.formRow}>
          <label>이메일</label>
          <div className={styles.emailGroup}>
            <input
              {...register("emailId", {
                required: "이메일 아이디는 필수입니다.",
              })}
              placeholder="아이디"
            />
            <span>@</span>
            <input
              {...register("emailDomain", {
                required: "이메일 도메인은 필수입니다.",
              })}
              placeholder="도메인"
            />
          </div>
          {(errors.emailId || errors.emailDomain) && (
            <p className={styles.error}>
              {errors.emailId?.message || errors.emailDomain?.message}
            </p>
          )}
        </div>

        <div className={styles.formRow}>
          <label>주소</label>
          <div className={styles.addressGroup}>
            <input
              {...register("address", {
                required: "주소는 필수입니다.",
              })}
              placeholder="주소를 입력하세요"
            />
            <button type="button" onClick={() => setShowPostcode(true)}>
              주소 검색
            </button>
            {showPostcode && (
              <div className={styles.postcodeModalOverlay}>
                <div className={styles.postcodeModal}>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setShowPostcode(false)}
                  >
                    X
                  </button>
                  <DaumPostcode onComplete={handleComplete} autoClose />
                </div>
              </div>
            )}

            <input
              {...register("detailAddress", {
                required: "상세주소는 필수입니다.",
              })}
              placeholder="상세 주소를 입력하세요"
            />
          </div>
          {(errors.address || errors.detailAddress) && (
            <p className={styles.error}>
              {errors.address?.message || errors.detailAddress?.message}
            </p>
          )}
        </div>
      </form>

      <div className={styles.cardSection}>
        <h3 className={styles.sectionTitle}>결제 수단</h3>

        {cardList.length === 0 && <p>등록된 카드가 없습니다.</p>}
        {cardList.map(card => (
          <div
            key={card.paymentId}
            className={`${styles.cardBox} ${
              selectedCardId === card.paymentId ? styles.active : ""
            }`}
            onClick={() => handleCardSelect(card.paymentId)}
          >
            <img
              src={card.paymentCardImg}
              alt="카드 이미지"
              className={styles.cardImage}
            />

            <div className={styles.cardDetails}>
              <span className={styles.cardName}>{card.paymentName}</span>
              <span className={styles.cardNumber}>
                {card.paymentNum.slice(0, 4)} - ****
              </span>
            </div>

            {selectedCardId === card.paymentId && (
              <FaCheckCircle className={styles.checkedIcon} />
            )}
          </div>
        ))}

        <div className={styles.newCardBox} onClick={openAddCardModal}>
          <div className={styles.plus}>+</div>
          <p>카드등록하고 1초만에 결제하세요</p>
        </div>

        <button
          type="button"
          className={styles.payBtn}
          disabled={!isAgreed}
          onClick={handleSubmit(onSubmit)}
        >
          {isAgreed ? "결제하기" : "약관 동의 필요"}
        </button>
      </div>

      {showAddCard && (
        <AddCard
          onClose={() => {
            closeAddCardModal();
            fetchCardListData();
          }}
        />
      )}
    </div>
  );
};

export default OrderPayment;
