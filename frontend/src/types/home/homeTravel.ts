export interface HomeTravelDto {
  travelId: number;
  travelName: string;
  travelLabel: string;
  travelStartDt: string;
  travelEndDt: string;
  travelImg: string;
  rate: number;
  reviewCount: number;
  travelPrice: number;
  reservedCount: number;
  maxPeople: number;
  minPeople: number;
  hotelInfo: string;
  ticketInfo: string;
  busIncluded: boolean;
}
