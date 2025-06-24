import OrderProduct from "../../components/order/OrderProduct/OrderProduct";
import Header from "../../components/common/Header_login/Header";
import OrderPayment from "../../components/order/OrderPayment/OrderPayment";

const Order = () => {
  return (
    <div>
      <Header />
      <OrderProduct />
      <OrderPayment />
    </div>
  );
};
export default Order;
