import { Product } from '@/type/type';

/**
 * Transform raw API/Supabase row into Product type
 */
function transformProduct(row: any): Product {
  return {
    id: row.id,
    category: row.category || '',
    brand: row.brand || '',
    model: row.model || '',
    price: Number(row.price) || 0,
    color: row.color ?? null,
    images: Array.isArray(row.images) ? row.images : [],
    icon: row.icon ?? null,
    details: row.details ?? null,
    views_images: row.views_images ?? null,
    views: row.views ?? null,
    value: row.value || 'new',
    reviews: Array.isArray(row.reviews) ? row.reviews : [],
    specifications: row.specifications || {},
    ratings: Number(row.ratings) || 0,
    rating: Number(row.rating) || 0,
    battery: row.battery ?? null,
    quantity: Number(row.quantity) || 1,
    size: row.size ?? null,
    likes: Boolean(row.likes),
    createdAt: row.created_at || new Date().toISOString(),
  };
}

/**
 * Fetch all products
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    // ✅ Relative URL — safe for dev & production
    const response = await fetch('/api/products', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    // ✅ Explicit typing fixes `unknown`
    const data: Product[] = await response.json();

    return Array.isArray(data)
      ? data.map(transformProduct)
      : [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Fetch unique product categories
 */
export async function fetchCategories(): Promise<string[]> {
  try {
    const products = await fetchProducts();

    // ✅ Fully type-safe: string[]
    return [...new Set(products.map((p) => p.category))];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch unique product brands
 */
export async function fetchBrands(): Promise<string[]> {
  try {
    const products = await fetchProducts();
    return [...new Set(products.map((p) => p.brand))];
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

/**
 * Search products
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const products = await fetchProducts();

    const lowerQuery = query.toLowerCase();

    return products.filter(
      (p) =>
        p.model.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        (p.details?.toLowerCase().includes(lowerQuery) ?? false)
    );
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}
