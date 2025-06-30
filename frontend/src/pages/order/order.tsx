import { useLocation } from "react-router-dom";
import Header from "../../components/common/Header/Header";
import OrderProduct from "../../components/order/OrderProduct/OrderProduct";
import OrderAgreement from "../../components/order/OrderAgreement/OrderAgreement";
import OrderPayment from "../../components/order/OrderPayment/OrderPayment";
import { useState } from "react";

const Order = () => {
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || [];
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <div>
      <Header />
      <OrderProduct selectedItems={selectedItems} />
      <OrderAgreement onAgreementChange={setIsAgreed} />
      <OrderPayment selectedItems={selectedItems} isAgreed={isAgreed} />
    </div>
  );
};

export default Order;
