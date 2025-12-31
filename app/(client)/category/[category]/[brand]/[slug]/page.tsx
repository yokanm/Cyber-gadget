import { Suspense } from 'react';
import { fetchProducts } from "@/lib/api";
import { createSlug } from "@/lib/utils";
import DetailsPage from "@/components/features/products/DetailsPage";
import { notFound } from 'next/navigation';

// Force dynamic rendering for production
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Generate static params for popular products (optional)
export async function generateStaticParams() {
  try {
    const products = await fetchProducts();
    
    // Generate paths for top 100 products to improve initial load
    return products.slice(0, 100).map((product) => ({
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
    // Await params - required in Next.js 15
    const { category, brand, slug } = await params;
    
    console.log('Searching for product:', { category, brand, slug });
    
    // Fetch products
    const products = await fetchProducts();

    if (!products || products.length === 0) {
      console.error('No products found in database');
      notFound();
    }

    // Find product by matching slug, brand, and category (case-insensitive)
    const product = products.find(
      (p) => {
        const matchesSlug = createSlug(p.model) === slug;
        const matchesBrand = createSlug(p.brand) === brand;
        const matchesCategory = p.category.toLowerCase() === category.toLowerCase();
        
        return matchesSlug && matchesBrand && matchesCategory;
      }
    );

    if (!product) {
      console.error(`Product not found for: ${category}/${brand}/${slug}`);
      
      // Log available products for debugging
      console.log('Available products:', products.slice(0, 5).map(p => ({
        category: p.category,
        brand: createSlug(p.brand),
        model: createSlug(p.model)
      })));
      
      notFound();
    }

    console.log('Product found:', product.model);

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

// Generate metadata for SEO
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
      description: product.details || `Buy ${product.model} by ${product.brand} at the best price. ${product.category} with premium features.`,
      openGraph: {
        title: `${product.model} - ${product.brand}`,
        description: product.details || `${product.model} by ${product.brand}`,
        images: product.images?.[0] ? [product.images[0]] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product Details',
    };
  }
}