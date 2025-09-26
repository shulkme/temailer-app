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
  return await request.get('/sys/mailbox', {
    params,
  });
}

export async function addArchive(data: ArchiveData) {
  return await request.post('/sys/mailbox', data);
}

export async function setArchive(data: ArchiveData) {
  return await request.put('/sys/mailbox', data);
}

export async function delArchive(ids: number[]) {
  return await request.delete('/sys/mailbox', {
    data: ids,
  });
}

export async function setArchiveRemark(
  id: number,
  data: {
    remark: string;
  },
) {
  return await request.put(`/sys/mailbox/${id}/remark`, data);
}
