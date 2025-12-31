// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Product } from '@/type/type';
// Create Supabase client with environment variables
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Transform products to match expected format
    const transformedProducts = (products || []).map((product: Product) => ({
      ...product,
      category: product.category || '',
      brand: product.brand || '',
      model: product.model || '',
      images: Array.isArray(product.images) ? product.images : [],
      specifications: product.specifications || {},
      rating: Number(product.rating) || Number(product.ratings) || 0,
    }));

    return NextResponse.json(transformedProducts, {
      headers: {
        // Shorter cache for dynamic content
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}