import request from '@/apis/request';
import {
  UsageStatisticRecord,
  UserStatisticRecord,
} from '@/apis/statistic/types';
import { HttpResponse } from '@/apis/types';

export async function getUserStatistics(): Promise<
  HttpResponse<UserStatisticRecord>
> {
  return await request.get('/sys/statistics/user');
}

export async function getEmailUsageStatistics(
  days: number,
): Promise<HttpResponse<UsageStatisticRecord>> {
  return await request.get('/sys/statistics/email-usage', {
    params: {
      days,
    },
  });
}

export async function getApiUsageStatistics(
  days: number,
): Promise<HttpResponse<UsageStatisticRecord>> {
  return await request.get('/sys/statistics/api-usage', {
    params: {
      days,
    },
  });
}
