import { createServerSupabase } from '@/lib/supabase-server';
import { Product } from '@/type/type';

/**
 * Transform database row to Product type
 */
function transformProduct(row: any): Product {
  return {
    id: row.id,
    category: row.category,
    brand: row.brand,
    model: row.model,
    price: row.price,
    color: row.color,
    images: row.images || [],
    icon: row.icon || '',
    details: row.details || '',
    views_images: row.views_images || { front: '', side: '', back: '' },
    views: row.views || { front: '', side: '', back: '' },
    value: row.value || 'new',
    reviews: row.reviews || [],
    specifications: row.specifications || {},
    ratings: row.ratings || 0,
    rating: row.rating || 0,
    battery: row.battery || '',
    quantity: row.quantity || 1,
    size: row.size || '',
    likes: row.likes || false,
    createdAt: row.created_at,
  };
}

/**
 * Fetch all products
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }

    return (data ?? []).map(transformProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Fetch single product by ID
 */
export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error?.code === 'PGRST116') return null;
    if (error) {
      console.error('Supabase error:', error);
      return null;
    }

    return transformProduct(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }

    return (data ?? []).map(transformProduct);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

/**
 * Fetch products by brand
 */
export async function fetchProductsByBrand(brand: string): Promise<Product[]> {
  try {
    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('brand', brand)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }

    return (data ?? []).map(transformProduct);
  } catch (error) {
    console.error('Error fetching products by brand:', error);
    return [];
  }
}

/**
 * Fetch unique categories
 */
export async function fetchCategories(): Promise<string[]> {
  try {
    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from('products')
      .select('category');

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }

    return [...new Set(data.map(item => item.category))];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch unique brands
 */
export async function fetchBrands(): Promise<string[]> {
  try {
    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from('products')
      .select('brand');

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }

    return [...new Set(data.map(item => item.brand))];
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

/**
 * Fetch unique battery capacities
 */
export async function fetchBattery(): Promise<string[]> {
  try {
    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from('products')
      .select('specifications');

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }

    const batteries = data
      .map(item => {
        if (
          item.specifications &&
          typeof item.specifications === 'object' &&
          !Array.isArray(item.specifications) &&
          'battery' in item.specifications
        ) {
          return (item.specifications as { [key: string]: any }).battery;
        }
        return undefined;
      })
      .filter((b): b is string => b !== undefined && b !== null && b !== '');

    return [...new Set(batteries)];
  } catch (error) {
    console.error('Error fetching battery options:', error);
    return [];
  }
}

/**
 * Search products
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(
        `model.ilike.%${query}%,brand.ilike.%${query}%,details.ilike.%${query}%`
      )
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }

    return (data ?? []).map(transformProduct);
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}