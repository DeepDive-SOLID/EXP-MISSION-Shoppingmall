import { useState, useEffect } from "react";
import Header from "../../../components/common/Header_dash/Header";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import styles from "./ManageUser.module.scss";
import { FiSearch } from "react-icons/fi";
import { memberApi } from "../../../api/admin/memberApi";
import { User, UserSearchType } from "../../../types/admin/user";

const ManageUser = () => {
  // 상태 관리
  const [tempSearchTerm, setTempSearchTerm] = useState(""); // 검색어 임시 저장
  const [searchType, setSearchType] = useState<UserSearchType>("id"); // 검색 타입 (아이디/이름)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [users, setUsers] = useState<User[]>([]); // 사용자 목록
  const itemsPerPage = 10; // 페이지당 표시할 사용자 수

  // API에서 사용자 데이터 가져오기
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await memberApi.getMemberList();
      setUsers(data);
    } catch (error) {
      console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 사용자 데이터 로드
  useEffect(() => {
    fetchUsers();
  }, []);

  // 검색어 입력 처리
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchTerm(e.target.value);
  };

  // 사용자 검색 실행
  const handleSearchSubmit = async () => {
    setCurrentPage(1);

    try {
      setLoading(true);

      // 검색어가 있을 때만 검색 API 호출
      const searchParams = {
        memberId: searchType === "id" ? tempSearchTerm.trim() : undefined,
        memberName: searchType === "name" ? tempSearchTerm.trim() : undefined,
      };

      const data = await memberApi.searchMember(searchParams);
      setUsers(data);
    } catch (error) {
      console.error("사용자 검색 중 오류 발생:", error);
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
  const handleSearchTypeChange = (type: UserSearchType) => {
    setSearchType(type);
    setCurrentPage(1);
  };

  // 페이지네이션 관련 로직
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

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
          {/* 페이지 헤더 */}
          <div className={styles.pageHeader}>
            <h1>사용자 관리</h1>
          </div>

          {/* 검색 섹션 */}
          <div className={styles.filterSection}>
            <div className={styles.searchContainer}>
              {/* 검색 타입 버튼 */}
              <div className={styles.searchTypeButtons}>
                <button
                  className={`${styles.searchTypeButton} ${searchType === "id" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("id")}
                >
                  아이디
                </button>
                <button
                  className={`${styles.searchTypeButton} ${searchType === "name" ? styles.active : ""}`}
                  onClick={() => handleSearchTypeChange("name")}
                >
                  이름
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

          {/* 사용자 목록 테이블 */}
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
              // 사용자 목록 테이블
              <div className={styles.tableWrapper}>
                <table className={styles.userTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>이름</th>
                      <th>전화번호</th>
                      <th>이메일</th>
                      <th>생년월일</th>
                      <th>권한</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map(user => (
                      <tr key={user.memberId}>
                        <td>{user.memberId}</td>
                        <td>{user.memberName}</td>
                        <td>{user.memberPhone}</td>
                        <td>{user.memberEmail}</td>
                        <td>{user.memberBirth}</td>
                        <td>
                          <span
                            className={`${styles.roleTag} ${user.authName === "ADMIN" ? styles.adminRole : styles.guestRole}`}
                          >
                            {user.authName === "ADMIN" ? "관리자" : "사용자"}
                          </span>
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

export default ManageUser;
