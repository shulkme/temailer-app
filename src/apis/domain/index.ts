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
  return await request.get('/domain/private', {
    params,
  });
}

export async function getAllDomains(): Promise<HttpResponse<DomainRecord[]>> {
  return await request.get('/domain/all', {
    params: {
      status: DOMAIN_STATUS_ENUM.ACTIVE,
    },
  });
}

export async function getAllDomainSuffix(): Promise<
  HttpResponse<DomainSuffixRecord[]>
> {
  return await request.get('/domain/suffix/all');
}

export async function createDomainOrder(
  data: DomainOrderData,
): Promise<HttpResponse<CheckoutResponse>> {
  return await request.post('/domain/order', data);
}

export async function releaseDomain(id: number): Promise<HttpResponse<number>> {
  return await request.put(`/domain/${id}/release`);
}

export async function getDomainSalvage(
  id: number,
): Promise<HttpResponse<DomainSalvageResponse>> {
  return await request.get(`/domain/${id}/refund-calculation`);
}

export async function setDomainRemark(
  id: number,
  data: {
    remark: string;
  },
) {
  return await request.put(`/domain/${id}/remark`, data);
}
