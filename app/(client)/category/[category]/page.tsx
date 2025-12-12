import ProductsPageX from "@/components/features/products/ProductsPageX"
import { fetchCategories } from "@/lib/api"

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params
  const categories = await fetchCategories()

  if (!categories) {
    return (
      <div className="p-10 text-center text-xl text-gray-500">
        Category not found
      </div>
    )
  }

  return <ProductsPageX category={category} />
}
