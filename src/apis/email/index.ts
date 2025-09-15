import { SendEmailCodeData } from '@/apis/email/types';
import request from '@/apis/request';

/**
 * 发送邮件验证码
 * @param data
 */
export async function sendEmailCode(data: SendEmailCodeData) {
  return await request.post('/sys/email/code', data);
}
