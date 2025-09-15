import { UserRecord } from '@/apis/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResult {
  access_token: string;
  access_token_expire_time: string;
  session_uuid: string;
  user: UserRecord;
}
