import { useState, useEffect } from "react";
import { AxiosError } from 'axios';
import Header from "../../../components/common/Header_dash/Header";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
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
import { productApi } from "../../../api";
import {
  ProductSearchType,
  Product,
  ProductListDto,
} from "../../../types/admin/product";

import { transformApiProduct } from "../../../utils/productUtils";
import { productImages } from "../../../utils/productImg";


// API 응답 데이터를 Product 타입으로 변환하는 유틸리티 함수
const transformApiProduct = (item: ProductListDto): Product => ({
  product_id: item.productId,
  product_name: item.productName,
  product_price: item.productPrice,
  product_amount: item.productAmount,
  product_sold: item.productSold,
  product_upload_dt: getToday(), // 기본값으로 현재 날짜 사용
  product_update_dt: getToday(), // 기본값으로 현재 날짜 사용
});


const ManageProduct = () => {
  // 상태 관리
  const [tempSearchTerm, setTempSearchTerm] = useState(""); // 검색어 임시 저장
  const [searchType, setSearchType] = useState<ProductSearchType>("name"); // 검색 타입 (물품명/물품코드)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [isModalOpen, setIsModalOpen] = useState(false); // 물품 추가 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 확인 모달 상태
  const [productToDelete, setProductToDelete] = useState<Product | null>(null); // 삭제할 물품 정보
  const [products, setProducts] = useState<Product[]>([]); // 전체 물품 목록
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // 필터링된 물품 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [editingId, setEditingId] = useState<number | null>(null); // 수정 중인 물품 ID
  const [editFormData, setEditFormData] = useState({
    // 수정 폼 데이터
    product_name: "",
    product_price: "",
    product_amount: "",
  });
  const [newProduct, setNewProduct] = useState({
    // 새 물품 데이터
    product_name: "",
    product_price: "",
    product_amount: "",
    product_sold: false,
    product_upload_dt: getToday(),
    product_update_dt: getToday(),
  });
  const itemsPerPage = 10; // 페이지당 표시할 아이템 수

  // 파일 객체 상태
  const [newFile, setNewFile] = useState<File | null>(null);

  // 검색어 입력 처리
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchTerm(e.target.value);
  };

  // 물품 검색 실행
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
        }
      }

      const response = await productApi.searchProductList(searchParams);

      if (Array.isArray(response.data)) {
        const transformedData = response.data.map((item: ProductListDto) => ({
          product_id: item.productId,
          product_name: item.productName,
          product_price: item.productPrice,
          product_amount: item.productAmount,
          product_sold: item.productSold,
          product_upload_dt: "",
          product_update_dt: "",
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

  // Enter 키 입력 처리
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  // 검색 타입 변경 처리
  const handleSearchTypeChange = (type: ProductSearchType) => {
    setSearchType(type);
    setCurrentPage(1);
    if (tempSearchTerm) {
      handleSearchSubmit();
    }
  };

  // 초기 물품 데이터 로드
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productApi.getProductList();

        if (Array.isArray(response.data)) {
          const transformedData = response.data.map(transformApiProduct);
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

  // 품절 상태 토글 처리
  const handleToggleSoldOut = async (id: number) => {
    try {
      const product = products.find(p => p.product_id === id);
      if (!product) return;

      const productData = {
        productId: id,
        productName: product.product_name,
        productPrice: product.product_price,
        productAmount: product.product_amount,
        productSold: !product.product_sold,
        productUploadDt: product.product_upload_dt,
        productUpdateDt: getToday(),
      };

      await productApi.updateProduct(productData);
      await refreshProductList();
    } catch (error) {
      console.error("품절 상태 변경 중 오류 발생:", error);
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.product_id === id ? { ...p, product_sold: !p.product_sold } : p,
        ),
      );
    }
  };

  // 모달 관련 핸들러
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
      product_upload_dt: getToday(),
      product_update_dt: getToday(),
    });
  };

  // 입력 필드 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setNewFile(file);
      }
    } else {
      setNewProduct(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // 새 물품 추가 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("productName", newProduct.product_name);
      formData.append("productPrice", parseInt(newProduct.product_price).toString());
      formData.append("productAmount", parseInt(newProduct.product_amount).toString());
      formData.append("productSold", "false");
      formData.append("productUploadDt", newProduct.product_upload_dt);
      formData.append("productUpdateDt", newProduct.product_update_dt);

      // 실제 이미지 파일
      if (newFile) {
        formData.append("productImg", newFile);
      }

      await productApi.addProduct(formData);
      await refreshProductList();
      closeModal();
    } catch (err) {
      const error = err as AxiosError;
      if (error.response && typeof error.response.data === "string") {
        alert(error.response.data);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // 물품 목록 새로고침
  const refreshProductList = async () => {
    try {
      const response = await productApi.getProductList();
      if (Array.isArray(response.data)) {
        const transformedData = response.data.map(transformApiProduct);
        setProducts(transformedData);
        setFilteredProducts(transformedData);
      }
    } catch (error) {
      console.error("물품 목록 새로고침 실패:", error);
    }
  };

  // 수정 관련 핸들러
  const handleEditClick = (product: Product) => {
    setEditingId(product.product_id);
    setEditFormData({
      product_name: product.product_name,
      product_price: product.product_price.toString(),
      product_amount: product.product_amount.toString(),
    });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (id: number) => {
    try {
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

      await productApi.updateProduct(productData);
      await refreshProductList();
      setEditingId(null);
    } catch (error) {
      console.error("물품 수정 중 오류 발생:", error);
    }
  };

  // 삭제 관련 핸들러
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await productApi.deleteProduct(productToDelete.product_id);
      handleDeleteSuccess(productToDelete.product_id);
      handleCloseDeleteModal();
    } catch (error) {
      console.error("물품 삭제 중 오류 발생:", error);
      handleCloseDeleteModal();
    }
  };

  const handleDeleteSuccess = (productId: number) => {
    setProducts(prevProducts =>
      prevProducts.filter(p => p.product_id !== productId),
    );
    setFilteredProducts(prevProducts =>
      prevProducts.filter(p => p.product_id !== productId),
    );
    console.log(`물품 ID ${productId} 삭제 성공`);
  };

  // 페이지네이션 관련 로직
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

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
                    <div className={styles.fileNotice}>
                      <p><strong>최대 첨부 파일 크기:</strong> 1MB</p>
                      <p><strong>허용 확장자:</strong> jpg, png</p>
                      <p><strong>파일명 길이 제한:</strong> 300자 이하</p>
                    </div>
                    <div className={styles.fileInput}>
                      <input
                        id="imageUpload"
                        type="file"
                        onChange={handleInputChange}
                        accept=".jpg,.jpeg,.png"
                      />
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
