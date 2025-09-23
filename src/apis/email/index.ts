import { EmailRecord } from '@/apis/email/types';
import request from '@/apis/request';
import { HttpResponse, PageResult } from '@/apis/types';

export async function getEmailList(
  to_email: string,
): Promise<HttpResponse<PageResult<Omit<EmailRecord, 'content'>>>> {
  return await request.get('/sys/email', {
    params: {
      to_email,
    },
  });
}

export async function getEmailDetail(
  id: string,
): Promise<HttpResponse<EmailRecord>> {
  return await request.get(`/sys/email/${id}`);
}
