import { useState, useEffect } from "react";
import Header from "../../components/common/Header/Header";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import styles from "./ManageUser.module.scss";
import { FiSearch } from "react-icons/fi";
import { userApi } from "../../api/mockApi";
import { User } from "../../types/user";

const ManageUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"id" | "name" | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  // API에서 사용자 데이터 가져오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await userApi.getAll();
        setUsers(data);
      } catch (error) {
        console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleSearchTypeChange = (type: "id" | "name" | "all") => {
    setSearchType(type);
    setCurrentPage(1); // 검색 유형 변경 시 첫 페이지로 이동
  };

  // 검색어로 필터링
  const filteredUsers = users.filter(user => {
    if (searchTerm === "") return true;

    const searchTermLower = searchTerm.toLowerCase();
    const nameMatch = user.member_name.toLowerCase().includes(searchTermLower);
    const idMatch = user.member_id.toLowerCase().includes(searchTermLower);

    switch (searchType) {
      case "name":
        return nameMatch;
      case "id":
        return idMatch;
      case "all":
      default:
        return nameMatch || idMatch;
    }
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

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
                <table className={styles.userTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>이름</th>
                      <th>전화번호</th>
                      <th>이메일</th>
                      <th>생년월일</th>
                      <th>주소</th>
                      <th>권한</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map(user => (
                      <tr key={user.member_id}>
                        <td>{user.member_id}</td>
                        <td>{user.member_name}</td>
                        <td>{user.member_phone}</td>
                        <td>{user.member_email}</td>
                        <td>{user.member_birth}</td>
                        <td>{user.address}</td>
                        <td>
                          <span
                            className={`${styles.roleTag} ${user.auth_name === "관리자" ? styles.adminRole : styles.guestRole}`}
                          >
                            {user.auth_name}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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

export default ManageUser;
