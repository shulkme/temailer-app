import {
  CreditParams,
  CreditRechargeParams,
  CreditRechargeRecord,
  CreditRecord,
  CreditSubscriptionPlanRecord,
  CreditUsageStatisticRecord,
} from '@/apis/credit/types';
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

/**
 * 获取充值记录
 * @param params
 */
export async function getRechargeRecordList(
  params?: CreditRechargeParams,
): Promise<HttpResponse<PageResult<CreditRechargeRecord>>> {
  return await request.get('/credit/record/recharge_records', {
    params,
  });
}

/**
 * 获取用户积分使用统计
 * @param days
 */
export async function getCreditUsageStatistics(
  days: number,
): Promise<HttpResponse<CreditUsageStatisticRecord>> {
  return await request.get('/credit/record/usage_statistics', {
    params: {
      days,
    },
  });
}

export async function getCurrentSubscription(): Promise<
  HttpResponse<CreditSubscriptionPlanRecord>
> {
  return await request.get('/credit/record/current_subscription');
}
