import { Product } from "@/type/type";

const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${URL}/products`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// Get unique categories
export async function fetchCategories(): Promise<string[]> {
  try {
    const products = await fetchProducts();
    const categories = products.map(product => product.category);
    return [...new Set(categories)];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Get unique brands
export async function fetchBrands(): Promise<string[]> {
  try {
    const products = await fetchProducts();
    const brands = products.map(product => product.brand);
    return [...new Set(brands)];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

export async function fetchBattery(): Promise<string[]> {
  try {
    const products = await fetchProducts();
    const battery = products
      .map(product => product.specifications.battery)
      .filter((b): b is string => b !== undefined);
    return [...new Set(battery)];
  } catch (error) {
    console.error("Error fetching battery info:", error);
    return [];
  }
}