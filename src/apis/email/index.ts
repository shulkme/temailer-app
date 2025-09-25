import { EMAIL_CHANNEL_TYPE_ENUM } from '@/apis/email/enums';
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

export async function getEmailAddress(
  email_provider: EMAIL_CHANNEL_TYPE_ENUM,
): Promise<HttpResponse<string>> {
  return await request.get('/sys/imap_email/lease', {
    params: {
      email_provider,
    },
  });
}

export async function getEmailMessages(
  to_email: string,
  channel: EMAIL_CHANNEL_TYPE_ENUM,
): Promise<HttpResponse<PageResult<Omit<EmailRecord, 'content'>>>> {
  return await request({
    url: [EMAIL_CHANNEL_TYPE_ENUM.TEMP, EMAIL_CHANNEL_TYPE_ENUM.EDU].includes(
      channel,
    )
      ? '/sys/email'
      : '/sys/imap_email/messages',
    method: 'GET',
    params: [
      EMAIL_CHANNEL_TYPE_ENUM.TEMP,
      EMAIL_CHANNEL_TYPE_ENUM.EDU,
    ].includes(channel)
      ? {
          to_email,
          page: 1,
          size: 10,
        }
      : {
          email: to_email,
          limit: 10,
        },
  });
}
