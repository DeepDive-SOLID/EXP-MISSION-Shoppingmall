import HomeBanner from "../../components/home/HomeBanner/HomeBanner";
import Header from "../../components/common/Header_login/Header";
import HomePopular from "../../components/home/HomePopular/HomePopular";
// import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div>
      <Header />
      <HomeBanner />
      <HomePopular />
    </div>
  );
};

export default Home;
