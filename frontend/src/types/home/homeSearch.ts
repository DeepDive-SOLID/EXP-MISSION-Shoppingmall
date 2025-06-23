export interface HomeSearchDto {
  name?: string;
  travelStartDt?: string;
  travelEndDt?: string;
  travelAmount?: number;
  sorted: 1 | 2 | 3;
}
