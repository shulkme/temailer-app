export enum PAYMENT_METHOD_ENUM {
  CREDIT = 'credit_card',
  CRYPTO = 'crypto_currency',
  LOCAL = 'local',
  BALANCE = 'balance',
  BANK = 'bank',
}

export enum ORDER_STATUS_ENUM {
  SUCCESS = 'success',
  FAILED = 'fail',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  REFUNDED = 'refunded',
}

export enum ORDER_TYPE_ENUM {
  SUBSCRIPTION = 'subscription',
  CREDIT = 'credit_recharge',
  DOMAIN = 'domain_purchase',
}
