import ProtectedRoute from "@/components/features/auth/ProtectedRoute";
import Cart from "@/components/features/cart/Cart";



export default async function CartPage() {
    
    return (
        <ProtectedRoute>
        <div>
            <Cart />
        </div>
        </ProtectedRoute>
    )
}