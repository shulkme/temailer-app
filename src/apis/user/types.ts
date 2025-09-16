export interface UserRecord {
  username: string;
  nickname: string;
  email: string;
  avatar: string;
  id: number;
  status: number;
  join_time: string;
  invitation_code: string;
}

export interface UserData {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ResetPasswordData {
  code: string;
  new_password: string;
}

export interface SendPasswordEmailData {
  email: string;
}

export interface ActivateResult {
  access_token: string;
  access_token_expire_time: string;
  session_uuid: string;
  user: UserRecord;
}
