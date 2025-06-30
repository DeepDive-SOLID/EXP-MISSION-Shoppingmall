import { useState } from "react";
import styles from "./OrderAgreement.module.scss";
import { FaCheckCircle } from "react-icons/fa";

const terms = [
  {
    title: "[필수] 개인정보 수집 및 이용 동의",
    description: `본인은 아래의 내용에 동의합니다.

· 수집 항목: 성명, 생년월일, 연락처, 이메일 등
· 수집 목적: 예약 정보 확인, 고객 응대, 서비스 제공
· 보유 및 이용 기간: 수집일로부터 1년간 보관 후 파기

※ 귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 거부 시 서비스 이용이 제한될 수 있습니다.`,
  },
  {
    title: "[필수] 취소 및 환불 수수료 정책 동의",
    description: `예약 취소는 여행 시작일 기준 7일 전까지 가능하며, 이후 취소 시 아래 기준에 따라 수수료가 부과됩니다.

· 출발 7일 전까지 취소: 전액 환불  
· 출발 6~3일 전 취소: 상품가의 30% 공제 후 환불  
· 출발 2일 전~당일 취소: 환불 불가

※ 예약 후 취소 시점에 따라 수수료가 달라지므로 신중히 예약해주시기 바랍니다.`,
  },
];

interface OrderAgreementProps {
  onAgreementChange: (agreed: boolean) => void;
}

const OrderAgreement = ({ onAgreementChange }: OrderAgreementProps) => {
  const [agreements, setAgreements] = useState([false, false]);
  const allChecked = agreements.every(Boolean);

  const handleAllToggle = () => {
    const updated = !allChecked ? [true, true] : [false, false];
    setAgreements(updated);
    onAgreementChange(updated.every(Boolean));
  };

  const handleIndividualToggle = (index: number) => {
    const updated = [...agreements];
    updated[index] = !updated[index];
    setAgreements(updated);
    onAgreementChange(updated.every(Boolean));
  };

  return (
    <div className={styles.agreementWrapper}>
      <h3 className={styles.sectionTitle}>취소 및 약관 개인정보 이용 동의</h3>

      <div className={styles.allCheck} onClick={handleAllToggle}>
        <FaCheckCircle
          className={allChecked ? styles.checked : styles.unchecked}
        />
        <span>약관 전체 동의</span>
      </div>

      {terms.map((term, i) => (
        <div key={i} className={styles.termBlock}>
          <div className={styles.termBox}>
            <div className={styles.termText}>
              <strong>{term.title}</strong>
              <pre className={styles.description}>{term.description}</pre>
            </div>
          </div>
          <div
            onClick={() => handleIndividualToggle(i)}
            className={styles.checkArea}
          >
            <FaCheckCircle
              className={agreements[i] ? styles.checked : styles.unchecked}
            />
            <span className={styles.label}>동의함</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderAgreement;
