import { PACKAGE_TYPE_ENUM } from '@/apis/packages/enums';
import {
  ProxyOrderData,
  ProxyOrderParams,
  ProxyOrderRecord,
  ProxyParams,
  ProxyRecord,
  ProxyStatistics,
} from '@/apis/proxy/types';
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
  pk: string | number,
  data: Pick<ProxyRecord, 'notes'>,
) {
  return await request.put(`/sys/proxy/${pk}/notes`, data);
}

/**
 * 设置代理自动续费状态
 * @param pks
 * @param auto_renew
 */
export async function setProxyAutoRenew(pks: number[], auto_renew: boolean) {
  return await request.put('/sys/proxy/auto-renew', {
    pks,
    auto_renew,
  });
}

/**
 * 获取代理订单列表
 * @param params
 */
export async function getProxyOrderList(
  params?: ProxyOrderParams,
): Promise<HttpResponse<PageResult<ProxyOrderRecord>>> {
  return await request.get('/sys/proxy/order', {
    params,
  });
}

/**
 * 获取代理统计信息
 * @param package_type
 */
export async function getProxyStatistics(
  package_type: PACKAGE_TYPE_ENUM,
): Promise<HttpResponse<ProxyStatistics>> {
  return await request.get('/sys/proxy/statistics', {
    params: {
      package_type,
    },
  });
}
