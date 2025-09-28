import { ApiKeyParams, ApiKeyRecord } from '@/apis/api_key/types';
import request from '@/apis/request';
import { HttpResponse, PageResult } from '@/apis/types';

export async function getApiKeyList(
  params?: Partial<ApiKeyParams>,
): Promise<HttpResponse<PageResult<ApiKeyRecord>>> {
  return await request.get('/sys/api-key', {
    params,
  });
}

export async function refreshApiKey(api_key: string) {
  return await request.post('/sys/api-key/refresh', {
    api_key,
  });
}
