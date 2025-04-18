// lib/schemas.ts

import { z } from 'zod';

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[a-z]/, 'Must contain a lowercase letter')
    .regex(/[0-9]/, 'Must contain a number')
    .regex(/[\W_]/, 'Must contain a special character'),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const forgotPasswordSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[a-z]/, 'Must contain a lowercase letter')
      .regex(/[0-9]/, 'Must contain a number')
      .regex(/[\W_]/, 'Must contain a special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // will attach the error to `confirmPassword`
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
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[a-z]/, 'Must contain a lowercase letter')
      .regex(/[0-9]/, 'Must contain a number')
      .regex(/[\W_]/, 'Must contain a special character')
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    { message: 'Passwords must match', path: ['confirmPassword'] }
  );

export type SignupInput = z.infer<typeof signupSchema>;
export type SignInInput = z.infer<typeof signinSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type EditProfileInput = z.infer<typeof editProfileSchema>;
