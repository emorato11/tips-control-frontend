import type { PaymentType } from '@/types/Payment'

export const PAYMENTS_TYPES: PaymentType[] = [
  { id: 'group-access', name: 'Acceso a grupo' },
  { id: 'single-pick', name: 'Compra pick único' },
  { id: 'premium', name: 'Premium' }
]
