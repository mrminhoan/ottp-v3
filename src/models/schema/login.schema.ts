import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  ip: z.string().optional()
})

export type TLogin = z.infer<typeof loginSchema>
