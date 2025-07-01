import { useForm } from "react-hook-form";
import styles from "./OrderPayment.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddCard from "../AddCard/AddCard";
import { useNavigate } from "react-router-dom";
import { getCurrentMemberId } from "../../../utils/auth";
import { fetchCardList, addOrder } from "../../../api/order/orderApi";
import { PaymentCardDto, OrderAddDto } from "../../../types/order/order";
import { BasketListDto } from "../../../types/basket/basket";
import { deleteFromBasket } from "../../../api/basket/basketApi";

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
  } = useForm<FormData>();

  const [cardList, setCardList] = useState<PaymentCardDto[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const navigate = useNavigate();
  const memberId = getCurrentMemberId();

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
        const products = item.basketProducts.map(product => ({
          productId: product.productId,
          orderProductAmount: product.basketProductAmount,
        }));

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
              {...register("birthYear")}
              placeholder="YYYY"
              maxLength={4}
            />
            <span>/</span>
            <input {...register("birthMonth")} placeholder="MM" maxLength={2} />
            <span>/</span>
            <input {...register("birthDate")} placeholder="DD" maxLength={2} />
          </div>
        </div>

        <div className={styles.formRow}>
          <label>연락처</label>
          <input
            {...register("phone")}
            placeholder="연락처를 입력하세요"
            onChange={e => {
              const rawValue = e.target.value.replace(/[^0-9]/g, "");
              let formatted = rawValue;

              if (rawValue.length <= 3) {
                formatted = rawValue;
              } else if (rawValue.length <= 7) {
                formatted = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
              } else if (rawValue.length <= 11) {
                formatted = `${rawValue.slice(0, 3)}-${rawValue.slice(3, 7)}-${rawValue.slice(7)}`;
              }

              e.target.value = formatted;
            }}
            maxLength={13}
          />
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

        {cardList.length === 0 && <p>등록된 카드가 없습니다.</p>}
        {cardList.map(card => (
          <div
            key={card.paymentId}
            className={`${styles.savedCard} ${
              selectedCardId === card.paymentId ? styles.active : ""
            }`}
            onClick={() => {
              console.log("clicked:", card.paymentId);
              handleCardSelect(Number(card.paymentId));
            }}
          >
            <p>
              <strong>{card.paymentName}</strong>{" "}
              <span>{card.paymentNum.slice(0, 4)}-****</span>
            </p>
            <FaCheckCircle
              className={
                selectedCardId === card.paymentId
                  ? styles.checked
                  : styles.unchecked
              }
            />
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
