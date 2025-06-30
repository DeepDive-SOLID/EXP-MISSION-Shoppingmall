export interface BasketAddDto {
  memberId: string;
  travelId: number;
  productId: number;
  basketTravelAmount: number;
  basketProductAmount: number;
}

export interface BasketDeleteDto {
  basketId: number;
}

export interface BasketListDto {
  basketId: number;
  travelName: string;
  travelPrice: number;
  travelStartDt: Date;
  travelEndDt: Date;
  travelImg: string;
  productName: string;
  productPrice: number;
  basketTravelAmount: number;
  basketProductAmount: number;
}

export interface BasketMemberDto {
  memberId: string;
}
