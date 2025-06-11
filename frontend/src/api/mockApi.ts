import productData from "../data/products.json";
import travelData from "../data/travels.json";
import userData from "../data/users.json";
import orderData from "../data/orders.json";

// 데이터 타입 정의
export interface Product {
  product_id: number;
  product_name: string;
  product_price: number;
  product_amount: number;
  product_sold: boolean;
  product_upload_dt: string;
  product_update_dt: string;
  product_img: string;
}

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

export interface User {
  member_id: string;
  member_name: string;
  member_pw: string;
  member_email: string;
  member_phone: string;
  member_birth: string;
  address: string;
  auth_name: string;
}

export interface Order {
  order_id: number;
  member_id: string;
  payment_id: number;
  order_dt: string;
  order_state: number;
  order_addr: string;
  order_addr_detail: string;
  travel_product?: OrderTravel;
  product?: OrderProduct;
  payment_name?: string; // payment 테이블의 payment_name 사용
}

export interface OrderTravel {
  order_id: number;
  payment_id: number;
  member_id: string;
  travel_id: number;
  order_travel_amount: number;
  travel_name?: string; // UI 표시용 추가 필드
}

export interface OrderProduct {
  order_id: number;
  payment_id: number;
  member_id: string;
  product_id: number;
  order_product_amount: number;
  product_name?: string; // UI 표시용 추가 필드
}

// 지연 시간을 모방하는 함수
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 물품 관련 API
export const productApi = {
  getAll: async (): Promise<Product[]> => {
    await delay(300); // API 호출 지연 시간 모방
    return productData as unknown as Product[];
  },

  getById: async (id: number): Promise<Product | undefined> => {
    await delay(200);
    return (productData as unknown as Product[]).find(
      product => product.product_id === id,
    );
  },

  create: async (product: Omit<Product, "product_id">): Promise<Product> => {
    await delay(400);
    const newId =
      Math.max(
        ...(productData as unknown as Product[]).map(p => p.product_id),
      ) + 1;
    const newProduct = { ...product, product_id: newId };
    return newProduct;
  },

  update: async (
    id: number,
    updates: Partial<Product>,
  ): Promise<Product | undefined> => {
    await delay(300);
    const product = (productData as unknown as Product[]).find(
      p => p.product_id === id,
    );
    if (!product) return undefined;

    // 업데이트 날짜 자동 설정
    if (updates && !updates.product_update_dt) {
      updates.product_update_dt = new Date().toISOString().split("T")[0];
    }

    return { ...product, ...updates };
  },

  delete: async (id: number): Promise<boolean> => {
    await delay(300);
    // 실제 구현에서는 데이터베이스에서 삭제 작업 수행
    console.log(`물품 ID ${id} 삭제`);
    return true;
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
