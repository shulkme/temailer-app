import { DomainStatusEnum } from '@/apis/domain/enums';
import { PageParams } from '@/apis/types';

export interface DomainRecord {
  id: number;
  name: string;
  status: DomainStatusEnum;
  register_time: string;
  expired_time: string;
  remark: string;
}

export interface DomainParams extends PageParams {
  name: string;
  status: number;
}
