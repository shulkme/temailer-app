import { ORDER_STATUS_ENUM, PAYMENT_METHOD_ENUM } from '@/apis/checkout/enums';
import { PACKAGE_TYPE_ENUM } from '@/apis/packages/enums';
import { PROXY_STATUS_ENUM } from '@/apis/proxy/enums';

export interface ProxyRecord {
  id: number;
  order_id: string;
  package_type: PACKAGE_TYPE_ENUM;
  ip: string;
  port_http: number;
  port_socks: number;
  username: string;
  password: string;
  country: string;
  purchase_time: string;
  expire_at: string;
  status: PROXY_STATUS_ENUM;
  notes: string;
  protocol: string;
  region: string;
  created_time: string;
  updated_time: string;
  auto_renew: boolean;
}

export interface ProxyParams {
  package_type?: PACKAGE_TYPE_ENUM;
  ip?: string;
  country?: string;
  status?: PROXY_STATUS_ENUM;
  page?: number;
  size?: number;
}

export interface ProxyOrderData {
  packages: {
    package_type: PACKAGE_TYPE_ENUM;
    package_id: string;
    days: number;
    quantity: number;
  }[];
  coupon?: string;
  client_total_usd: number;
}

export interface ProxyOrderRecord {
  id: number;
  user_id: number;
  package_ids: number[];
  package_type: PACKAGE_TYPE_ENUM;
  payment_usd: number;
  payment_method: PAYMENT_METHOD_ENUM;
  balance_before_payment: number;
  balance_after_payment: number;
  coupon: string;
  status: ORDER_STATUS_ENUM;
  created_time: string;
  updated_time: string;
  summary: string;
  summary_meta: {
    duration: number;
    mode: string;
    type: PACKAGE_TYPE_ENUM;
    value: number;
  };
}

export interface ProxyOrderParams {
  package_type?: PACKAGE_TYPE_ENUM;
  status?: ORDER_STATUS_ENUM;
  external_order_id?: string;
  page?: number;
  size?: number;
}

export interface ProxyStatistics {
  package_type: PACKAGE_TYPE_ENUM;
  available: number;
  expiring_soon: number;
  auto_renew: number;
  expired: number;
  total: number;
}
