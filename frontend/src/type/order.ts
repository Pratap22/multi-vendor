import { CartProduct } from "./product";
import { User } from "./user";

export interface OrderData {
    cart: CartProduct[];
    totalPrice: string;
    subTotalPrice: number;
    shipping: number;
    shippingAddress: {
        address1: string;
        address2: string;
        zipCode: string;
        country: string;
        city: string;
    };
    user: User | null;
}