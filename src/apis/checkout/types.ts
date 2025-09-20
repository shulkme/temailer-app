import { CHECKOUT_MODE_ENUM, PRICE_TYPE_ENUM } from '@/apis/checkout/enums';

export interface CheckoutByStripeData {
  mode: CHECKOUT_MODE_ENUM;
  price_type?: PRICE_TYPE_ENUM;
  amount: number;
  product_data: {
    name: string;
    description: string;
  };
  promotion_code?: string;
}

export interface CheckoutResponse {
  url: string;
}
