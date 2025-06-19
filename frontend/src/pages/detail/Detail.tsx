import Info from "../../components/detail/Info/Info";
import Header from "../../components/common/Header_login/Header";
import ProductImg from "../../components/detail/ProductImg/ProductImg";
import styles from "./Detail.module.scss";
import Review from "../../components/detail/Review/Review";
import { useLocation } from "react-router-dom";

const Detail = () => {
  const location = useLocation();
  const travelData = location.state;

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <ProductImg travelImg={travelData.travelImg} />
        <Info data={travelData} />
      </div>
      <div>
        <Review />
      </div>
    </div>
  );
};
export default Detail;
