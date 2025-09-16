import { PAYMENT_METHOD_ENUM } from '@/apis/checkout/enums';

export interface CreditRecord {
  id: string;
  user_id: string;
  rule_id: string;
  points: number;
  type: string;
  start_at: string;
  expire_at: string;
  status: string;
  business_type: string;
  description: string;
  parent_id: string;
  created_time: string;
}

export interface CreditParams {
  credit_type?: string;
  business_type?: string;
  status?: string;
  start_at?: string;
  end_at?: string;
  is_expired?: boolean;
  page?: number;
  size?: number;
}

export interface CreditRechargeParams {
  order_id?: string;
  payment_method?: PAYMENT_METHOD_ENUM;
  start_time?: string;
  end_time?: string;
  page?: number;
  size?: number;
}

export interface CreditRechargeRecord {
  order_id: string;
  amount: number;
  payment_method: PAYMENT_METHOD_ENUM;
  recharge_time: string;
  balance_after: number;
  status: string;
}
