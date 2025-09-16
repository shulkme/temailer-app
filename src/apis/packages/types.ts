import { PACKAGE_TYPE_ENUM } from '@/apis/packages/enums';

export interface PackageRecord {
  type: PACKAGE_TYPE_ENUM;
  currency: string;
  continent: string;
  country: string;
  days7: number;
  days30: number;
  days90: number;
  price_per_gb: number;
  flow_id: number;
  flow_name: string;
  flow_price: number;
  status: number;
  sort: number;
  id: string;
}

export interface PackageParams {
  type?: PACKAGE_TYPE_ENUM;
}
