import { OrderParams, OrderRecord } from '@/apis/order/types';
import request from '@/apis/request';
import { HttpResponse, PageResult } from '@/apis/types';

export async function getOrderList(
  params?: Partial<OrderParams>,
): Promise<HttpResponse<PageResult<OrderRecord>>> {
  return await request.get('/sys/order', {
    params,
  });
}
