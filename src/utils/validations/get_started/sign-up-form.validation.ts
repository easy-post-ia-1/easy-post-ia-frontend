import { z } from '@i18n-zod/i18n-zod-setup.ts';

export const signupSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username must be at most 20 characters long'),

    email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),

    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters long')
      .max(50, 'Password must be at most 50 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one number'),

    confirmPasswd: z.string({ required_error: 'Confirm password is required' }),

    role: z
      .string()
      .transform((val) => val.toUpperCase()) // Transform to uppercase
      .refine((val) => ['ADMIN', 'EMPLOYER', 'EMPLOYEE'].includes(val), {
        message: 'Role must be one of ADMIN, EMPLOYER, or EMPLOYEE',
      }),

    company_code: z.string({ required_error: 'Company code is required' }),
    team_code: z.string({ required_error: 'Team code is required' }),
    team_name: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPasswd, {
    path: ['confirmPasswd'],
    message: "Passwords don't match",
  });
