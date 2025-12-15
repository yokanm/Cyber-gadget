export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { fetchProducts } from "@/lib/api";
import { createSlug } from "@/lib/utils";
import DetailsPage from "@/components/features/products/DetailsPage";
import Link from "next/link";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; brand: string; slug: string }>;
}) {
  const { category, brand, slug } = await params;
  const products = await fetchProducts();

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
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <Link href="/">Return to Home</Link>
        </div>
      </section>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsPage product={product} />
    </Suspense>
  );
}
