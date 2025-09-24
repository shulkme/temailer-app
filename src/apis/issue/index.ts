import { IssueData } from '@/apis/issue/types';
import request from '@/apis/request';

export async function createIssue(data: IssueData) {
  return await request.post('/sys/issues', data);
}
