export interface Travel {
  travel_id: number;
  travel_name: string;
  travel_price: number;
  travel_amount: number;
  travel_sold: boolean;
  travel_comment: string;
  travel_label: string;
  travel_start_dt: string;
  travel_end_dt: string;
  travel_upload_dt: string;
  travel_update_dt: string;
  travel_img: string;
}

export interface TravelFormData {
  travel_name: string;
  travel_price: string;
  travel_amount: string;
}

export interface NewTravelInput {
  travel_name: string;
  travel_price: string;
  travel_amount: string;
  travel_sold: boolean;
  travel_img: string;
  travel_start_dt: string;
  travel_end_dt: string;
  travel_comment: string;
  travel_label: string;
  travel_upload_dt: string;
  travel_update_dt: string;
}
