// lib/schemas.ts
import { z } from 'zod';

// Reusable password validation
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain an uppercase letter')
  .regex(/[a-z]/, 'Must contain a lowercase letter')
  .regex(/[0-9]/, 'Must contain a number')
  .regex(/[\W_]/, 'Must contain a special character');

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  password: passwordSchema,
});

export const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8),
});

export const forgotPasswordSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const editProfileSchema = z
  .object({
    userId: z.string().min(1, 'User ID is required'),
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name is too long')
      .optional(),
    email: z.string().email('Invalid email address').optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password || confirmPassword) {
      if (!password) {
        ctx.addIssue({
          path: ['password'],
          code: z.ZodIssueCode.custom,
          message: 'Password is required if confirming',
        });
      } else {
        const passCheck = passwordSchema.safeParse(password);
        if (!passCheck.success) {
          passCheck.error.issues.forEach((issue) => {
            ctx.addIssue({ ...issue, path: ['password'] });
          });
        }
      }

      if (password !== confirmPassword) {
        ctx.addIssue({
          path: ['confirmPassword'],
          code: z.ZodIssueCode.custom,
          message: 'Passwords must match',
        });
      }
    }
  });

export const newsLetterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SignInInput = z.infer<typeof signinSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type EditProfileInput = z.infer<typeof editProfileSchema>;
export type NewsLetterInput = z.infer<typeof newsLetterSchema>;
