// lib/api.ts
import { supabase } from './supabase';
import { Product } from "@/type/type";

/**
 * Transform database row to Product type
 * Handles type casting and null values properly
 */
function transformProduct(row: any): Product {
  // Helper to safely parse JSON fields
  const parseJSON = (field: any, defaultValue: any = {}) => {
    if (!field) return defaultValue;
    if (typeof field === 'object') return field;
    try {
      return JSON.parse(field);
    } catch {
      return defaultValue;
    }
  };

  // Helper to ensure array
  const ensureArray = (field: any, defaultValue: any[] = []) => {
    if (!field) return defaultValue;
    if (Array.isArray(field)) return field;
    return defaultValue;
  };

  return {
    id: row.id,
    category: row.category,
    brand: row.brand,
    model: row.model,
    price: Number(row.price) || 0,
    color: row.color || null,
    images: ensureArray(row.images),
    icon: row.icon || null,
    details: row.details || null,
    
    // JSON fields - safely parse
    views_images: parseJSON(row.views_images, {}),
    views: parseJSON(row.views, {}),
    
    value: row.value || null,
    reviews: ensureArray(parseJSON(row.reviews, [])),
    specifications: parseJSON(row.specifications, {}),
    
    // Numeric fields
    ratings: row.ratings ? Number(row.ratings) : 0,
    rating: row.rating ? Number(row.rating) : undefined,
    
    // Other fields
    battery: row.battery || null,
    quantity: row.quantity || 1,
    size: row.size || null,
    likes: Boolean(row.likes),
    
    // Timestamps
    createdAt: row.created_at || undefined,
    created_at: row.created_at || null,
    updated_at: row.updated_at || null
  };
}

/**
 * Fetch all products from Supabase
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Failed to fetch products: ${error.message}`);
    }

    // Transform data to match Product type
    return (data || []).map(transformProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Product not found
      }
      throw error;
    }

    return transformProduct(data);
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(transformProduct);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
}

/**
 * Fetch products by brand
 */
export async function fetchProductsByBrand(brand: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('brand', brand)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(transformProduct);
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    throw error;
  }
}

/**
 * Fetch unique categories
 */
export async function fetchCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('category');

    if (error) throw error;

    const categories = (data || []).map(item => item.category).filter(Boolean);
    return [...new Set(categories)];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

/**
 * Fetch unique brands
 */
export async function fetchBrands(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('brand');

    if (error) throw error;

    const brands = (data || []).map(item => item.brand).filter(Boolean);
    return [...new Set(brands)];
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
}

/**
 * Fetch unique battery capacities
 */
export async function fetchBattery(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('battery');

    if (error) throw error;

    // Get batteries from battery field (not specifications)
    const batteries = (data || [])
      .map(item => item.battery)
      .filter((b): b is string => Boolean(b));
    
    return [...new Set(batteries)];
  } catch (error) {
    console.error("Error fetching battery info:", error);
    throw error;
  }
}

/**
 * Search products by query
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`model.ilike.%${query}%,brand.ilike.%${query}%,details.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(transformProduct);
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
}

/**
 * Fetch products with filters (advanced)
 */
export async function fetchProductsWithFilters({
  category,
  brands,
  minPrice,
  maxPrice,
  value,
  limit = 100,
  offset = 0
}: {
  category?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  value?: string;
  limit?: number;
  offset?: number;
}): Promise<Product[]> {
  try {
    let query = supabase
      .from('products')
      .select('*');

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }

    if (brands && brands.length > 0) {
      query = query.in('brand', brands);
    }

    if (minPrice !== undefined) {
      query = query.gte('price', minPrice);
    }

    if (maxPrice !== undefined) {
      query = query.lte('price', maxPrice);
    }

    if (value) {
      query = query.eq('value', value);
    }

    // Apply pagination and ordering
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error } = await query;

    if (error) throw error;

    return (data || []).map(transformProduct);
  } catch (error) {
    console.error("Error fetching products with filters:", error);
    throw error;
  }
}