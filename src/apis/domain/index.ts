import {
  DomainParams,
  DomainRecord,
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
  return await request.get('/sys/domain/all');
}

export async function getAllDomainSuffix(): Promise<
  HttpResponse<DomainSuffixRecord[]>
> {
  return await request.get('/sys/domain-suffix/all');
}
