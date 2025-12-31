// lib/api.ts - Production-ready version
import { Product } from '@/type/type';

function transformProduct(row: any): Product {
  return {
    id: row.id,
    category: row.category || '',
    brand: row.brand || '',
    model: row.model || '',
    price: Number(row.price) || 0,
    color: row.color || null,
    images: Array.isArray(row.images) ? row.images : [],
    icon: row.icon || null,
    details: row.details || null,
    views_images: row.views_images || null,
    views: row.views || null,
    value: row.value || 'new',
    reviews: Array.isArray(row.reviews) ? row.reviews : [],
    specifications: row.specifications || {},
    ratings: Number(row.ratings) || 0,
    rating: Number(row.rating) || 0,
    battery: row.battery || null,
    quantity: Number(row.quantity) || 1,
    size: row.size || null,
    likes: Boolean(row.likes),
    createdAt: row.created_at || new Date().toISOString(),
  };
}

// Get the API base URL based on environment
function getApiBaseUrl(): string {
  // Check if we're on the server
  if (typeof window === 'undefined') {
    // In production, use VERCEL_URL or custom domain
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    // In development
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  }
  
  // On the client, use relative URL or window.location.origin
  return window.location.origin;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const apiUrl = `${baseUrl}/api/products`;
    
    console.log('🔍 Fetching from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.error('❌ Invalid data format:', typeof data);
      return [];
    }

    const transformedProducts = data.map(transformProduct);
    console.log(`✅ Fetched ${transformedProducts.length} products`);
    
    return transformedProducts;
  } catch (error) {
    console.error('💥 Error fetching products:', error);
    
    // Return empty array instead of throwing to prevent build failures
    return [];
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const products = await fetchProducts();
    const categories = [...new Set(products.map(p => p.category))];
    console.log('📁 Found categories:', categories);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Add a function to fetch a single product (useful for SSG)
export async function fetchProductBySlug(
  category: string,
  brand: string,
  slug: string
): Promise<Product | null> {
  try {
    const products = await fetchProducts();
    
    const product = products.find(
      (p) =>
        p.category.toLowerCase() === category.toLowerCase() &&
        p.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') === brand &&
        p.model.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
    );

    return product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}