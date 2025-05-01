export interface Payment {
  id: string
  tipsterId: string
  tipsterName: string
  date: Date
  name: string
  description?: string
  spent: number
  typeId: string
  typeName: string
  group?: { id: string; name: string }
}

export interface ParsedPayment extends Payment {
  typeName: string
}

export type CreatePayment = Omit<Payment, 'date' | 'description' | 'id'>
export type YieldPayment = Pick<Payment, 'date' | 'spent' | 'name' | 'typeId' | 'typeName' | 'id'>

export interface PaymentType {
  id: string
  name: string
}
