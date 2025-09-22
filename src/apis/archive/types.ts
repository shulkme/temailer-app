import { PageParams } from '@/apis/types';

export interface ArchiveRecord {
  name: string;
  remark?: string;
  id: number;
  created_time: string;
}

export interface ArchiveParams extends PageParams {
  name: string;
}

export interface ArchiveData {
  name: string;
  remark?: string;
}
