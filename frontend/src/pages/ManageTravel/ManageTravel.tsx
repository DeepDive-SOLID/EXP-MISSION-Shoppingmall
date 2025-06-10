import { useState } from "react";
import Header from "../../components/common/Header/Header";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import styles from "./ManageTravel.module.scss";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiCalendar,
} from "react-icons/fi";
import { product1 } from "../../assets";

const ManageTravel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"name" | "code" | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTravel, setNewTravel] = useState({
    name: "",
    price: "",
    capacity: "",
    soldOut: false,
    image: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const itemsPerPage = 10;

  // 이미지 목록
  const travelImages = [
    { id: "product1", src: product1, name: "제주도 여행" },
    { id: "product2", src: product1, name: "부산 여행" },
    { id: "product3", src: product1, name: "강원도 여행" },
    { id: "product4", src: product1, name: "서울 여행" },
    { id: "product5", src: product1, name: "경주 여행" },
  ];

  // Mock data for travel products
  const travels = [
    {
      id: 1,
      name: "제주도 3박 4일 패키지",
      price: 590000,
      capacity: 25,
      soldOut: false,
      image: "product1",
      startDate: "2023-07-15",
      endDate: "2023-07-18",
      description: "아름다운 제주도의 자연을 만끽할 수 있는 패키지 여행입니다.",
    },
    {
      id: 2,
      name: "부산 해운대 2박 3일",
      price: 350000,
      capacity: 42,
      soldOut: false,
      image: "product2",
      startDate: "2023-08-05",
      endDate: "2023-08-07",
      description:
        "해운대 해수욕장과 광안리 등 부산의 핵심 관광지를 둘러봅니다.",
    },
    {
      id: 3,
      name: "강원도 스키 여행",
      price: 420000,
      capacity: 30,
      soldOut: false,
      image: "product3",
      startDate: "2023-12-20",
      endDate: "2023-12-22",
      description:
        "겨울 시즌 강원도 최고의 스키장에서 스키와 스노보드를 즐겨보세요.",
    },
    {
      id: 4,
      name: "서울 시티투어 1일",
      price: 150000,
      capacity: 15,
      soldOut: false,
      image: "product4",
      startDate: "2023-09-15",
      endDate: "2023-09-15",
      description:
        "서울의 주요 관광지를 하루 동안 효율적으로 둘러보는 투어입니다.",
    },
    {
      id: 5,
      name: "경주 역사 탐방 2박 3일",
      price: 390000,
      capacity: 0,
      soldOut: true,
      image: "product5",
      startDate: "2023-10-02",
      endDate: "2023-10-04",
      description: "신라 천년 고도 경주의 역사와 문화를 체험하는 여행입니다.",
    },
    {
      id: 6,
      name: "여수 밤바다 2박 3일",
      price: 380000,
      capacity: 50,
      soldOut: false,
      image: "product1",
      startDate: "2023-08-12",
      endDate: "2023-08-14",
      description: "아름다운 여수 밤바다와 오동도, 향일암 등을 관광합니다.",
    },
    {
      id: 7,
      name: "울릉도 독도 3박 4일",
      price: 620000,
      capacity: 0,
      soldOut: true,
      image: "product2",
      startDate: "2023-07-25",
      endDate: "2023-07-28",
      description: "울릉도와 독도의 아름다운 자연 경관을 감상하는 여행입니다.",
    },
    {
      id: 8,
      name: "전주 한옥마을 1박 2일",
      price: 250000,
      capacity: 22,
      soldOut: false,
      image: "product3",
      startDate: "2023-09-22",
      endDate: "2023-09-23",
      description: "전통 한옥에서 하룻밤을 보내고 전주의 맛과 멋을 즐겨보세요.",
    },
    {
      id: 9,
      name: "설악산 트레킹 2박 3일",
      price: 340000,
      capacity: 18,
      soldOut: false,
      image: "product4",
      startDate: "2023-10-13",
      endDate: "2023-10-15",
      description:
        "가을 단풍이 아름다운 설악산에서 트레킹을 즐기는 여행입니다.",
    },
    {
      id: 10,
      name: "통영 케이블카 당일치기",
      price: 190000,
      capacity: 40,
      soldOut: false,
      image: "product5",
      startDate: "2023-08-20",
      endDate: "2023-08-20",
      description:
        "통영의 아름다운 바다 전경을 케이블카에서 감상하는 당일 여행입니다.",
    },
    {
      id: 11,
      name: "대구 근대골목 투어",
      price: 220000,
      capacity: 0,
      soldOut: true,
      image: "product1",
      startDate: "2023-09-05",
      endDate: "2023-09-05",
      description: "대구의 근대 역사를 담은 골목을 탐방하는 당일 투어입니다.",
    },
    {
      id: 12,
      name: "인천 차이나타운 당일치기",
      price: 120000,
      capacity: 35,
      soldOut: false,
      image: "product2",
      startDate: "2023-08-15",
      endDate: "2023-08-15",
      description: "인천 차이나타운과 월미도를 방문하는 당일 여행입니다.",
    },
    // 추가 데이터 (페이지네이션 테스트용)
    {
      id: 13,
      name: "남해 다랭이마을 1박 2일",
      price: 280000,
      capacity: 60,
      soldOut: false,
      image: "product3",
      startDate: "2023-10-21",
      endDate: "2023-10-22",
      description:
        "남해의 아름다운 다랭이마을과 독일마을을 방문하는 여행입니다.",
    },
    {
      id: 14,
      name: "순천만 생태공원 당일치기",
      price: 130000,
      capacity: 100,
      soldOut: false,
      image: "product4",
      startDate: "2023-09-10",
      endDate: "2023-09-10",
      description:
        "순천만 생태공원과 순천만 국가정원을 방문하는 당일 여행입니다.",
    },
    {
      id: 15,
      name: "안동 하회마을 1박 2일",
      price: 220000,
      capacity: 45,
      soldOut: false,
      image: "product5",
      startDate: "2023-10-07",
      endDate: "2023-10-08",
      description:
        "안동 하회마을과 도산서원을 방문하는 전통문화 체험 여행입니다.",
    },
    {
      id: 16,
      name: "포항 호미곶 일출 투어",
      price: 150000,
      capacity: 30,
      soldOut: false,
      image: "product1",
      startDate: "2024-01-01",
      endDate: "2024-01-01",
      description: "새해 첫날 호미곶에서 일출을 감상하는 특별한 투어입니다.",
    },
    {
      id: 17,
      name: "태안 해안도로 드라이브",
      price: 320000,
      capacity: 0,
      soldOut: true,
      image: "product2",
      startDate: "2023-08-26",
      endDate: "2023-08-27",
      description:
        "태안 해안도로를 드라이브하며 아름다운 해변을 감상하는 여행입니다.",
    },
    {
      id: 18,
      name: "속초 해변 2박 3일",
      price: 290000,
      capacity: 25,
      soldOut: false,
      image: "product3",
      startDate: "2023-07-28",
      endDate: "2023-07-30",
      description:
        "속초 해변에서 휴양하고 설악산과 속초 관광지를 둘러보는 여행입니다.",
    },
    {
      id: 19,
      name: "담양 죽녹원 당일치기",
      price: 180000,
      capacity: 15,
      soldOut: false,
      image: "product4",
      startDate: "2023-09-17",
      endDate: "2023-09-17",
      description: "담양 죽녹원과 메타세쿼이아길을 방문하는 당일 여행입니다.",
    },
    {
      id: 20,
      name: "거제도 해수욕장 2박 3일",
      price: 370000,
      capacity: 50,
      soldOut: false,
      image: "product5",
      startDate: "2023-08-18",
      endDate: "2023-08-20",
      description:
        "거제도의 아름다운 해수욕장과 관광지를 둘러보는 여름 휴가 패키지입니다.",
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleSearchTypeChange = (type: "name" | "code" | "all") => {
    setSearchType(type);
    setCurrentPage(1); // 검색 유형 변경 시 첫 페이지로 이동
  };

  const handleToggleSoldOut = (id: number) => {
    // 실제 구현에서는 API 호출 등으로 처리
    console.log(`여행 상품 ID ${id}의 품절 상태 변경`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewTravel({
      name: "",
      price: "",
      capacity: "",
      soldOut: false,
      image: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setNewTravel(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageSelect = (imageId: string) => {
    setNewTravel(prev => ({
      ...prev,
      image: imageId,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 구현에서는 API 호출 등으로 처리
    console.log("새 여행 상품 추가:", newTravel);
    closeModal();
  };

  // 검색어로 필터링
  const filteredTravels = travels.filter(travel => {
    if (searchTerm === "") return true;

    const searchTermLower = searchTerm.toLowerCase();
    const nameMatch = travel.name.toLowerCase().includes(searchTermLower);
    const codeMatch = travel.id.toString().includes(searchTerm);

    switch (searchType) {
      case "name":
        return nameMatch;
      case "code":
        return codeMatch;
      case "all":
      default:
        return nameMatch || codeMatch;
    }
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredTravels.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTravels.slice(indexOfFirstItem, indexOfLastItem);

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
            <h1>여행 상품 관리</h1>
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
                  className={`${styles.searchTypeButton} ${searchType === "name" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("name")}
                >
                  상품명
                </button>
                <button
                  className={`${styles.searchTypeButton} ${searchType === "code" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("code")}
                >
                  상품코드
                </button>
              </div>
              <div className={styles.searchBox}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={
                    searchType === "name"
                      ? "상품명을 검색하세요"
                      : searchType === "code"
                        ? "상품코드를 검색하세요"
                        : "상품명 또는 코드를 검색하세요"
                  }
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <button className={styles.addButton} onClick={openModal}>
              <FiPlus /> 여행 상품 추가
            </button>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.productTable}>
              <thead>
                <tr>
                  <th>상품코드</th>
                  <th>상품명</th>
                  <th>금액</th>
                  <th>정원</th>
                  <th>품절여부</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(travel => (
                  <tr key={travel.id}>
                    <td>{travel.id}</td>
                    <td>{travel.name}</td>
                    <td>{travel.price.toLocaleString()}원</td>
                    <td>{travel.capacity}명</td>
                    <td>
                      <label className={styles.toggleSwitch}>
                        <input
                          type="checkbox"
                          checked={travel.soldOut}
                          onChange={() => handleToggleSoldOut(travel.id)}
                        />
                        <span className={styles.slider}></span>
                        <span className={styles.statusText}>
                          {travel.soldOut ? "품절" : "판매중"}
                        </span>
                      </label>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button className={styles.editButton}>
                          <FiEdit2 />
                        </button>
                        <button className={styles.deleteButton}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

          {isModalOpen && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <div className={styles.modalHeader}>
                  <h2>여행 상품 추가</h2>
                  <button className={styles.closeButton} onClick={closeModal}>
                    <FiX />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className={styles.modalForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">상품명</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newTravel.name}
                      onChange={handleInputChange}
                      placeholder="상품명을 입력하세요"
                      required
                    />
                  </div>

                  <div className={styles.dateRangeContainer}>
                    <div className={styles.formGroup}>
                      <label htmlFor="startDate">시작 날짜</label>
                      <div className={styles.dateInputWrapper}>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={newTravel.startDate}
                          onChange={handleInputChange}
                          required
                        />
                        <FiCalendar className={styles.calendarIcon} />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="endDate">종료 날짜</label>
                      <div className={styles.dateInputWrapper}>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={newTravel.endDate}
                          onChange={handleInputChange}
                          required
                        />
                        <FiCalendar className={styles.calendarIcon} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="price">금액</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={newTravel.price}
                      onChange={handleInputChange}
                      placeholder="금액을 입력하세요"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="capacity">정원</label>
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      value={newTravel.capacity}
                      onChange={handleInputChange}
                      placeholder="정원을 입력하세요"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="description">상품 설명</label>
                    <textarea
                      id="description"
                      name="description"
                      value={newTravel.description}
                      onChange={handleInputChange}
                      placeholder="상품에 대한 설명을 입력하세요"
                      rows={4}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>이미지 선택</label>
                    <div className={styles.imageSelector}>
                      {travelImages.map(img => (
                        <div
                          key={img.id}
                          className={`${styles.imageOption} ${newTravel.image === img.id ? styles.selected : ""}`}
                          onClick={() => handleImageSelect(img.id)}
                        >
                          <img src={img.src} alt={img.name} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="soldOut"
                        checked={newTravel.soldOut}
                        onChange={handleInputChange}
                      />
                      품절 상태로 등록
                    </label>
                  </div>

                  <div className={styles.modalActions}>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={closeModal}
                    >
                      취소
                    </button>
                    <button type="submit" className={styles.submitButton}>
                      등록
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTravel;
