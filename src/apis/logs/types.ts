export interface LoginLogRecord {
  user_uuid: string;
  username: string;
  status: 0;
  ip: string;
  country: string;
  region: string;
  city: string;
  user_agent: string;
  browser: string;
  os: string;
  device: string;
  msg: string;
  login_time: string;
  id: string;
  created_time: string;
}

export interface LoginLogParams {
  username?: string;
  status?: number;
  ip?: string;
  page?: number;
  size?: number;
}
