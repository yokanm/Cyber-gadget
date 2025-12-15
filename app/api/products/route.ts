// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase-server';

export async function GET() {
  try {
    const supabase = createServerSupabase();
    
    const { data: products, error } = await supabase
      .from('products') // Replace with your actual table name
      .select('*');

    if (error) {
      throw error;
    }

    return NextResponse.json(products || []);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}