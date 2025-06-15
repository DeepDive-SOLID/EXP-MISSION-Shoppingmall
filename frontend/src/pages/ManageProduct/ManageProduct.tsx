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
import api from "../../api/axios";
import { Product, ProductSearchType } from "../../types/product";
import { getToday } from "../../utils/formatDate";
import product1 from "../../assets/images/carrier.jpg";
import pilow from "../../assets/images/pilow.jpg";
import travelkit from "../../assets/images/travelkit.jpg";
import snorkel from "../../assets/images/snorkel.jpg";
import umbrella from "../../assets/images/umbrella.jpg";

interface ProductListDto {
  productId: number;
  productName: string;
  productPrice: number;
  productAmount: number;
  productSold: boolean;
  productUploadDt?: string;
  productUpdateDt?: string;
  productImg?: string;
}

// API 응답 데이터를 Product 타입으로 변환하는 함수
const transformApiProduct = (item: ProductListDto): Product => ({
  product_id: item.productId,
  product_name: item.productName,
  product_price: item.productPrice,
  product_amount: item.productAmount,
  product_sold: item.productSold,
  product_upload_dt: item.productUploadDt || "",
  product_update_dt: item.productUpdateDt || "",
  product_img: item.productImg || "",
});

// 이미지 목록
const productImages = [
  { id: "carrier", src: product1 },
  { id: "pilow", src: pilow },
  { id: "travelkit", src: travelkit },
  { id: "snorkel", src: snorkel },
  { id: "umbrella", src: umbrella },
];

const ManageProduct = () => {
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<ProductSearchType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
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
    product_upload_dt: getToday(),
    product_update_dt: getToday(),
  });
  const itemsPerPage = 10;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      setLoading(true);
      setCurrentPage(1);

      type SearchParams = { productId?: string; productName?: string };
      let searchParams: SearchParams = {};
      if (tempSearchTerm) {
        switch (searchType) {
          case "name":
            searchParams = { productName: tempSearchTerm };
            break;
          case "code":
            if (!isNaN(Number(tempSearchTerm))) {
              searchParams = { productId: tempSearchTerm };
            }
            break;
          case "all":
            searchParams = { productName: tempSearchTerm };
            if (!isNaN(Number(tempSearchTerm))) {
              searchParams.productId = tempSearchTerm;
            }
            break;
        }
      }

      const response = await api.post<ProductListDto[]>(
        "/admin/product/searchProductList",
        searchParams, // data 옵션 제거하고 직접 body로 전달
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (Array.isArray(response.data)) {
        const transformedData = response.data.map((item: ProductListDto) => ({
          product_id: item.productId,
          product_name: item.productName,
          product_price: item.productPrice,
          product_amount: item.productAmount,
          product_sold: item.productSold,
          // 타입 에러를 해결하기 위해 임시로 빈 문자열로 설정
          product_upload_dt: "",
          product_update_dt: "",
          product_img: "",
        }));
        setFilteredProducts(transformedData);
      } else {
        setFilteredProducts([]);
      }
    } catch {
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSearchTypeChange = (type: ProductSearchType) => {
    setSearchType(type);
    setCurrentPage(1);
    if (tempSearchTerm) {
      handleSearchSubmit();
    }
  };

  // API에서 물품 데이터 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/admin/product/getProductList");

        if (Array.isArray(response.data)) {
          const transformedData = response.data.map(transformApiProduct);
          setProducts(transformedData);
          setFilteredProducts(transformedData);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          const transformedData = response.data.data.map(transformApiProduct);
          setProducts(transformedData);
          setFilteredProducts(transformedData);
        } else {
          console.warn("API 응답에서 유효한 데이터를 찾을 수 없습니다.");
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("물품 데이터를 가져오는 중 오류 발생:", error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleToggleSoldOut = async (id: number) => {
    try {
      // 현재 제품 찾기
      const product = products.find(p => p.product_id === id);
      if (!product) return;

      // 업데이트할 데이터 준비
      const productDto = {
        productId: id,
        productName: product.product_name,
        productPrice: product.product_price,
        productAmount: product.product_amount,
        productSold: !product.product_sold, // 품절 상태 변경
        productImg: product.product_img,
        productUploadDt: product.product_upload_dt,
        productUpdateDt: getToday(),
      };

      console.log("품절 상태 변경 요청 데이터:", productDto);

      // PUT 요청으로 변경
      const response = await api.put(
        "/admin/product/updateProductDto",
        productDto,
      );
      console.log("품절 상태 변경 응답:", response.data);

      // 물품 목록 다시 불러오기
      await refreshProductList();
    } catch (error) {
      console.error("품절 상태 변경 중 오류 발생:", error);

      // 임시 상태 업데이트 (API 실패 시에도 UI 반응성 유지)
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.product_id === id ? { ...p, product_sold: !p.product_sold } : p,
        ),
      );
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
      product_upload_dt: getToday(),
      product_update_dt: getToday(),
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
        productName: newProduct.product_name,
        productPrice: parseInt(newProduct.product_price),
        productAmount: parseInt(newProduct.product_amount),
        productSold: false, // 항상 false로 설정
        productImg: newProduct.product_img || "carrier", // 기본 이미지 설정
        productUploadDt: newProduct.product_upload_dt,
        productUpdateDt: newProduct.product_update_dt,
      };

      console.log("물품 추가 요청 데이터:", productData);

      const response = await api.post(
        "/admin/product/addProductDto",
        productData,
      );
      console.log("물품 추가 응답:", response.data);

      // 물품 목록 다시 불러오기
      await refreshProductList();

      // 모달 닫기
      closeModal();
    } catch (error) {
      console.error("물품 추가 중 오류 발생:", error);
    }
  };

  // 물품 목록 새로고침 함수
  const refreshProductList = async () => {
    try {
      const productsResponse = await api.get("/admin/product/getProductList");

      if (Array.isArray(productsResponse.data)) {
        const transformedData = productsResponse.data.map(transformApiProduct);
        setProducts(transformedData);
        setFilteredProducts(transformedData);
      }

      console.log("물품 목록 새로고침 성공");
    } catch (error) {
      console.error("물품 목록 새로고침 실패:", error);
    }
  };

  // 수정 모드 시작
  const handleEditClick = (product: Product) => {
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
      // 현재 제품 찾기
      const currentProduct = products.find(p => p.product_id === id);
      if (!currentProduct) return;

      const productData = {
        productId: id,
        productName: editFormData.product_name,
        productPrice: parseInt(editFormData.product_price),
        productAmount: parseInt(editFormData.product_amount),
        productSold: currentProduct.product_sold,
        productUpdateDt: getToday(),
      };

      console.log("물품 수정 요청 데이터:", productData);

      // PUT 요청으로 수정
      const response = await api.put(
        "/admin/product/updateProductDto",
        productData,
      );
      console.log("물품 수정 응답:", response.data);

      // 물품 목록 다시 불러오기
      await refreshProductList();
      setEditingId(null);
    } catch (error) {
      console.error("물품 수정 중 오류 발생:", error);
    }
  };

  // 삭제 모달 열기
  const handleDeleteClick = (product: Product) => {
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
      const productId = productToDelete.product_id;
      console.log("물품 삭제 요청 데이터:", productId);

      // DELETE 요청으로 변경
      const response = await api.delete("/admin/product/deleteProductDto", {
        data: productId,
      });

      console.log("물품 삭제 응답:", response.data);

      // 삭제 성공 처리
      handleDeleteSuccess(productId);

      // 모달 닫기
      handleCloseDeleteModal();
    } catch (error) {
      console.error("물품 삭제 중 오류 발생:", error);
      // 실패 시 UI 업데이트하지 않고 모달만 닫음
      handleCloseDeleteModal();
    }
  };

  // 삭제 성공 처리 함수
  const handleDeleteSuccess = (productId: number) => {
    // 상태 업데이트
    setProducts(prevProducts =>
      prevProducts.filter(p => p.product_id !== productId),
    );
    console.log(`물품 ID ${productId} 삭제 성공`);
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // 현재 표시되는 아이템 디버깅
  console.log("현재 페이지:", currentPage);
  console.log("페이지당 아이템 수:", itemsPerPage);
  console.log("현재 표시되는 아이템:", currentItems);

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
                          <img src={img.src} alt={img.id} />
                        </div>
                      ))}
                    </div>
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
