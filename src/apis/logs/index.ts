import { LoginLogParams, LoginLogRecord } from '@/apis/logs/types';
import request from '@/apis/request';
import { HttpResponse, PageResult } from '@/apis/types';

/**
 * 登录日志
 * @param params
 */
export async function getLoginLogList(
  params?: LoginLogParams,
): Promise<HttpResponse<PageResult<LoginLogRecord>>> {
  return request.get('/logs/login', {
    params,
  });
}
