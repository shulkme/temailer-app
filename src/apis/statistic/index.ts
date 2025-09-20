import request from '@/apis/request';
import { UserStatisticRecord } from '@/apis/statistic/types';
import { HttpResponse } from '@/apis/types';

export async function getUserStatistics(): Promise<
  HttpResponse<UserStatisticRecord>
> {
  return await request.get('/sys/statistics/user');
}
