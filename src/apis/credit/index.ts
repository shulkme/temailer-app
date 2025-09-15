import { CreditParams, CreditRecord } from '@/apis/credit/types';
import request from '@/apis/request';
import { HttpResponse, PageResult } from '@/apis/types';

/**
 * 获取积分明细
 * @param params
 */
export async function getCreditRecordList(
  params?: CreditParams,
): Promise<HttpResponse<PageResult<CreditRecord>>> {
  return await request.get('/credit/record', {
    params,
  });
}

/**
 * 获取可用积分
 */
export async function getAvailableCredits(): Promise<HttpResponse<number>> {
  return await request.get('/credit/record/available_credits');
}
