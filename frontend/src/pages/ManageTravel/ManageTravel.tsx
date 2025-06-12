import { useState, useEffect } from "react";
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
  FiCheck,
  FiAlertTriangle,
} from "react-icons/fi";
import { product1 } from "../../assets";
import { travelApi } from "../../api/mockApi";
import { Travel, TravelFormData, NewTravelInput } from "../../types/travel";
import { getToday } from "../../utils/formatDate";

const ManageTravel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"name" | "code" | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [travelToDelete, setTravelToDelete] = useState<Travel | null>(null);
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<TravelFormData>({
    travel_name: "",
    travel_price: "",
    travel_amount: "",
  });
  const [newTravel, setNewTravel] = useState<NewTravelInput>({
    travel_name: "",
    travel_price: "",
    travel_amount: "",
    travel_sold: false,
    travel_img: "",
    travel_start_dt: "",
    travel_end_dt: "",
    travel_comment: "",
    travel_label: "",
    travel_upload_dt: getToday(),
    travel_update_dt: getToday(),
  });
  const itemsPerPage = 10;

  // API에서 여행상품 데이터 가져오기
  useEffect(() => {
    const fetchTravels = async () => {
      try {
        setLoading(true);
        const data = await travelApi.getAll();
        setTravels(data);
      } catch (error) {
        console.error("여행상품 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravels();
  }, []);

  // 이미지 목록
  const travelImages = [
    { id: "product1", src: product1 },
    { id: "product2", src: product1 },
    { id: "product3", src: product1 },
    { id: "product4", src: product1 },
    { id: "product5", src: product1 },
  ];

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
      // 현재 여행상품 찾기
      const travel = travels.find(t => t.travel_id === id);
      if (!travel) return;

      // API 호출하여 품절 상태 업데이트
      const updatedTravel = await travelApi.update(id, {
        travel_sold: !travel.travel_sold,
      });

      // 상태 업데이트
      if (updatedTravel) {
        setTravels(prevTravels =>
          prevTravels.map(t =>
            t.travel_id === id ? { ...t, travel_sold: !t.travel_sold } : t,
          ),
        );
      }
    } catch (error) {
      console.error("품절 상태 변경 중 오류 발생:", error);
    }
  };

  // 수정 모드 시작
  const handleEditClick = (travel: Travel) => {
    setEditingId(travel.travel_id);
    setEditFormData({
      travel_name: travel.travel_name,
      travel_price: travel.travel_price.toString(),
      travel_amount: travel.travel_amount.toString(),
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
        travel_name: editFormData.travel_name,
        travel_price: parseInt(editFormData.travel_price),
        travel_amount: parseInt(editFormData.travel_amount),
        travel_update_dt: new Date().toISOString().split("T")[0],
      };

      // API 호출하여 데이터 업데이트
      const updatedTravel = await travelApi.update(id, updatedData);

      // 상태 업데이트
      if (updatedTravel) {
        setTravels(prevTravels =>
          prevTravels.map(t =>
            t.travel_id === id ? { ...t, ...updatedData } : t,
          ),
        );
        setEditingId(null);
      }
    } catch (error) {
      console.error("여행상품 수정 중 오류 발생:", error);
    }
  };

  // 삭제 모달 열기
  const handleDeleteClick = (travel: Travel) => {
    setTravelToDelete(travel);
    setIsDeleteModalOpen(true);
  };

  // 삭제 모달 닫기
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTravelToDelete(null);
  };

  // 삭제 확인
  const handleConfirmDelete = async () => {
    if (!travelToDelete) return;

    try {
      // API 호출하여 데이터 삭제
      const success = await travelApi.delete(travelToDelete.travel_id);

      // 상태 업데이트
      if (success) {
        setTravels(prevTravels =>
          prevTravels.filter(t => t.travel_id !== travelToDelete.travel_id),
        );
        console.log(`여행상품 ID ${travelToDelete.travel_id} 삭제 성공`);
      }

      // 모달 닫기
      handleCloseDeleteModal();
    } catch (error) {
      console.error("여행상품 삭제 중 오류 발생:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewTravel({
      travel_name: "",
      travel_price: "",
      travel_amount: "",
      travel_sold: false,
      travel_img: "",
      travel_start_dt: "",
      travel_end_dt: "",
      travel_comment: "",
      travel_label: "",
      travel_upload_dt: new Date().toISOString().split("T")[0],
      travel_update_dt: new Date().toISOString().split("T")[0],
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
      travel_img: imageId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 폼 데이터를 API 형식에 맞게 변환
      const travelData = {
        travel_name: newTravel.travel_name,
        travel_price: parseInt(newTravel.travel_price),
        travel_amount: parseInt(newTravel.travel_amount),
        travel_sold: false,
        travel_img: newTravel.travel_img || "product1", // 기본 이미지 설정
        travel_start_dt: newTravel.travel_start_dt,
        travel_end_dt: newTravel.travel_end_dt,
        travel_comment: newTravel.travel_comment,
        travel_label: newTravel.travel_label,
        travel_upload_dt: newTravel.travel_upload_dt,
        travel_update_dt: newTravel.travel_update_dt,
      };

      // API 호출하여 새 여행상품 추가
      const createdTravel = await travelApi.create(travelData);

      // 상태 업데이트
      if (createdTravel) {
        setTravels(prevTravels => [...prevTravels, createdTravel]);
        console.log("새 여행상품 추가 성공:", createdTravel);
      }

      // 모달 닫기
      closeModal();
    } catch (error) {
      console.error("여행상품 추가 중 오류 발생:", error);
    }
  };

  // 검색어로 필터링
  const filteredTravels = travels.filter(travel => {
    if (searchTerm === "") return true;

    const searchTermLower = searchTerm.toLowerCase();
    const nameMatch = travel.travel_name
      .toLowerCase()
      .includes(searchTermLower);
    const codeMatch = travel.travel_id.toString().includes(searchTerm);

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
                  placeholder="검색어를 입력하세요"
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
                    <th>상품코드</th>
                    <th>상품명</th>
                    <th>금액</th>
                    <th>수량</th>
                    <th>품절여부</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(travel => (
                    <tr key={travel.travel_id}>
                      <td>{travel.travel_id}</td>
                      <td>
                        {editingId === travel.travel_id ? (
                          <input
                            type="text"
                            name="travel_name"
                            value={editFormData.travel_name}
                            onChange={handleEditInputChange}
                            className={styles.editInput}
                            style={{ minWidth: "150px" }}
                          />
                        ) : (
                          travel.travel_name
                        )}
                      </td>
                      <td>
                        {editingId === travel.travel_id ? (
                          <input
                            type="number"
                            name="travel_price"
                            value={editFormData.travel_price}
                            onChange={handleEditInputChange}
                            className={styles.editInput}
                            style={{ minWidth: "80px" }}
                          />
                        ) : (
                          `${travel.travel_price.toLocaleString()}원`
                        )}
                      </td>
                      <td>
                        {editingId === travel.travel_id ? (
                          <input
                            type="number"
                            name="travel_amount"
                            value={editFormData.travel_amount}
                            onChange={handleEditInputChange}
                            className={styles.editInput}
                            style={{ minWidth: "60px" }}
                          />
                        ) : (
                          `${travel.travel_amount}명`
                        )}
                      </td>
                      <td>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={travel.travel_sold}
                            onChange={() =>
                              handleToggleSoldOut(travel.travel_id)
                            }
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </td>
                      <td>
                        <div className={styles.actionButtons}>
                          {editingId === travel.travel_id ? (
                            <>
                              <button
                                className={styles.saveButton}
                                onClick={() => handleSaveEdit(travel.travel_id)}
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
                                onClick={() => handleEditClick(travel)}
                                title="수정"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                className={styles.deleteButton}
                                onClick={() => handleDeleteClick(travel)}
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
                  <h2>여행 상품 추가</h2>
                  <button className={styles.closeButton} onClick={closeModal}>
                    <FiX />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className={styles.modalForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="travel_name">상품명</label>
                    <input
                      type="text"
                      id="travel_name"
                      name="travel_name"
                      value={newTravel.travel_name}
                      onChange={handleInputChange}
                      placeholder="상품명을 입력하세요"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="travel_price">금액</label>
                    <input
                      type="number"
                      id="travel_price"
                      name="travel_price"
                      value={newTravel.travel_price}
                      onChange={handleInputChange}
                      placeholder="금액을 입력하세요"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="travel_amount">수량</label>
                    <input
                      type="number"
                      id="travel_amount"
                      name="travel_amount"
                      value={newTravel.travel_amount}
                      onChange={handleInputChange}
                      placeholder="수량을 입력하세요"
                      required
                    />
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="travel_start_dt">
                        <FiCalendar /> 시작일
                      </label>
                      <input
                        type="date"
                        id="travel_start_dt"
                        name="travel_start_dt"
                        value={newTravel.travel_start_dt}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="travel_end_dt">
                        <FiCalendar /> 종료일
                      </label>
                      <input
                        type="date"
                        id="travel_end_dt"
                        name="travel_end_dt"
                        value={newTravel.travel_end_dt}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="travel_label">태그</label>
                    <input
                      type="text"
                      id="travel_label"
                      name="travel_label"
                      value={newTravel.travel_label}
                      onChange={handleInputChange}
                      placeholder="태그를 입력하세요 (예: 서울, 관광)"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="travel_comment">상품 설명</label>
                    <textarea
                      id="travel_comment"
                      name="travel_comment"
                      value={newTravel.travel_comment}
                      onChange={handleInputChange}
                      placeholder="상품 설명을 입력하세요"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>이미지 선택</label>
                    <div className={styles.imageSelector}>
                      {travelImages.map(img => (
                        <div
                          key={img.id}
                          className={`${styles.imageOption} ${newTravel.travel_img === img.id ? styles.selected : ""}`}
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
          {isDeleteModalOpen && travelToDelete && (
            <div className={styles.modalOverlay}>
              <div className={styles.deleteModal}>
                <div className={styles.deleteModalHeader}>
                  <FiAlertTriangle className={styles.alertIcon} />
                  <h2>여행 상품 삭제</h2>
                </div>
                <div className={styles.deleteModalContent}>
                  <p>
                    <strong>{travelToDelete.travel_name}</strong> 상품을
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

export default ManageTravel;
