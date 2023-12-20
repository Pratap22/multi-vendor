export interface Product {
  name: string;
  description: string;
  category: string;
  tags?: string;
  originalPrice: number;
  discountPrice?: number;
  stock: number;
  shopId?: number;
}
