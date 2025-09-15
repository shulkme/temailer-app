export interface CreditRecord {
  id: string;
  user_id: string;
  rule_id: string;
  points: number;
  type: string;
  start_at: string;
  expire_at: string;
  status: string;
  business_type: string;
  description: string;
  parent_id: string;
  created_time: string;
}

export interface CreditParams {
  credit_type?: string;
  business_type?: string;
  status?: string;
  start_at?: string;
  end_at?: string;
  is_expired?: boolean;
  page?: number;
  size?: number;
}
