import { CheckoutResponse } from '@/apis/checkout/types';
import { DOMAIN_STATUS_ENUM } from '@/apis/domain/enums';
import {
  DomainOrderData,
  DomainParams,
  DomainRecord,
  DomainSalvageResponse,
  DomainSuffixRecord,
} from '@/apis/domain/types';
import request from '@/apis/request';
import { HttpResponse, PageResult } from '@/apis/types';

export async function getMyDomainList(
  params?: Partial<DomainParams>,
): Promise<HttpResponse<PageResult<DomainRecord>>> {
  return await request.get('/sys/domain/private', {
    params,
  });
}

export async function getAllDomains(): Promise<HttpResponse<DomainRecord[]>> {
  return await request.get('/sys/domain/all', {
    params: {
      status: DOMAIN_STATUS_ENUM.ACTIVE,
    },
  });
}

export async function getAllDomainSuffix(): Promise<
  HttpResponse<DomainSuffixRecord[]>
> {
  return await request.get('/sys/domain-suffix/all');
}

export async function createDomainOrder(
  data: DomainOrderData,
): Promise<HttpResponse<CheckoutResponse>> {
  return await request.post('/sys/domain/order', data);
}

export async function releaseDomain(id: number): Promise<HttpResponse<number>> {
  return await request.put(`/sys/domain/${id}/release`);
}

export async function getDomainSalvage(
  id: number,
): Promise<HttpResponse<DomainSalvageResponse>> {
  return await request.get(`/sys/domain/${id}/refund-calculation`);
}
