import { z } from 'zod'

export const shopSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters long' })
    .max(50, { message: 'Username must be at most 50 characters long' }),

  shop_name: z
    .string()
    .min(2, { message: 'Shop name must be at least 2 characters long' })
    .max(50, { message: 'Shop name must be at most 50 characters long' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(50, { message: 'Password must be at most 50 characters long' }),

  representative: z.string().optional(),

  email: z.string().email({ message: 'Invalid email address' }).optional(),

  insurance_money: z.string().min(0, { message: 'Insurance money must be a non-negative value' }).optional(),

  commission_rate: z.string().min(0, { message: 'Commission rate must be a non-negative value' }).optional(),

  commission_rate_withdraw: z
    .string()
    .min(0, { message: 'Withdraw commission rate must be a non-negative value' })
    .optional(),

  is_active_otp: z.boolean({
    required_error: 'OTP status is required'
  }),

  shop_image: z.string().optional()
})

export type TShopSchema = z.infer<typeof shopSchema>
