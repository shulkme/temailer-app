import { LoginData, LoginResult } from '@/apis/auth/types';
import request from '@/apis/request';
import { HttpResponse } from '@/apis/types';

/**
 * 登录
 * @param data
 */
export async function login(
  data: LoginData,
): Promise<HttpResponse<LoginResult>> {
  return await request.post('/auth/login', data);
}

/**
 * 登出
 */
export async function logout() {
  return await request.post('/auth/logout');
}

/**
 * google授权登录
 * @param callback_url
 */
export async function getGoogleAuthLink(
  callback_url: string,
): Promise<HttpResponse<string>> {
  return await request.get('/oauth2/google', {
    params: {
      origin_url: callback_url,
    },
  });
}
