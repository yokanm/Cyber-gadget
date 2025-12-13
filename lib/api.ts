// lib/api.ts
import { Product } from "@/type/type";

const URL = "/api";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${URL}/products`, {
      cache: 'no-store',
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// Get unique categories
export async function fetchCategories(): Promise<string[]> {
  const products = await fetchProducts();
  const categories = products.map(product => product.category);
  return [...new Set(categories)];
}

// Get unique brands
export async function fetchBrands(): Promise<string[]> {
  const products = await fetchProducts();
  const brands = products.map(product => product.brand);
  return [...new Set(brands)];
}

export async function fetchBattery(): Promise<string[]> {
  const products = await fetchProducts();
  const battery = products
    .map(product => product.specifications.battery)
    .filter((b): b is string => b !== undefined);
  return [...new Set(battery)];
}