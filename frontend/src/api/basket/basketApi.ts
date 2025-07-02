import api from "../axios";
import {
  BasketAddDto,
  BasketDeleteDto,
  BasketListDto,
} from "../../types/basket/basket";

// 장바구니 추가
export const addToBasket = async (data: BasketAddDto): Promise<string> => {
  const res = await api.post("/payment/basket/save", data);
  return res.data;
};

// 장바구니 삭제
export const deleteFromBasket = async (
  data: BasketDeleteDto,
): Promise<string> => {
  const res = await api.delete("/payment/basket/delete", { data });
  return res.data;
};

// 장바구니 목록 조회
export const fetchBasketList = async (
  memberId: string,
): Promise<BasketListDto[]> => {
  const res = await api.post("/payment/basket/list", { memberId });
  return res.data;
};
