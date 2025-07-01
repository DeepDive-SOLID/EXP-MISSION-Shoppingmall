import HomeBanner from "../../components/home/HomeBanner/HomeBanner";
import Header from "../../components/common/Header/Header";
import HomePopular from "../../components/home/HomePopular/HomePopular";
import HomeRecommend from "../../components/home/HomeRecommend/HomeRecommend";
import Footer from "../../components/common/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <HomeBanner />
      <HomePopular />
      <HomeRecommend />
      <Footer />
    </div>
  );
};

export default Home;
