import { EMAIL_CHANNEL_TYPE_ENUM } from '@/apis/email/enums';
import { EmailRecord } from '@/apis/email/types';
import request from '@/apis/request';
import { HttpResponse, PageResult } from '@/apis/types';

export async function getEmailDetail(
  id: string,
): Promise<HttpResponse<EmailRecord>> {
  return await request.get(`/email/${id}`);
}

export async function getEmailAddress(
  email_provider: EMAIL_CHANNEL_TYPE_ENUM,
): Promise<HttpResponse<string>> {
  return await request.get('/email/imap/lease', {
    params: {
      email_provider,
    },
  });
}

export async function getEmailMessages(
  to_email: string,
  provider_type: EMAIL_CHANNEL_TYPE_ENUM,
): Promise<HttpResponse<PageResult<Omit<EmailRecord, 'content'>>>> {
  return await request.get('/email', {
    params: {
      to_email,
      provider_type,
    },
  });
}
