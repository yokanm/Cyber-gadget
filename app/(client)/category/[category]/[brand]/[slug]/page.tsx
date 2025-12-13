import { fetchProducts } from "@/lib/api";
import { createSlug } from "@/lib/utils";
import DetailsPage from "@/components/features/products/DetailsPage";
import Link from "next/link";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; brand: string; slug: string }>;
}) {
  // Await params in Next.js 15
  const { category, brand, slug } = await params;
  const products = await fetchProducts();

  // Find product by matching slug, brand, and category
  const product = products.find(
    (p) =>
      createSlug(p.model) === slug &&
      createSlug(p.brand) === brand &&
      p.category.toLowerCase() === category.toLowerCase()
  );

  
  if (!product) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="text-blue-600 hover:underline">Return to Home</Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <DetailsPage product={product} />
    </section>
  );
}