import { PACKAGE_TYPE_ENUM } from '@/apis/packages/enums';

export interface PackageRecord {
  type: PACKAGE_TYPE_ENUM;
  continent: string;
  country: string;
  price_week: number;
  price_month: number;
  price_quarter: number;
  price_year: number;
  currency: string;
  status: number;
  sort: number;
  id: string;
}

export interface PackageParams {
  type?: PACKAGE_TYPE_ENUM;
}
