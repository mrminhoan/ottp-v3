import { z } from 'zod'

export const sellerSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters long' })
    .max(50, { message: 'Username must be at most 50 characters long' }),

  seller_name: z
    .string()
    .min(2, { message: 'Shop name must be at least 2 characters long' })
    .max(50, { message: 'Shop name must be at most 50 characters long' }),

  commission_rate: z.string().min(0, { message: 'Commission rate must be a non-negative value' }).optional(),

  commission_rate_withdraw: z
    .string()
    .min(0, { message: 'Withdraw commission rate must be a non-negative value' })
    .optional()
})

export type TSellerSchema = z.infer<typeof sellerSchema>
