export interface EmailRecord {
  from_email: string;
  from_name: string;
  to_email: string;
  to_name: string;
  subject: string;
  summary: string;
  content: string;
  has_attachments: boolean;
  is_claimed: boolean;
  user_id: number;
  source_type: string;
  lease_id: string;
  id: number;
  created_time: string;
}
