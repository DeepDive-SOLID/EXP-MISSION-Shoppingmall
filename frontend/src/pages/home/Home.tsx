import HomeBanner from "../../components/home/HomeBanner/HomeBanner";
import Header from "../../components/common/Header/Header";
import HomePopular from "../../components/home/HomePopular/HomePopular";
import HomeRecommend from "../../components/home/HomeRecommend/HomeRecommend";
import Footer from "../../components/common/Footer/Footer";
import HomeDeadline from "../../components/home/HomeDeadline/HomeDeadline";

const Home = () => {
  return (
    <div>
      <Header />
      <HomeBanner />
      <HomePopular />
      <HomeDeadline />
      <HomeRecommend />

      <Footer />
    </div>
  );
};

export default Home;
