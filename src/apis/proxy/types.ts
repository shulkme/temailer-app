import { PACKAGE_TYPE_ENUM } from '@/apis/packages/enums';
import { PROXY_STATUS_ENUM } from '@/apis/proxy/enums';

export interface ProxyRecord {
  id: number;
  order_id: string;
  package_type: PACKAGE_TYPE_ENUM;
  ip: string;
  port: number;
  username: string;
  password: string;
  country: string;
  purchase_time: string;
  expire_time: string;
  status: PROXY_STATUS_ENUM;
  notes: string;
  protocol: string;
  region: string;
  created_time: string;
  updated_time: string;
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
  package_type: PACKAGE_TYPE_ENUM;
  package_id: number;
  days: number;
  quantity: number;
  coupon?: string;
  client_total_usd: number;
}
