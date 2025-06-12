export const getOrderStatusText = (status: number): string => {
  switch (status) {
    case 0:
      return "주문완료";
    case 1:
      return "주문취소";
    case 2:
      return "배송중";
    case 3:
      return "배송완료";
    default:
      return "알 수 없음";
  }
};

export const getOrderStatusClass = (
  status: number,
  styles: { [key: string]: string },
) => {
  switch (status) {
    case 0:
      return styles.statusPaid;
    case 1:
      return styles.statusCancelled;
    case 2:
      return styles.statusShipping;
    case 3:
      return styles.statusDelivered;
    default:
      return "";
  }
};
