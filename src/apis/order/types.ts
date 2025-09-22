import { PAYMENT_METHOD_ENUM } from '@/apis/checkout/enums';
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
    mode: string;
  };
  created_time: string;
}

export interface OrderParams extends PageParams {
  status: ORDER_STATUS_ENUM;
  name: string;
  start_time: string;
  end_time: string;
}
