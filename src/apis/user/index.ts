import request from '@/apis/request';
import { HttpResponse } from '@/apis/types';
import {
  ActivateResult,
  ChangePasswordData,
  ResetPasswordData,
  SendPasswordEmailData,
  UserData,
  UserRecord,
} from '@/apis/user/types';

/**
 * 获取用户信息
 */
export async function getUserProfile(): Promise<HttpResponse<UserRecord>> {
  return await request.get('/sys/users/me');
}

/**
 * 注册用户
 * @param data
 */
export async function registerUser(data: UserData) {
  return await request.post('/sys/users/register', data);
}

/**
 * 激活用户
 * @param code
 */
export async function activateUser(
  code: string,
): Promise<HttpResponse<ActivateResult>> {
  return await request.get('/sys/users/activate', {
    params: {
      code,
    },
  });
}

/**
 * 修改用户密码
 * @param data
 */
export async function changePassword(data: ChangePasswordData) {
  return await request.put('/sys/users/password', data);
}

/**
 * 发送重置密码邮件
 * @param data
 */
export async function sendResetPasswordEmail(data: SendPasswordEmailData) {
  return await request.post('/sys/users/send-reset-password-email', data);
}

/**
 * 重置密码
 * @param data
 */
export async function resetPassword(data: ResetPasswordData) {
  return await request.post('/sys/users/reset-password', data);
}
