import { useState } from "react";
import Header from "../../components/common/Header/Header";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import styles from "./ManageOrder.module.scss";
import { FiSearch } from "react-icons/fi";

const ManageOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<
    | "orderNumber"
    | "orderDate"
    | "orderStatus"
    | "userId"
    | "product"
    | "price"
    | "quantity"
    | "packageOrderNumber"
    | "all"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for orders
  const orders = [
    {
      orderNumber: "1",
      travelProductName: "제주도 3박 4일 패키지",
      productName: "여행용 캐리어 20인치",
      userId: "user001",
      paymentMethod: "신용카드",
      travelQuantity: 2,
      productQuantity: 1,
      orderDate: "2023-05-01",
      orderStatus: "결제완료",
    },
    {
      orderNumber: "2",
      travelProductName: "부산 2박 3일 패키지",
      productName: "여행용 목베개",
      userId: "user002",
      paymentMethod: "무통장입금",
      travelQuantity: 1,
      productQuantity: 2,
      orderDate: "2023-05-02",
      orderStatus: "배송중",
    },
    {
      orderNumber: "3",
      travelProductName: "강원도 스키 패키지",
      productName: "방수 파우치 세트",
      userId: "user003",
      paymentMethod: "카카오페이",
      travelQuantity: 4,
      productQuantity: 2,
      orderDate: "2023-05-03",
      orderStatus: "배송완료",
    },
    {
      orderNumber: "4",
      travelProductName: "일본 오사카 5박 6일",
      productName: "여행용 어댑터",
      userId: "user004",
      paymentMethod: "신용카드",
      travelQuantity: 2,
      productQuantity: 3,
      orderDate: "2023-05-04",
      orderStatus: "결제완료",
    },
    {
      orderNumber: "5",
      travelProductName: "태국 방콕 패키지",
      productName: "휴대용 공기청정기",
      userId: "user005",
      paymentMethod: "네이버페이",
      travelQuantity: 2,
      productQuantity: 1,
      orderDate: "2023-05-05",
      orderStatus: "취소요청",
    },
    {
      orderNumber: "6",
      travelProductName: "하와이 일주일 패키지",
      productName: "여행용 세면도구 세트",
      userId: "user006",
      paymentMethod: "신용카드",
      travelQuantity: 2,
      productQuantity: 2,
      orderDate: "2023-05-06",
      orderStatus: "결제완료",
    },
    {
      orderNumber: "7",
      travelProductName: "홍콩 3박 4일 패키지",
      productName: "접이식 여행 가방",
      userId: "user007",
      paymentMethod: "무통장입금",
      travelQuantity: 1,
      productQuantity: 1,
      orderDate: "2023-05-07",
      orderStatus: "배송중",
    },
    {
      orderNumber: "8",
      travelProductName: "유럽 10일 패키지",
      productName: "여행용 디지털 저울",
      userId: "user008",
      paymentMethod: "카카오페이",
      travelQuantity: 2,
      productQuantity: 1,
      orderDate: "2023-05-08",
      orderStatus: "결제완료",
    },
    {
      orderNumber: "9",
      travelProductName: "베트남 다낭 패키지",
      productName: "휴대용 선풍기",
      userId: "user009",
      paymentMethod: "신용카드",
      travelQuantity: 3,
      productQuantity: 3,
      orderDate: "2023-05-09",
      orderStatus: "배송완료",
    },
    {
      orderNumber: "10",
      travelProductName: "싱가포르 4박 5일",
      productName: "여권 케이스",
      userId: "user010",
      paymentMethod: "네이버페이",
      travelQuantity: 2,
      productQuantity: 2,
      orderDate: "2023-05-10",
      orderStatus: "결제완료",
    },
    {
      orderNumber: "11",
      travelProductName: "대만 3박 4일 패키지",
      productName: "여행용 멀티 충전기",
      userId: "user011",
      paymentMethod: "카카오페이",
      travelQuantity: 1,
      productQuantity: 1,
      orderDate: "2023-05-11",
      orderStatus: "배송중",
    },
    {
      orderNumber: "12",
      travelProductName: "호주 시드니 패키지",
      productName: "목걸이형 카메라",
      userId: "user012",
      paymentMethod: "신용카드",
      travelQuantity: 2,
      productQuantity: 1,
      orderDate: "2023-05-12",
      orderStatus: "결제완료",
    },
    {
      orderNumber: "13",
      travelProductName: "뉴질랜드 패키지",
      productName: "여행용 슬리퍼",
      userId: "user013",
      paymentMethod: "무통장입금",
      travelQuantity: 2,
      productQuantity: 2,
      orderDate: "2023-05-13",
      orderStatus: "취소완료",
    },
    {
      orderNumber: "14",
      travelProductName: "중국 상하이 패키지",
      productName: "휴대용 세탁비누",
      userId: "user014",
      paymentMethod: "네이버페이",
      travelQuantity: 4,
      productQuantity: 4,
      orderDate: "2023-05-14",
      orderStatus: "결제완료",
    },
    {
      orderNumber: "15",
      travelProductName: "필리핀 세부 패키지",
      productName: "여행용 압축팩",
      userId: "user015",
      paymentMethod: "카카오페이",
      travelQuantity: 2,
      productQuantity: 2,
      orderDate: "2023-05-15",
      orderStatus: "배송완료",
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleSearchTypeChange = (
    type:
      | "orderNumber"
      | "orderDate"
      | "orderStatus"
      | "userId"
      | "product"
      | "price"
      | "quantity"
      | "packageOrderNumber"
      | "all",
  ) => {
    setSearchType(type);
    setCurrentPage(1); // 검색 유형 변경 시 첫 페이지로 이동
  };

  // 검색어로 필터링
  const filteredOrders = orders.filter(order => {
    if (searchTerm === "") return true;

    const searchTermLower = searchTerm.toLowerCase();
    let quantityStr;

    switch (searchType) {
      case "orderNumber":
        return order.orderNumber.toLowerCase().includes(searchTermLower);
      case "orderDate":
        return order.orderDate.includes(searchTerm);
      case "orderStatus":
        return order.orderStatus.toLowerCase().includes(searchTermLower);
      case "userId":
        return order.userId.toLowerCase().includes(searchTermLower);
      case "product":
        return (
          order.productName.toLowerCase().includes(searchTermLower) ||
          order.travelProductName.toLowerCase().includes(searchTermLower)
        );
      case "quantity":
        quantityStr = `${order.productQuantity}` + `${order.travelQuantity}`;
        return quantityStr.includes(searchTerm);
      case "all":
      default:
        return (
          order.orderNumber.toLowerCase().includes(searchTermLower) ||
          order.orderDate.includes(searchTerm) ||
          order.orderStatus.toLowerCase().includes(searchTermLower) ||
          order.userId.toLowerCase().includes(searchTermLower) ||
          order.productName.toLowerCase().includes(searchTermLower) ||
          order.travelProductName.toLowerCase().includes(searchTermLower) ||
          order.paymentMethod.toLowerCase().includes(searchTermLower)
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
  const getOrderStatusClass = (status: string) => {
    switch (status) {
      case "결제완료":
        return styles.statusPaid;
      case "배송중":
        return styles.statusShipping;
      case "배송완료":
        return styles.statusDelivered;
      case "취소요청":
        return styles.statusCancelRequested;
      case "취소완료":
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
                  className={`${styles.searchTypeButton} ${searchType === "orderNumber" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("orderNumber")}
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
                  className={`${styles.searchTypeButton} ${searchType === "userId" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("userId")}
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
                  className={`${styles.searchTypeButton} ${searchType === "quantity" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("quantity")}
                >
                  수량
                </button>
                <button
                  className={`${styles.searchTypeButton} ${searchType === "packageOrderNumber" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("packageOrderNumber")}
                >
                  패키지번호
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
                    <tr key={order.orderNumber}>
                      <td>{order.orderNumber}</td>
                      <td>{order.travelProductName}</td>
                      <td>{order.productName}</td>
                      <td>{order.userId}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{order.travelQuantity}</td>
                      <td>{order.productQuantity}</td>
                      <td>{order.orderDate}</td>
                      <td>
                        <span
                          className={`${styles.statusTag} ${getOrderStatusClass(order.orderStatus)}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
