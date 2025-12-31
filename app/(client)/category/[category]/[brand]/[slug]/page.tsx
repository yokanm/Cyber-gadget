import { Suspense } from 'react';
import { fetchProducts } from "@/lib/api";
import { createSlug } from "@/lib/utils";
import DetailsPage from "@/components/features/products/DetailsPage";
import { notFound } from 'next/navigation';

// Add this to enable dynamic rendering in production
export const dynamic = 'force-dynamic';
// Or use this if you want ISR (Incremental Static Regeneration)
// export const revalidate = 3600; // Revalidate every hour

// Optional: Generate static params for popular products
export async function generateStaticParams() {
  try {
    const products = await fetchProducts();
    
    // Generate paths for all products (or limit to popular ones)
    return products.slice(0, 50).map((product) => ({
      category: product.category.toLowerCase(),
      brand: createSlug(product.brand),
      slug: createSlug(product.model),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; brand: string; slug: string }>;
}) {
  try {
    // Await params in Next.js 15
    const { category, brand, slug } = await params;
    
    // Fetch products
    const products = await fetchProducts();

    if (!products || products.length === 0) {
      console.error('No products found');
      notFound();
    }

    // Find product by matching slug, brand, and category
    const product = products.find(
      (p) =>
        createSlug(p.model) === slug &&
        createSlug(p.brand) === brand &&
        p.category.toLowerCase() === category.toLowerCase()
    );

    if (!product) {
      console.error(`Product not found: ${category}/${brand}/${slug}`);
      notFound();
    }

    return (
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
      }>
        <DetailsPage product={product} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading product page:', error);
    notFound();
  }
}

// Add metadata generation for better SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; brand: string; slug: string }>;
}) {
  try {
    const { category, brand, slug } = await params;
    const products = await fetchProducts();
    
    const product = products.find(
      (p) =>
        createSlug(p.model) === slug &&
        createSlug(p.brand) === brand &&
        p.category.toLowerCase() === category.toLowerCase()
    );

    if (!product) {
      return {
        title: 'Product Not Found',
      };
    }

    return {
      title: `${product.model} - ${product.brand} | Cyber Gadget`,
      description: product.details || `Buy ${product.model} by ${product.brand} at the best price`,
    };
  } catch (error) {
    return {
      title: 'Product Details',
    };
  }
}