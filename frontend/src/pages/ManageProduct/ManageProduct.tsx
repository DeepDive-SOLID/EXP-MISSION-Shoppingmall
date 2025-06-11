import { useState, useEffect } from "react";
import Header from "../../components/common/Header/Header";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import styles from "./ManageProduct.module.scss";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiCheck,
  FiAlertTriangle,
} from "react-icons/fi";
import { product1 } from "../../assets";
import { productApi, Product as ProductType } from "../../api/mockApi";

const ManageProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"name" | "code" | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductType | null>(
    null,
  );
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({
    product_name: "",
    product_price: "",
    product_amount: "",
  });
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    product_price: "",
    product_amount: "",
    product_sold: false,
    product_img: "",
    product_upload_dt: new Date().toISOString().split("T")[0],
    product_update_dt: new Date().toISOString().split("T")[0],
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

  // API에서 물품 데이터 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getAll();
        setProducts(data);
      } catch (error) {
        console.error("물품 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleSearchTypeChange = (type: "name" | "code" | "all") => {
    setSearchType(type);
    setCurrentPage(1); // 검색 유형 변경 시 첫 페이지로 이동
  };

  const handleToggleSoldOut = async (id: number) => {
    try {
      // 현재 제품 찾기
      const product = products.find(p => p.product_id === id);
      if (!product) return;

      // API 호출하여 품절 상태 업데이트
      const updatedProduct = await productApi.update(id, {
        product_sold: !product.product_sold,
      });

      // 상태 업데이트
      if (updatedProduct) {
        setProducts(prevProducts =>
          prevProducts.map(p =>
            p.product_id === id ? { ...p, product_sold: !p.product_sold } : p,
          ),
        );
      }
    } catch (error) {
      console.error("품절 상태 변경 중 오류 발생:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewProduct({
      product_name: "",
      product_price: "",
      product_amount: "",
      product_sold: false,
      product_img: "",
      product_upload_dt: new Date().toISOString().split("T")[0],
      product_update_dt: new Date().toISOString().split("T")[0],
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
      product_img: imageId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 폼 데이터를 API 형식에 맞게 변환
      const productData = {
        product_name: newProduct.product_name,
        product_price: parseInt(newProduct.product_price),
        product_amount: parseInt(newProduct.product_amount),
        product_sold: newProduct.product_sold,
        product_img: newProduct.product_img || "product1", // 기본 이미지 설정
        product_upload_dt: newProduct.product_upload_dt,
        product_update_dt: newProduct.product_update_dt,
      };

      // API 호출하여 새 물품 추가
      const createdProduct = await productApi.create(productData);

      // 상태 업데이트
      if (createdProduct) {
        setProducts(prevProducts => [...prevProducts, createdProduct]);
        console.log("새 물품 추가 성공:", createdProduct);
      }

      // 모달 닫기
      closeModal();
    } catch (error) {
      console.error("물품 추가 중 오류 발생:", error);
    }
  };

  // 수정 모드 시작
  const handleEditClick = (product: ProductType) => {
    setEditingId(product.product_id);
    setEditFormData({
      product_name: product.product_name,
      product_price: product.product_price.toString(),
      product_amount: product.product_amount.toString(),
    });
  };

  // 수정 중인 입력값 변경 처리
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  // 수정 저장
  const handleSaveEdit = async (id: number) => {
    try {
      // 업데이트할 데이터 준비
      const updatedData = {
        product_name: editFormData.product_name,
        product_price: parseInt(editFormData.product_price),
        product_amount: parseInt(editFormData.product_amount),
        product_update_dt: new Date().toISOString().split("T")[0],
      };

      // API 호출하여 데이터 업데이트
      const updatedProduct = await productApi.update(id, updatedData);

      // 상태 업데이트
      if (updatedProduct) {
        setProducts(prevProducts =>
          prevProducts.map(p =>
            p.product_id === id ? { ...p, ...updatedData } : p,
          ),
        );
        setEditingId(null);
      }
    } catch (error) {
      console.error("물품 수정 중 오류 발생:", error);
    }
  };

  // 삭제 모달 열기
  const handleDeleteClick = (product: ProductType) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  // 삭제 모달 닫기
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  // 삭제 확인
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      // API 호출하여 데이터 삭제
      const success = await productApi.delete(productToDelete.product_id);

      // 상태 업데이트
      if (success) {
        setProducts(prevProducts =>
          prevProducts.filter(p => p.product_id !== productToDelete.product_id),
        );
        console.log(`물품 ID ${productToDelete.product_id} 삭제 성공`);
      }

      // 모달 닫기
      handleCloseDeleteModal();
    } catch (error) {
      console.error("물품 삭제 중 오류 발생:", error);
    }
  };

  // 검색어로 필터링
  const filteredProducts = products.filter(product => {
    if (searchTerm === "") return true;

    const searchTermLower = searchTerm.toLowerCase();
    const nameMatch = product.product_name
      .toLowerCase()
      .includes(searchTermLower);
    const codeMatch = product.product_id.toString().includes(searchTerm);

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
                  placeholder="검색어를 입력하세요"
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
                    <tr key={product.product_id}>
                      <td>{product.product_id}</td>
                      <td>
                        {editingId === product.product_id ? (
                          <input
                            type="text"
                            name="product_name"
                            value={editFormData.product_name}
                            onChange={handleEditInputChange}
                            className={styles.editInput}
                            style={{ minWidth: "150px" }}
                          />
                        ) : (
                          product.product_name
                        )}
                      </td>
                      <td>
                        {editingId === product.product_id ? (
                          <input
                            type="number"
                            name="product_price"
                            value={editFormData.product_price}
                            onChange={handleEditInputChange}
                            className={styles.editInput}
                            style={{ minWidth: "80px" }}
                          />
                        ) : (
                          `${product.product_price.toLocaleString()}원`
                        )}
                      </td>
                      <td>
                        {editingId === product.product_id ? (
                          <input
                            type="number"
                            name="product_amount"
                            value={editFormData.product_amount}
                            onChange={handleEditInputChange}
                            className={styles.editInput}
                            style={{ minWidth: "60px" }}
                          />
                        ) : (
                          product.product_amount
                        )}
                      </td>
                      <td>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={product.product_sold}
                            onChange={() =>
                              handleToggleSoldOut(product.product_id)
                            }
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </td>
                      <td>
                        <div className={styles.actionButtons}>
                          {editingId === product.product_id ? (
                            <>
                              <button
                                className={styles.saveButton}
                                onClick={() =>
                                  handleSaveEdit(product.product_id)
                                }
                                title="저장"
                              >
                                <FiCheck />
                              </button>
                              <button
                                className={styles.editCancelButton}
                                onClick={handleCancelEdit}
                                title="취소"
                              >
                                <FiX />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className={styles.editButton}
                                onClick={() => handleEditClick(product)}
                                title="수정"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                className={styles.deleteButton}
                                onClick={() => handleDeleteClick(product)}
                                title="삭제"
                              >
                                <FiTrash2 />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                    <label htmlFor="product_name">물품명</label>
                    <input
                      type="text"
                      id="product_name"
                      name="product_name"
                      value={newProduct.product_name}
                      onChange={handleInputChange}
                      placeholder="물품명을 입력하세요"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="product_price">금액</label>
                    <input
                      type="number"
                      id="product_price"
                      name="product_price"
                      value={newProduct.product_price}
                      onChange={handleInputChange}
                      placeholder="금액을 입력하세요"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="product_amount">수량</label>
                    <input
                      type="number"
                      id="product_amount"
                      name="product_amount"
                      value={newProduct.product_amount}
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
                          className={`${styles.imageOption} ${newProduct.product_img === img.id ? styles.selected : ""}`}
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
                        name="product_sold"
                        checked={newProduct.product_sold}
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

          {/* 삭제 확인 모달 */}
          {isDeleteModalOpen && productToDelete && (
            <div className={styles.modalOverlay}>
              <div className={styles.deleteModal}>
                <div className={styles.deleteModalHeader}>
                  <FiAlertTriangle className={styles.alertIcon} />
                  <h2>물품 삭제</h2>
                </div>
                <div className={styles.deleteModalContent}>
                  <p>
                    <strong>{productToDelete.product_name}</strong> 물품을
                    삭제하시겠습니까?
                  </p>
                  <p className={styles.deleteWarning}>
                    삭제된 데이터는 복구할 수 없습니다.
                  </p>
                </div>
                <div className={styles.deleteModalActions}>
                  <button
                    className={styles.cancelDeleteButton}
                    onClick={handleCloseDeleteModal}
                  >
                    취소
                  </button>
                  <button
                    className={styles.confirmDeleteButton}
                    onClick={handleConfirmDelete}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
