import { useState } from "react";
import Header from "../../components/common/Header/Header";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import styles from "./ManageUser.module.scss";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";

const ManageUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"id" | "name" | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for users
  const users = [
    {
      id: "user001",
      name: "김철수",
      phone: "010-1234-5678",
      email: "chulsoo@example.com",
      birthdate: "1990-05-15",
      address: "서울시 강남구 테헤란로 123",
      role: "Guest",
    },
    {
      id: "user002",
      name: "이영희",
      phone: "010-2345-6789",
      email: "younghee@example.com",
      birthdate: "1985-11-22",
      address: "서울시 서초구 서초대로 456",
      role: "Guest",
    },
    {
      id: "user003",
      name: "박민수",
      phone: "010-3456-7890",
      email: "minsu@example.com",
      birthdate: "1992-03-10",
      address: "경기도 성남시 분당구 판교로 789",
      role: "Admin",
    },
    {
      id: "user004",
      name: "정지원",
      phone: "010-4567-8901",
      email: "jiwon@example.com",
      birthdate: "1988-07-25",
      address: "서울시 마포구 홍대로 101",
      role: "Guest",
    },
    {
      id: "user005",
      name: "최유진",
      phone: "010-5678-9012",
      email: "yujin@example.com",
      birthdate: "1995-12-30",
      address: "서울시 송파구 올림픽로 202",
      role: "Guest",
    },
    {
      id: "user006",
      name: "강현우",
      phone: "010-6789-0123",
      email: "hyunwoo@example.com",
      birthdate: "1982-09-18",
      address: "경기도 수원시 영통구 광교로 303",
      role: "Admin",
    },
    {
      id: "user007",
      name: "윤서연",
      phone: "010-7890-1234",
      email: "seoyeon@example.com",
      birthdate: "1993-01-05",
      address: "서울시 강동구 천호대로 404",
      role: "Guest",
    },
    {
      id: "user008",
      name: "임재현",
      phone: "010-8901-2345",
      email: "jaehyun@example.com",
      birthdate: "1991-06-12",
      address: "인천시 연수구 송도대로 505",
      role: "Guest",
    },
    {
      id: "user009",
      name: "한소희",
      phone: "010-9012-3456",
      email: "sohee@example.com",
      birthdate: "1997-04-20",
      address: "서울시 용산구 이태원로 606",
      role: "Guest",
    },
    {
      id: "user010",
      name: "송민재",
      phone: "010-0123-4567",
      email: "minjae@example.com",
      birthdate: "1986-08-08",
      address: "경기도 고양시 일산동구 중앙로 707",
      role: "Guest",
    },
    {
      id: "user011",
      name: "오지현",
      phone: "010-1122-3344",
      email: "jihyun@example.com",
      birthdate: "1994-10-17",
      address: "서울시 중구 명동길 808",
      role: "Guest",
    },
    {
      id: "user012",
      name: "권태준",
      phone: "010-2233-4455",
      email: "taejun@example.com",
      birthdate: "1989-02-28",
      address: "부산시 해운대구 해운대로 909",
      role: "Admin",
    },
    {
      id: "user013",
      name: "신예은",
      phone: "010-3344-5566",
      email: "yeeun@example.com",
      birthdate: "1996-07-07",
      address: "서울시 종로구 인사동길 1010",
      role: "Guest",
    },
    {
      id: "user014",
      name: "이준호",
      phone: "010-4455-6677",
      email: "junho@example.com",
      birthdate: "1984-12-15",
      address: "대전시 유성구 대학로 1111",
      role: "Guest",
    },
    {
      id: "user015",
      name: "김다은",
      phone: "010-5566-7788",
      email: "daeun@example.com",
      birthdate: "1998-03-25",
      address: "경기도 용인시 수지구 포은대로 1212",
      role: "Guest",
    },
  ];

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
    const nameMatch = user.name.toLowerCase().includes(searchTermLower);
    const idMatch = user.id.toLowerCase().includes(searchTermLower);

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
                  placeholder={
                    searchType === "name"
                      ? "이름을 검색하세요"
                      : searchType === "id"
                        ? "아이디를 검색하세요"
                        : "아이디 또는 이름을 검색하세요"
                  }
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
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
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td>{user.birthdate}</td>
                      <td>{user.address}</td>
                      <td>
                        <span
                          className={`${styles.roleTag} ${user.role === "Admin" ? styles.adminRole : styles.guestRole}`}
                        >
                          {user.role}
                        </span>
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
