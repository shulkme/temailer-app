export enum ORDER_STATUS_ENUM {
  PENDING = 0,
  PAID = 1,
  FAILED = 2,
  EXPIRED = 3,
}

export enum ORDER_TYPE_ENUM {
  SUBSCRIPTION = 'subscription',
  CREDIT = 'credit_recharge',
  DOMAIN = 'domain_purchase',
}
