// type/type.ts

export interface Product {
  id: number;
  category: string;
  brand: string;
  model: string;
  price: number;
  color: string | null;
  images: string[];
  icon: string | null;
  details: string | null;
  
  // JSON fields - use snake_case to match database
  views_images?: ViewImages | null;
  views?: Views | null;
  // Remove view_images - it's a duplicate of views_images
  
  value: string | null;
  reviews?: Review[];
  battery: string | null;
  quantity: number;
  size: string | null;
  specifications: Specifications;
  likes: boolean;
  
  // Ratings
  ratings?: number;
  rating?: number;
  
  // Timestamps
  createdAt?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Review {
  user_id: number;
  comment: string;
  rating: number;
}

export interface ViewImages {
  front?: string;
  side?: string;
  back?: string;
}

export interface Views {
  front?: string;
  side?: string;
  back?: string;
}

export interface Specifications {
  CPU?: string;
  battery?: string;
  screen_size?: string;
  camera?: string;
  screen?: string;
  batteryCapacity?: string;
  screenType?: string;
  screenDiagonal?: string;
  protectionClass?: string;
  builtInMemory?: string;
  number_of_cores?: string;
  [key: string]: string | undefined;
}

// ============= WISHLIST TYPES =============
export interface WishlistItem {
  id: string | number;
  name: string;
  model: string;
  price: number;
  images?: string[];
  category?: string;
  brand: string;
  addedAt: string;
}

export interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
}

export interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string | number) => void;
  isInWishlist: (id: string | number) => boolean;
  totalItems: number;
  clearWishlist: () => void;
}

// ============= CART TYPES =============
export interface CartItem {
  id: string | number;
  name: string;
  model?: string;
  price: number;
  quantity: number;
  images?: string[];
  category?: string;
}

export interface CartState {
  items: CartItem[];
  promoCode: string;
  bonusCard: string;
  appliedPromo: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: string | number) => number;
  isInCart: (id: string | number) => boolean;
  totalItems: number;
  cartTotal: number;
}

export interface FilterState {
  price: { min: number; max: number };
  brands: string[];
  memory: string[];
  protectionClass: string[];
  screenDiagonal: string[];
  screenType: string[];
  batteryCapacity: string[];
  minRating: number | null;
  categories: string[];
}

// ============= CHECKOUT TYPES =============
export interface Address {
  id: string;
  label: 'HOME' | 'OFFICE' | 'OTHER';
  name: string;
  address: string;
  phone: string;
}

export interface AddressForm {
  name: string;
  label: 'HOME' | 'OFFICE' | 'OTHER';
  address: string;
  phone: string;
}

export interface PaymentFormData {
  cardholderName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
  sameAsBilling: boolean;
}

export interface ShippingMethod {
  type: 'free' | 'express' | 'schedule';
  cost: number;
  estimatedDate?: string;
  selectedDate?: string;
}

export interface CheckoutState {
  currentStep: 1 | 2 | 3;
  addresses: Address[];
  selectedAddress: string | null;
  shippingMethod: ShippingMethod;
  paymentData: PaymentFormData;
  showAddressForm: boolean;
  editingAddress: string | null;
  isProcessing: boolean;
  errors: Record<string, string>;
}

// ============= FILTER TYPES =============
export interface FilterSidebarProps {
  availableBrands: string[];
  availableBattery: string[];
  availableSize: string[];
  selectedBrands: string[];
  selectedBattery: string[];
  selectedSize: string[];
  searchQuery: string;
  products: Product[];
  toggleBrand: (brand: string) => void;
  toggleBattery: (battery: string) => void;
  toggleSize: (size: string) => void;
  setSearchQuery: (query: string) => void;
  resultsCount?: number;
}

export interface FilterStateProps {
  selectedBrands: string[];
  selectedBattery: string[];
  selectedSize: string[];
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  sortBy: 'rating' | 'price_asc' | 'price_desc' | 'newest';
}

// ============= ROOT STATE =============
export interface RootState {
  cart: CartState;
  checkout: CheckoutState;
  filters: FilterState;
}

export type ProductValue = "new" | "bestseller" | "featured";