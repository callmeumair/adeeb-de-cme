export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string | null;
  description: string;
  price: number;
  originalPrice: number | null;
  category: string;
  badge: string | null;
  stock: number;
  images: string[];
  videoUrl: string | null;
  sizes: ProductSize[];
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: number;
  projection: number;
  concentration: string;
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  reviews?: Review[];
}

export interface ProductSize {
  id: string;
  productId: string;
  size: string;
  price: number;
  stock: number;
}

export interface CartItemType {
  id: string;
  productId: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
  slug: string;
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: 'CUSTOMER' | 'ADMIN';
  phone: string | null;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  couponCode: string | null;
  discount: number;
  address: Address;
  items: OrderItem[];
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string | null;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string | null;
  body: string;
  verified: boolean;
  createdAt: string;
  user?: { name: string | null; image: string | null };
}

export interface Address {
  id?: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'PERCENT' | 'FIXED';
  value: number;
  minOrder: number;
  maxUses: number | null;
  usedCount: number;
  active: boolean;
  expiresAt: string | null;
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  rating?: number;
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  page?: number;
  search?: string;
}

export interface AdminStats {
  totalRevenue: number;
  ordersToday: number;
  totalCustomers: number;
  lowStockItems: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}
