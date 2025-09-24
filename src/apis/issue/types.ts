import { ISSUE_TYPE_ENUM } from '@/apis/issue/enums';

export interface IssueData {
  type: ISSUE_TYPE_ENUM;
  meta: Record<string, unknown>;
  content?: string;
}
