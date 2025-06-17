import SearchSidebar from "../../components/search/SearchSidebar/SearchSidebar";
import Header from "../../components/common/Header_login/Header";
import SearchMain from "../../components/search/SearchMain/SearchMain";
import styles from "./Search.module.scss";

const Search = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.contentWrapper}>
        <SearchSidebar />
        <SearchMain />
      </div>
    </div>
  );
};
export default Search;
