import { z } from "zod"

export const registerSchema = z.object({
  username: z.string().min(3, "Min 3 chars"),
  email: z.email("Invalid email"),
  phone: z.string().min(6, "Min 6 digits"),
  password: z.string().min(6, "Min 6 chars"),
})

export const loginSchema = z.object({
  login: z.string().min(3, "Min 3 chars"),
  password: z.string().min(6, "Min 6 chars"),
})