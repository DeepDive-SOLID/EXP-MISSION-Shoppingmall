import { useState } from "react";
import Header from "../../components/common/Header/Header";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import styles from "./ManageProduct.module.scss";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { product1 } from "../../assets";

const ManageProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"name" | "code" | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    soldOut: false,
    image: "",
  });
  const itemsPerPage = 10;

  // 이미지 목록
  const productImages = [
    { id: "product1", src: product1, name: "여행용 캐리어" },
    { id: "product2", src: product1, name: "여행용 목베개" },
    { id: "product3", src: product1, name: "방수 파우치" },
    { id: "product4", src: product1, name: "여행용 어댑터" },
    { id: "product5", src: product1, name: "휴대용 공기청정기" },
  ];

  // Mock data for products
  const products = [
    {
      id: 1,
      name: "여행용 캐리어 20인치",
      price: 59000,
      stock: 25,
      soldOut: false,
      image: "product1",
    },
    {
      id: 2,
      name: "여행용 목베개",
      price: 15000,
      stock: 42,
      soldOut: false,
      image: "product2",
    },
    {
      id: 3,
      name: "방수 파우치 세트",
      price: 12000,
      stock: 30,
      soldOut: false,
      image: "product3",
    },
    {
      id: 4,
      name: "여행용 어댑터",
      price: 25000,
      stock: 15,
      soldOut: false,
      image: "product4",
    },
    {
      id: 5,
      name: "휴대용 공기청정기",
      price: 89000,
      stock: 0,
      soldOut: true,
      image: "product5",
    },
    {
      id: 6,
      name: "여행용 세면도구 세트",
      price: 18000,
      stock: 50,
      soldOut: false,
      image: "product1",
    },
    {
      id: 7,
      name: "접이식 여행 가방",
      price: 32000,
      stock: 0,
      soldOut: true,
      image: "product2",
    },
    {
      id: 8,
      name: "여행용 디지털 저울",
      price: 15000,
      stock: 22,
      soldOut: false,
      image: "product3",
    },
    {
      id: 9,
      name: "휴대용 선풍기",
      price: 24000,
      stock: 18,
      soldOut: false,
      image: "product4",
    },
    {
      id: 10,
      name: "여권 케이스",
      price: 9000,
      stock: 40,
      soldOut: false,
      image: "product5",
    },
    {
      id: 11,
      name: "여행용 멀티 충전기",
      price: 35000,
      stock: 0,
      soldOut: true,
      image: "product1",
    },
    {
      id: 12,
      name: "목걸이형 카메라",
      price: 120000,
      stock: 5,
      soldOut: false,
      image: "product2",
    },
    // 추가 데이터 (페이지네이션 테스트용)
    {
      id: 13,
      name: "여행용 슬리퍼",
      price: 8000,
      stock: 60,
      soldOut: false,
      image: "product3",
    },
    {
      id: 14,
      name: "휴대용 세탁비누",
      price: 3000,
      stock: 100,
      soldOut: false,
      image: "product4",
    },
    {
      id: 15,
      name: "여행용 압축팩",
      price: 12000,
      stock: 45,
      soldOut: false,
      image: "product5",
    },
    {
      id: 16,
      name: "접이식 모자",
      price: 15000,
      stock: 30,
      soldOut: false,
      image: "product1",
    },
    {
      id: 17,
      name: "여행용 우산",
      price: 12000,
      stock: 0,
      soldOut: true,
      image: "product2",
    },
    {
      id: 18,
      name: "미니 손전등",
      price: 9000,
      stock: 25,
      soldOut: false,
      image: "product3",
    },
    {
      id: 19,
      name: "여행용 구급함",
      price: 18000,
      stock: 15,
      soldOut: false,
      image: "product4",
    },
    {
      id: 20,
      name: "넥 파우치",
      price: 7000,
      stock: 50,
      soldOut: false,
      image: "product5",
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
    console.log(`상품 ID ${id}의 품절 상태 변경`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewProduct({
      name: "",
      price: "",
      stock: "",
      soldOut: false,
      image: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageSelect = (imageId: string) => {
    setNewProduct(prev => ({
      ...prev,
      image: imageId,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 구현에서는 API 호출 등으로 처리
    console.log("새 물품 추가:", newProduct);
    closeModal();
  };

  // 검색어로 필터링
  const filteredProducts = products.filter(product => {
    if (searchTerm === "") return true;

    const searchTermLower = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(searchTermLower);
    const codeMatch = product.id.toString().includes(searchTerm);

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
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

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
            <h1>물품 관리</h1>
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
                  물품명
                </button>
                <button
                  className={`${styles.searchTypeButton} ${searchType === "code" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("code")}
                >
                  물품코드
                </button>
              </div>
              <div className={styles.searchBox}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={
                    searchType === "name"
                      ? "물품명을 검색하세요"
                      : searchType === "code"
                        ? "물품코드를 검색하세요"
                        : "물품명 또는 코드를 검색하세요"
                  }
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <button className={styles.addButton} onClick={openModal}>
              <FiPlus /> 물품 추가
            </button>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.productTable}>
              <thead>
                <tr>
                  <th>물품코드</th>
                  <th>물품명</th>
                  <th>금액</th>
                  <th>수량</th>
                  <th>품절여부</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price.toLocaleString()}원</td>
                    <td>{product.stock}</td>
                    <td>
                      <label className={styles.toggleSwitch}>
                        <input
                          type="checkbox"
                          checked={product.soldOut}
                          onChange={() => handleToggleSoldOut(product.id)}
                        />
                        <span className={styles.slider}></span>
                        <span className={styles.statusText}>
                          {product.soldOut ? "품절" : "판매중"}
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
                  <h2>물품 추가</h2>
                  <button className={styles.closeButton} onClick={closeModal}>
                    <FiX />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className={styles.modalForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">물품명</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      placeholder="물품명을 입력하세요"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="price">금액</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      placeholder="금액을 입력하세요"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="stock">수량</label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={newProduct.stock}
                      onChange={handleInputChange}
                      placeholder="수량을 입력하세요"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>이미지 선택</label>
                    <div className={styles.imageSelector}>
                      {productImages.map(img => (
                        <div
                          key={img.id}
                          className={`${styles.imageOption} ${newProduct.image === img.id ? styles.selected : ""}`}
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
                        checked={newProduct.soldOut}
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

export default ManageProduct;
