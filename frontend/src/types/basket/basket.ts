export interface BasketAddDto {
  memberId: string;
  travelId: number;
  basketTravelAmount: number;
  products: BasketProductDto[];
}

export interface BasketDeleteDto {
  travelId: number;
  memberId: string;
}

export interface BasketListDto {
  basketId: number;
  travelName: string;
  travelPrice: number;
  travelStartDt: string;
  travelEndDt: string;
  travelImg: string;
  productName: string;
  productPrice: number;
  basketTravelAmount: number;
  basketProductAmount: number;
  travelId: number;
  travelLabel: string;
  travelAmount: number;
  reservedCount: number;
  basketProducts: BasketProductDto[];
}

export interface BasketProductDto {
  productId: number;
  productName?: string;
  productPrice?: number;
  basketProductAmount: number;
}

export interface BasketMemberDto {
  memberId: string;
}
