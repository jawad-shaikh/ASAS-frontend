import { z } from "zod";

export const providerFormSchema = z.object({
    firstName: z.string().min(2, { message: 'First Name must be at least 2 characters long' }),
    lastName: z.string().min(2, { message: 'Last Name must be at least 2 characters long' }),
    businessName: z.string().min(2, { message: 'Business Name must be at least 2 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    website: z.string().optional(),
    phoneNumber: z.string().min(10, { message: 'Phone Number must be at least 10 characters long' }),
});

export const providerAccountFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First Name must be at least 2 characters long' }),
  lastName: z.string().min(2, { message: 'Last Name must be at least 2 characters long' }),
  businessName: z.string().min(2, { message: 'Business Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  website: z.string().optional(),
});

export const createUserSchema = z.object({
    fullName: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  });

  export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  });


export const profileSchema = z.object({
    photo: z.string().optional(),
    name: z.string().min(2).max(50).optional(),
    phoneNumber: z.string().min(10).max(15).refine((value) => /^\d+$/.test(value), {
      message: 'Phone number must contain only digits',
      path: ['phone'],
    }).optional(),
    address: z.string().min(5).max(100).optional(),
    city: z.string().min(2).max(50).optional(),
    state: z.string().min(2).max(50).optional(),
    zipCode: z.string().length(5).optional(),
});

export const childSchema = z.object({
  children: z.array(
      z.object({
          childName: z.string()
              .min(2, { message: 'Child name must be at least 2 characters long' })
              .max(50, { message: 'Child name must not exceed 50 characters' }),
          childBirthDate: z.string()
              .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid date format. Use YYYY-MM-DD' })
              .optional(),
      })
  ),
});