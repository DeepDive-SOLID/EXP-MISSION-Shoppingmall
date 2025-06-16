import { useState, useEffect } from "react";
import Header from "../../components/common/Header/Header";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import styles from "./ManageOrder.module.scss";
import { FiSearch } from "react-icons/fi";
import { orderApi } from "../../api/axios";
import {
  getOrderStatusText,
  getOrderStatusClass,
} from "../../utils/orderUtils";
import { Order, OrderSearchType } from "../../types/order";

const ManageOrder = () => {
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<OrderSearchType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  // API에서 주문 데이터 가져오기
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderApi.getOrderList();
        setOrders(response);
      } catch (error) {
        console.error("주문 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async () => {
    setCurrentPage(1);

    if (tempSearchTerm === "") {
      // 검색어가 비어있으면 전체 목록 조회
      try {
        setLoading(true);
        const response = await orderApi.getOrderList();
        setOrders(response);
      } catch (error) {
        console.error("주문 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const response = await orderApi.searchOrder(searchType, tempSearchTerm);
      setOrders(response);
    } catch (error) {
      console.error("주문 검색 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSearchTypeChange = (type: OrderSearchType) => {
    setSearchType(type);
    setCurrentPage(1);
  };

  // 검색어로 필터링 (클라이언트 측 필터링은 제거)
  const filteredOrders = orders;

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // 페이지 번호 배열 생성 (최대 5개)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.mainContent}>
          <div className={styles.pageHeader}>
            <h1>주문 관리</h1>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.searchContainer}>
              <div className={styles.searchTypeButtons}>
                <button
                  className={`${styles.searchTypeButton} ${searchType === "all" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("all")}
                >
                  전체
                </button>
                <button
                  className={`${styles.searchTypeButton} ${searchType === "orderId" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("orderId")}
                >
                  주문번호
                </button>
                <button
                  className={`${styles.searchTypeButton} ${searchType === "orderDate" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("orderDate")}
                >
                  주문날짜
                </button>
                <button
                  className={`${styles.searchTypeButton} ${searchType === "orderStatus" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("orderStatus")}
                >
                  주문상태
                </button>
              </div>
              <div className={styles.searchTypeButtons}>
                <button
                  className={`${styles.searchTypeButton} ${searchType === "memberId" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("memberId")}
                >
                  주문자ID
                </button>
                <button
                  className={`${styles.searchTypeButton} ${searchType === "product" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("product")}
                >
                  물품
                </button>
                <button
                  className={`${styles.searchTypeButton} ${searchType === "payment" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("payment")}
                >
                  결제수단
                </button>
                <button
                  className={`${styles.searchTypeButton} ${searchType === "quantity" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("quantity")}
                >
                  수량
                </button>
              </div>
              <div className={styles.searchBox}>
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  value={tempSearchTerm}
                  onChange={handleSearch}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className={styles.searchIconButton}
                  onClick={handleSearchSubmit}
                  aria-label="검색"
                >
                  <FiSearch className={styles.searchIcon} />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.tableContainer}>
            {loading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <p className={styles.loadingText}>
                  데이터를 불러오는 중입니다...
                </p>
              </div>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.orderTable}>
                  <thead>
                    <tr>
                      <th>주문번호</th>
                      <th>여행 상품명</th>
                      <th>물품명</th>
                      <th>주문자 ID</th>
                      <th>결제수단</th>
                      <th>여행 상품 수량</th>
                      <th>물품 수량</th>
                      <th>주문 일자</th>
                      <th>주문 상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map(order => (
                      <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{order.travelName || "-"}</td>
                        <td>{order.productName || "-"}</td>
                        <td>{order.memberId}</td>
                        <td>{order.paymentName}</td>
                        <td>{order.orderTravelAmount}</td>
                        <td>{order.orderProductAmount}</td>
                        <td>{order.orderDt}</td>
                        <td>
                          <span
                            className={`${styles.statusTag} ${getOrderStatusClass(
                              order.orderState,
                              styles,
                            )}`}
                          >
                            {getOrderStatusText(order.orderState)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {totalPages > 0 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageButton}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                이전
              </button>

              {getPageNumbers().map(number => (
                <button
                  key={number}
                  className={`${styles.pageButton} ${
                    currentPage === number ? styles.active : ""
                  }`}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              ))}

              <button
                className={styles.pageButton}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;
