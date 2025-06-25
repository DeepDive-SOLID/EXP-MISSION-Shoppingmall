import { useState, useEffect } from "react";
import Header from "../../../components/common/Header_dash/Header";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import styles from "./ManageOrder.module.scss";
import { FiSearch } from "react-icons/fi";
import { orderApi } from "../../../api/admin/orderApi";
import { getOrderStatusClass } from "../../../utils/orderUtils";
import { Order, OrderSearchType } from "../../../types/admin/order";

const ManageOrder = () => {
  // 상태 관리
  const [tempSearchTerm, setTempSearchTerm] = useState(""); // 검색어 임시 저장
  const [searchType, setSearchType] = useState<OrderSearchType>("orderId"); // 검색 타입 (주문번호/주문날짜 등)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [orders, setOrders] = useState<Order[]>([]); // 주문 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const itemsPerPage = 10; // 페이지당 표시할 주문 수

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

  // 검색어 입력 처리
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchTerm(e.target.value);
  };

  // 주문 검색 실행
  const handleSearchSubmit = async () => {
    setCurrentPage(1);
    try {
      setLoading(true);
      const searchParams = {
        orderId:
          searchType === "orderId" ? parseInt(tempSearchTerm) : undefined,
        productName: searchType === "product" ? tempSearchTerm : undefined,
        memberId: searchType === "memberId" ? tempSearchTerm : undefined,
        paymentName: searchType === "payment" ? tempSearchTerm : undefined,
        orderDt: searchType === "orderDate" ? tempSearchTerm : undefined,
        orderState:
          searchType === "orderStatus" ? parseInt(tempSearchTerm) : undefined,
      };

      const response =
        tempSearchTerm === ""
          ? await orderApi.getOrderList()
          : await orderApi.searchOrder(searchParams);
      setOrders(response);
    } catch (error) {
      console.error("주문 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  // Enter 키 입력 처리
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  // 검색 타입 변경 처리
  const handleSearchTypeChange = (type: OrderSearchType) => {
    setSearchType(type);
    setCurrentPage(1);
  };

  // 페이지네이션 관련 로직
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 처리
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

  // 주문 상태 변경 처리
  const handleOrderStateChange = async (orderId: number, newState: number) => {
    try {
      await orderApi.updateOrderStatus(orderId, newState);
      // 상태 변경 후 주문 목록 새로고침
      const response = await orderApi.getOrderList();
      setOrders(response);
    } catch (error) {
      console.error("주문 상태 변경 중 오류 발생:", error);
      alert("주문 상태 변경에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.mainContent}>
          {/* 페이지 헤더 */}
          <div className={styles.pageHeader}>
            <h1>주문 관리</h1>
          </div>

          {/* 검색 섹션 */}
          <div className={styles.filterSection}>
            <div className={styles.searchContainer}>
              {/* 검색 타입 버튼 - 첫 번째 줄 */}
              <div className={styles.searchTypeButtons}>
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
              {/* 검색 타입 버튼 - 두 번째 줄 */}
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
                  물품명
                </button>
                <button
                  className={`${styles.searchTypeButton} ${searchType === "payment" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("payment")}
                >
                  결제수단
                </button>
              </div>
              {/* 검색 입력창 */}
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

          {/* 주문 목록 테이블 */}
          <div className={styles.tableContainer}>
            {loading ? (
              // 로딩 상태 표시
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
              // 주문 목록 테이블
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
                          <select
                            value={order.orderState}
                            onChange={e =>
                              handleOrderStateChange(
                                order.orderId,
                                parseInt(e.target.value),
                              )
                            }
                            className={`${styles.statusSelect} ${getOrderStatusClass(
                              order.orderState,
                              styles,
                            )}`}
                          >
                            <option value={0}>주문완료</option>
                            <option value={1}>주문취소</option>
                            <option value={2}>배송중</option>
                            <option value={3}>배송완료</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 페이지네이션 */}
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
