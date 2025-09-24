import { DOMAIN_STATUS_ENUM } from '@/apis/domain/enums';
import { EMAIL_CHANNEL_TYPE_ENUM } from '@/apis/email/enums';
import { PageParams } from '@/apis/types';

export interface DomainRecord {
  id: number;
  name: string;
  status: DOMAIN_STATUS_ENUM;
  register_time: string;
  expired_time: string;
  created_time: string;
  remark: string;
  provider_type: EMAIL_CHANNEL_TYPE_ENUM;
}

export interface DomainParams extends PageParams {
  name: string;
  status: number;
}

export interface DomainSuffixRecord {
  id: number;
  name: string;
  price: number;
  original_price: number;
  tag: string;
  description: {
    zh_CN: string;
    en_US: string;
  };
  sort: number;
  is_active: boolean;
}

export interface DomainOrderData {
  domain_suffix: string;
  quantity: number;
  expected_domains?: string[];
  expected_compensation?: boolean;
}
