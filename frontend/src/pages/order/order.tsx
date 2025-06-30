import OrderProduct from "../../components/order/OrderProduct/OrderProduct";
import Header from "../../components/common/Header/Header";
import OrderPayment from "../../components/order/OrderPayment/OrderPayment";
import OrderAgreement from "../../components/order/OrderAgreement/OrderAgreement";

const Order = () => {
  return (
    <div>
      <Header />
      <OrderProduct />
      <OrderAgreement />
      <OrderPayment />
    </div>
  );
};
export default Order;
