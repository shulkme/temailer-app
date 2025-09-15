import { PackageParams, PackageRecord } from '@/apis/packages/types';
import request from '@/apis/request';
import { HttpResponse } from '@/apis/types';

/**
 * 获取全部套餐
 * @param params
 */
export async function getAllPackages(
  params?: PackageParams,
): Promise<HttpResponse<PackageRecord[]>> {
  return await request.get('/sys/packages/all', {
    params,
  });
}
