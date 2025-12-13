import { NextResponse } from 'next/server';
import productsData from '@/data/products.json'; // Move db.json to data/products.json

export async function GET() {
  try {
    return NextResponse.json(productsData);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// Optional: Add caching
export const revalidate = 3600; 