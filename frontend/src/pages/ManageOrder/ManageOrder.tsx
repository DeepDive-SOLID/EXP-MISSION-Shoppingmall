import { useState, useEffect } from "react";
import Header from "../../components/common/Header/Header";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import styles from "./ManageOrder.module.scss";
import { FiSearch } from "react-icons/fi";
import { orderApi, Order } from "../../api/mockApi";

const ManageOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<
    | "orderId"
    | "orderDate"
    | "orderStatus"
    | "memberId"
    | "product"
    | "address"
    | "quantity"
    | "payment"
    | "all"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  // API에서 주문 데이터 가져오기
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderApi.getAll();
        setOrders(data);
      } catch (error) {
        console.error("주문 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleSearchTypeChange = (
    type:
      | "orderId"
      | "orderDate"
      | "orderStatus"
      | "memberId"
      | "product"
      | "address"
      | "quantity"
      | "payment"
      | "all",
  ) => {
    setSearchType(type);
    setCurrentPage(1); // 검색 유형 변경 시 첫 페이지로 이동
  };

  // 주문 상태 번호를 텍스트로 변환
  const getOrderStatusText = (status: number): string => {
    switch (status) {
      case 0:
        return "주문완료";
      case 1:
        return "주문취소";
      case 2:
        return "배송중";
      case 3:
        return "배송완료";
      default:
        return "알 수 없음";
    }
  };

  // 검색어로 필터링
  const filteredOrders = orders.filter(order => {
    if (searchTerm === "") return true;

    const searchTermLower = searchTerm.toLowerCase();
    let quantityStr;

    switch (searchType) {
      case "orderId":
        return order.order_id.toString().includes(searchTerm);
      case "orderDate":
        return order.order_dt.includes(searchTerm);
      case "orderStatus":
        return getOrderStatusText(order.order_state)
          .toLowerCase()
          .includes(searchTermLower);
      case "memberId":
        return order.member_id.toLowerCase().includes(searchTermLower);
      case "product":
        return (
          (order.product?.product_name || "")
            .toLowerCase()
            .includes(searchTermLower) ||
          (order.travel_product?.travel_name || "")
            .toLowerCase()
            .includes(searchTermLower)
        );
      case "address":
        return (
          order.order_addr.toLowerCase().includes(searchTermLower) ||
          order.order_addr_detail.toLowerCase().includes(searchTermLower)
        );
      case "payment":
        return (order.payment_name || "")
          .toLowerCase()
          .includes(searchTermLower);
      case "quantity":
        quantityStr = `${order.travel_product?.order_travel_amount || 0}${order.product?.order_product_amount || 0}`;
        return quantityStr.includes(searchTerm);
      case "all":
      default:
        return (
          order.order_id.toString().includes(searchTerm) ||
          order.order_dt.includes(searchTerm) ||
          getOrderStatusText(order.order_state)
            .toLowerCase()
            .includes(searchTermLower) ||
          order.member_id.toLowerCase().includes(searchTermLower) ||
          (order.product?.product_name || "")
            .toLowerCase()
            .includes(searchTermLower) ||
          (order.travel_product?.travel_name || "")
            .toLowerCase()
            .includes(searchTermLower) ||
          order.order_addr.toLowerCase().includes(searchTermLower) ||
          order.order_addr_detail.toLowerCase().includes(searchTermLower) ||
          (order.payment_name || "").toLowerCase().includes(searchTermLower)
        );
    }
  });

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

  // 주문 상태에 따른 스타일 클래스 반환
  const getOrderStatusClass = (status: number) => {
    switch (status) {
      case 0:
        return styles.statusPaid;
      case 2:
        return styles.statusShipping;
      case 3:
        return styles.statusDelivered;
      case 1:
        return styles.statusCancelled;
      default:
        return "";
    }
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
                  className={`${styles.searchTypeButton} ${searchType === "address" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("address")}
                >
                  주소
                </button>
              </div>
              <div className={styles.searchBox}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  value={searchTerm}
                  onChange={handleSearch}
                />
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
                      <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>{order.travel_product?.travel_name || "-"}</td>
                        <td>{order.product?.product_name || "-"}</td>
                        <td>{order.member_id}</td>
                        <td>{order.payment_name || "-"}</td>
                        <td>
                          {order.travel_product?.order_travel_amount || 0}
                        </td>
                        <td>{order.product?.order_product_amount || 0}</td>
                        <td>{order.order_dt}</td>
                        <td>
                          <span
                            className={`${styles.statusTag} ${getOrderStatusClass(order.order_state)}`}
                          >
                            {getOrderStatusText(order.order_state)}
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
