import Info from "../../components/detail/Info/Info";
import Header from "../../components/common/Header_login/Header";
import ProductImg from "../../components/detail/ProductImg/ProductImg";
import styles from "./Detail.module.scss";

const Detail = () => {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <ProductImg />
        <Info />
      </div>
    </div>
  );
};
export default Detail;
