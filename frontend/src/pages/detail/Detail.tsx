import Info from "../../components/detail/Info/Info";
import Header from "../../components/common/Header_login/Header";
import ProductImg from "../../components/detail/ProductImg/ProductImg";
import styles from "./Detail.module.scss";
import Review from "../../components/detail/Review/Review";
import { useLocation } from "react-router-dom";

const Detail = () => {
  const location = useLocation();
  const { travel } = location.state;

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <ProductImg travelId={travel.travelId} travelImg={travel.travelImg} />
        <Info travelId={travel.travelId} />
      </div>
      <div>
        <Review travelId={travel.travelId} />
      </div>
    </div>
  );
};
export default Detail;
