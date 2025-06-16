export const getOrderStatusText = (orderState: number): string => {
  switch (orderState) {
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
  orderState: number,
  styles: { [key: string]: string },
): string => {
  switch (orderState) {
    case 0:
      return styles.completed;
    case 1:
      return styles.cancelled;
    case 2:
      return styles.shipping;
    case 3:
      return styles.delivered;
    default:
      return styles.unknown;
  }
};
