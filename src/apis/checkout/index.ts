import { CheckoutByStripeData, CheckoutResponse } from '@/apis/checkout/types';
import request from '@/apis/request';
import { HttpResponse } from '@/apis/types';

/**
 * 通过Stripe下单
 * @param data
 */
export async function checkoutByStripe(
  data: CheckoutByStripeData,
): Promise<HttpResponse<CheckoutResponse>> {
  return await request.post('/sys/checkout-stripe/session', data);
}
