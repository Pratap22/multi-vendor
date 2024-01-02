import { CartProduct } from "./product";
import { User } from "./user";

export interface ShippingAddress {
  address1: string;
  address2: string;
  zipCode: string;
  country: string;
  city: string;
}
export interface OrderData {
  cart: CartProduct[];
  totalPrice: string;
  subTotalPrice: number;
  shipping: number;
  shippingAddress: ShippingAddress;
  user: User | null;
}

export interface PaymentData {
  _id?: string;
  cart: CartProduct[];
  shippingAddress: ShippingAddress;
  userId: string;
  totalPrice: string;
  paymentInfo: {
    id: string;
    type: string;
    status: string;
  };
}
