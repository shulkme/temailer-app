export interface CheckoutByStripeData {
  mode: string;
  price_type?: string;
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
