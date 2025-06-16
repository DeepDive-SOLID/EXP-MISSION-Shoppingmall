import { Travel, TravelListAllDto } from "../types/travel";

// API 응답 데이터를 Travel 타입으로 변환하는 함수
export const transformApiTravel = (item: TravelListAllDto): Travel => ({
  travel_id: item.travelId,
  travel_name: item.travelName,
  travel_price: item.travelPrice,
  travel_amount: item.travelAmount,
  travel_sold: item.travelSold,
  travel_comment: item.travelComment || "",
  travel_label: item.travelLabel || "",
  travel_start_dt: item.travelStartDt || "",
  travel_end_dt: item.travelEndDt || "",
  travel_upload_dt: item.travelUploadDt || "",
  travel_update_dt: item.travelUpdateDt || "",
  travel_img: item.travelImg || "",
});

// 검색 파라미터 생성 함수
export const createSearchParams = (
  searchType: "all" | "name" | "code",
  searchTerm: string,
) => {
  const searchParams: {
    travelId: number | null;
    travelName: string | null;
  } = {
    travelId: null,
    travelName: null,
  };

  if (searchTerm.trim()) {
    const trimmedTerm = searchTerm.trim();
    const parsedId = parseInt(trimmedTerm);

    switch (searchType) {
      case "name":
        searchParams.travelName = trimmedTerm;
        break;
      case "code":
        if (!isNaN(parsedId)) {
          searchParams.travelId = parsedId;
        }
        break;
      case "all":
        if (!isNaN(parsedId)) {
          searchParams.travelId = parsedId;
        } else {
          searchParams.travelName = trimmedTerm;
        }
        break;
    }
  }

  return searchParams;
};

// 페이지네이션 정보 계산 함수
export const calculatePagination = (
  totalItems: number,
  currentPage: number,
  itemsPerPage: number,
) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = totalItems > 0 ? totalItems : 0;

  return {
    totalPages,
    indexOfLastItem,
    indexOfFirstItem,
    currentItems,
  };
};

// 페이지 번호 배열 생성 함수
export const getPageNumbers = (currentPage: number, totalPages: number) => {
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
