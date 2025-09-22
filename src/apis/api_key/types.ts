import { PageParams } from '@/apis/types';

export interface ApiKeyRecord {
  name: string;
  api_key: string;
  status: number;
  created_time: string;
  updated_time: string;
}

export interface ApiKeyParams extends PageParams {
  name: string;
  status: number;
}
