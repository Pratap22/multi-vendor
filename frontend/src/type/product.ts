export interface Product {
  _id?: string;
  name: string;
  description: string;
  category: string;
  tags?: string;
  originalPrice: number;
  discountPrice?: number;
  stock: number;
  shopId?: number;
}
