import { useState, useEffect } from "react";
import Header from "../../components/common/Header/Header";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import styles from "./ManageUser.module.scss";
import { FiSearch } from "react-icons/fi";
import { memberApi } from "../../api/axios";
import { User, UserSearchType } from "../../types/user";

const ManageUser = () => {
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<UserSearchType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const itemsPerPage = 10;

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async () => {
    setCurrentPage(1);

    try {
      setLoading(true);

      if (!tempSearchTerm.trim()) {
        // 검색어가 비어있으면 전체 목록 조회
        const data = await memberApi.getMemberList();
        setUsers(data);
        return;
      }

      // 검색어가 있을 때만 검색 API 호출
      const searchParams = {
        memberId:
          searchType === "id" || searchType === "all"
            ? tempSearchTerm.trim()
            : undefined,
        memberName:
          searchType === "name" || searchType === "all"
            ? tempSearchTerm.trim()
            : undefined,
      };

      const data = await memberApi.searchMember(searchParams);
      setUsers(data);
    } catch (error) {
      console.error("사용자 검색 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSearchTypeChange = (type: UserSearchType) => {
    setSearchType(type);
    setCurrentPage(1);
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

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
            <h1>사용자 관리</h1>
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
