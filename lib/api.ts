// lib/api.ts
import { Product } from '@/type/type';
const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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
    views_images: row.views_images || { front: '', side: '', back: '' } || null,
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

export async function fetchProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Failed to fetch');

    const data = await response.json();
    return Array.isArray(data) ? data.map(transformProduct) : [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export async function fetchCategories(): Promise<string[]> {
  const products = await fetchProducts();
  return [...new Set(products.map(p => p.category))];
}