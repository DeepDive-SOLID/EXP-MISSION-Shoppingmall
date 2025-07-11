export interface MypageOrdersListDto {
  orderId: number;
  orderDt: string;
  orderStatus: number;
  orderTravelId: number;
  orderTravelName: string;
  orderTravelAmount: number;
  travelStartDt: string;
  travelEndDt: string;
  travelImg: string;
  totalPrice: number;
  reviewCheck: boolean;
  travelPrice: number;
  travelLabel : string;
  travelSold: boolean;
  travelAmount: number;
  orderProducts: MypageOrdersProductDto[];
}

export interface MypageOrdersProductDto {
  productName: string;
  orderProductAmount: number;
}

export interface MypageOrdersReviewDto {
  travelId: number;
  memberId: string;
  reviewRate: number;
  reviewComment: string;
}
