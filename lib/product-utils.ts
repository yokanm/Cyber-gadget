import { Product } from "@/store/type";

// lib/product-utils.ts
export function findProductBySlug(slug: string, products: Product[]) {
  return products.find(product => 
    product.model.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  );
}