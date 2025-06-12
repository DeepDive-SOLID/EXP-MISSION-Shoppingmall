// import productData from "../data/products.json";
import travelData from "../data/travels.json";
import userData from "../data/users.json";
import orderData from "../data/orders.json";
import { Product } from "../types/product";
import { Travel } from "../types/travel";
import { User } from "../types/user";
import { Order } from "../types/order";
import { delay } from "../utils/delay";

// 물품 관련 API
export const productApi = {
  getAll: async (): Promise<Product[]> => {
    console.warn("Deprecated: 실제 API를 사용하세요");
    return [];
  },

  getById: async (): Promise<Product | undefined> => {
    console.warn("Deprecated: 실제 API를 사용하세요");
    return undefined;
  },

  create: async (product: Omit<Product, "product_id">): Promise<Product> => {
    console.warn("Deprecated: 실제 API를 사용하세요");
    return { ...product, product_id: 0 } as Product;
  },

  update: async (): Promise<Product | undefined> => {
    console.warn("Deprecated: 실제 API를 사용하세요");
    return undefined;
  },

  delete: async (): Promise<boolean> => {
    console.warn("Deprecated: 실제 API를 사용하세요");
    return false;
  },
};

// 여행 상품 관련 API
export const travelApi = {
  getAll: async (): Promise<Travel[]> => {
    await delay(300);
    return travelData as unknown as Travel[];
  },

  getById: async (id: number): Promise<Travel | undefined> => {
    await delay(200);
    return (travelData as unknown as Travel[]).find(
      travel => travel.travel_id === id,
    );
  },

  create: async (travel: Omit<Travel, "travel_id">): Promise<Travel> => {
    await delay(400);
    const newId =
      Math.max(...(travelData as unknown as Travel[]).map(t => t.travel_id)) +
      1;
    const newTravel = { ...travel, travel_id: newId };
    return newTravel;
  },

  update: async (
    id: number,
    updates: Partial<Travel>,
  ): Promise<Travel | undefined> => {
    await delay(300);
    const travel = (travelData as unknown as Travel[]).find(
      t => t.travel_id === id,
    );
    if (!travel) return undefined;
    return { ...travel, ...updates };
  },

  delete: async (id: number): Promise<boolean> => {
    await delay(300);
    // 실제 구현에서는 데이터베이스에서 삭제 작업 수행
    console.log(`여행 상품 ID ${id} 삭제`);
    return true;
  },
};

// 사용자 관련 API
export const userApi = {
  getAll: async (): Promise<User[]> => {
    await delay(300);
    return userData as unknown as User[];
  },

  getById: async (id: string): Promise<User | undefined> => {
    await delay(200);
    return (userData as unknown as User[]).find(user => user.member_id === id);
  },

  create: async (user: User): Promise<User> => {
    await delay(400);
    return user;
  },

  update: async (
    id: string,
    updates: Partial<User>,
  ): Promise<User | undefined> => {
    await delay(300);
    const user = (userData as unknown as User[]).find(u => u.member_id === id);
    if (!user) return undefined;
    return { ...user, ...updates };
  },

  delete: async (id: string): Promise<boolean> => {
    await delay(300);
    // 실제 구현에서는 데이터베이스에서 삭제 작업 수행
    console.log(`사용자 ID ${id} 삭제`);
    return true;
  },
};

// 주문 관련 API
export const orderApi = {
  getAll: async (): Promise<Order[]> => {
    await delay(300);
    return orderData as unknown as Order[];
  },

  getById: async (id: number): Promise<Order | undefined> => {
    await delay(200);
    return (orderData as unknown as Order[]).find(
      order => order.order_id === id,
    );
  },

  create: async (order: Omit<Order, "order_id">): Promise<Order> => {
    await delay(400);
    const maxId = Math.max(
      ...(orderData as unknown as Order[]).map(o => o.order_id),
      0,
    );
    const newOrder = { ...order, order_id: maxId + 1 };
    return newOrder as Order;
  },

  update: async (
    id: number,
    updates: Partial<Order>,
  ): Promise<Order | undefined> => {
    await delay(300);
    const order = (orderData as unknown as Order[]).find(
      o => o.order_id === id,
    );
    if (!order) return undefined;
    return { ...order, ...updates };
  },

  delete: async (id: number): Promise<boolean> => {
    await delay(300);
    // 실제 구현에서는 데이터베이스에서 삭제 작업 수행
    console.log(`주문 ID ${id} 삭제`);
    return true;
  },
};
