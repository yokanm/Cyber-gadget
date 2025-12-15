// lib/supabase-server.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

export function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.error('Missing environment variables:', {
      url: !!url,
      anonKey: !!anonKey,
      env: process.env.NODE_ENV
    });
    throw new Error(
      'Supabase environment variables are missing. ' +
      'Please check your .env.local file contains:\n' +
      'NEXT_PUBLIC_SUPABASE_URL=your_url\n' +
      'NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key'
    );
  }

  return createClient<Database>(url, anonKey);
}