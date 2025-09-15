import { ProxyOrderData, ProxyParams, ProxyRecord } from '@/apis/proxy/types';
import request from '@/apis/request';
import { HttpResponse, PageResult } from '@/apis/types';

/**
 * 获取代理列表
 * @param params
 */
export async function getProxyList(
  params?: ProxyParams,
): Promise<HttpResponse<PageResult<ProxyRecord>>> {
  return await request.get('/sys/proxy', {
    params,
  });
}

/**
 * 创建代理订单
 * @param data
 */
export async function createProxyOrder(data: ProxyOrderData) {
  return await request.post('/sys/proxy/order', data);
}

/**
 * 更新代理备注
 * @param pk
 * @param data
 */
export async function updateProxyNotes(
  pk: string,
  data: Pick<ProxyRecord, 'notes'>,
) {
  return await request.put(`/sys/proxy/${pk}/notes`, data);
}
