import {
  CHECKOUT_MODE_ENUM,
  PAYMENT_METHOD_ENUM,
  PRICE_TYPE_ENUM,
} from '@/apis/checkout/enums';
import { ORDER_STATUS_ENUM, ORDER_TYPE_ENUM } from '@/apis/order/enums';
import { PageParams } from '@/apis/types';

export interface OrderRecord {
  id: number;
  user_id: number;
  amount: number;
  currency: string;
  status: ORDER_STATUS_ENUM;
  payment_method: PAYMENT_METHOD_ENUM;
  order_type: ORDER_TYPE_ENUM;
  extra_info: {
    mode: CHECKOUT_MODE_ENUM;
    quantity: number;
    credit_result?: {
      credits_added: number;
      name: PRICE_TYPE_ENUM;
      quantity: number;
    };
    session_metadata?: {
      user_email: string;
      user_id: string;
      name: string;
      quantity: number;
    };
  };
  created_time: string;
}

export interface OrderParams extends PageParams {
  status: ORDER_STATUS_ENUM;
  name: string;
  start_time: string;
  end_time: string;
}
