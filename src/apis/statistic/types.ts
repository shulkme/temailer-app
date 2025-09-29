export interface UserStatisticRecord {
  domain_count: number;
  mailbox_count: number;
  email_claim_count: number;
}

export interface UsageStatisticRecord {
  date: string;
  value: number;
}
