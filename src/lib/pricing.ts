export const FREE_SHIPPING_AT = 40;
export const SHIPPING_FEE = 4.5;

export function shippingFor(subtotal: number): number {
  return subtotal <= 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
}
