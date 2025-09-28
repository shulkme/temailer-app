import {
  ArchiveData,
  ArchiveParams,
  ArchiveRecord,
} from '@/apis/archive/types';
import request from '@/apis/request';
import { HttpResponse, PageResult } from '@/apis/types';

export async function getArchiveList(
  params?: Partial<ArchiveParams>,
): Promise<HttpResponse<PageResult<ArchiveRecord>>> {
  return await request.get('/mailbox', {
    params,
  });
}

export async function addArchive(data: ArchiveData) {
  return await request.post('/mailbox', data);
}

export async function setArchive(data: ArchiveData) {
  return await request.put('/mailbox', data);
}

export async function delArchive(ids: number[]) {
  return await request.delete('/mailbox', {
    data: ids,
  });
}

export async function setArchiveRemark(
  id: number,
  data: {
    remark: string;
  },
) {
  return await request.put(`/mailbox/${id}/remark`, data);
}
