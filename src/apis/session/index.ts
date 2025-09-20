import request from '@/apis/request';
import { SessionRecord } from '@/apis/session/types';
import { HttpResponse } from '@/apis/types';

export async function getSessionList(): Promise<HttpResponse<SessionRecord[]>> {
  return await request.get('/monitors/sessions');
}

export async function delSession(session_uuid: string) {
  return await request.delete(`/monitors/sessions/${session_uuid}`);
}
