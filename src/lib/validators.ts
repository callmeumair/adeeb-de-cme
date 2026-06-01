import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(2, 'Product name must be at least 2 characters')
    .max(120, 'Product name must be at most 120 characters'),
  subtitle: z.string().max(200).nullable().optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description must be at most 5000 characters'),
  price: z.number().positive('Price must be a positive number'),
  originalPrice: z.number().positive().nullable().optional(),
  category: z.string().min(1, 'Category is required'),
  badge: z.string().max(30).nullable().optional(),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  images: z
    .array(z.string().url('Each image must be a valid URL'))
    .min(1, 'At least one image is required')
    .max(10, 'Maximum 10 images allowed'),
  videoUrl: z.string().url().nullable().optional(),
  sizes: z
    .array(
      z.object({
        size: z.string().min(1, 'Size is required'),
        price: z.number().positive('Size price must be positive'),
        stock: z.number().int().min(0, 'Size stock cannot be negative'),
      })
    )
    .min(1, 'At least one size is required'),
  topNotes: z.array(z.string().min(1)).min(1, 'At least one top note is required'),
  heartNotes: z.array(z.string().min(1)).min(1, 'At least one heart note is required'),
  baseNotes: z.array(z.string().min(1)).min(1, 'At least one base note is required'),
  longevity: z.number().min(1).max(10),
  projection: z.number().min(1).max(10),
  concentration: z.string().min(1, 'Concentration is required'),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});

export const addressSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  line1: z
    .string()
    .min(5, 'Address line 1 must be at least 5 characters')
    .max(200, 'Address line 1 must be at most 200 characters'),
  line2: z.string().max(200).optional(),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be at most 100 characters'),
  state: z
    .string()
    .min(2, 'State must be at least 2 characters')
    .max(100, 'State must be at most 100 characters'),
  pincode: z
    .string()
    .regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
  country: z.string().default('India'),
  isDefault: z.boolean().optional(),
});

export const orderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1, 'Product ID is required'),
        name: z.string().min(1),
        size: z.string().min(1),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
        image: z.string().url().nullable(),
      })
    )
    .min(1, 'Order must contain at least one item'),
  address: addressSchema,
  couponCode: z.string().max(50).nullable().optional(),
});

export const reviewSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  rating: z
    .number()
    .int()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  title: z
    .string()
    .max(150, 'Title must be at most 150 characters')
    .nullable()
    .optional(),
  body: z
    .string()
    .min(10, 'Review must be at least 10 characters')
    .max(2000, 'Review must be at most 2000 characters'),
});

export const couponSchema = z.object({
  code: z
    .string()
    .min(3, 'Coupon code must be at least 3 characters')
    .max(30, 'Coupon code must be at most 30 characters')
    .regex(/^[A-Z0-9_-]+$/, 'Coupon code must be uppercase alphanumeric'),
  type: z.enum(['PERCENT', 'FIXED']),
  value: z.number().positive('Discount value must be positive'),
  minOrder: z.number().min(0, 'Minimum order cannot be negative'),
  maxUses: z.number().int().positive().nullable().optional(),
  active: z.boolean().default(true),
  expiresAt: z
    .string()
    .datetime({ message: 'Invalid expiry date' })
    .nullable()
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
    ),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number')
    .optional(),
});

export const searchSchema = z.object({
  query: z
    .string()
    .min(1, 'Search query cannot be empty')
    .max(200, 'Search query is too long')
    .trim(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type CouponInput = z.infer<typeof couponSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
