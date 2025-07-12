// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role:
    | "individual_buyer"
    | "company_buyer"
    | "organization_buyer"
    | "vendor"
    | "admin";
  buyerType?: "individual" | "company" | "organization";
  status: "active" | "inactive" | "suspended";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BuyerProfile {
  id: string;
  userId: string;
  buyerType: "individual" | "company" | "organization";
  entityName?: string; // Company name or Organization name
  entityType?: string; // Industry for companies, org type for organizations
  registrationNumber?: string;
  taxId?: string;
  website?: string;
  jobTitle?: string;
  department?: string;
  taxExemptStatus?: boolean;
  budgetAuthority?: boolean;
  address: Address;
}

export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Vendor {
  id: string;
  userId?: string;
  companyName: string;
  businessType?: string;
  registrationNumber?: string;
  taxId?: string;
  website?: string;
  description?: string;
  logoUrl?: string;
  status: "active" | "inactive" | "pending" | "suspended";
  verificationStatus: "unverified" | "pending" | "verified" | "rejected";
  rating: number;
  totalOrders: number;
  address: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  vendorId: string;
  categoryId?: string;
  name: string;
  description?: string;
  sku?: string;
  price: number;
  currency: string;
  stockQuantity: number;
  minimumOrderQuantity: number;
  leadTimeDays?: number;
  status: "active" | "inactive" | "out_of_stock";
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  vendorId: string;
  status:
    | "draft"
    | "pending"
    | "confirmed"
    | "in_progress"
    | "shipped"
    | "delivered"
    | "completed"
    | "cancelled";
  totalAmount: number;
  taxAmount: number;
  currency: string;
  orderDate: string;
  expectedDeliveryDate?: string;
  actualDeliveryDate?: string;
  notes?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone?: string;
  buyerType: "individual" | "company" | "organization";

  // Company/Organization specific
  entityName?: string;
  entityType?: string;
  registrationNumber?: string;
  taxId?: string;
  website?: string;
  jobTitle?: string;
  department?: string;

  // Organization specific
  taxExemptStatus?: boolean;
  budgetAuthority?: boolean;

  // Address
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Component Props Types
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined";
}

export interface StatusBadgeProps {
  status: string;
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  size?: "sm" | "md" | "lg";
}

// Navigation Types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavigationItem[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  rating?: number;
  verificationStatus?: string;
}
