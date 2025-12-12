
import CheckoutStepper from '@/components/features/checkout/Checkout'
import ProtectedRoute from '@/components/features/auth/ProtectedRoute'
import React from 'react'


const page = () => {
  return (
    <ProtectedRoute>
      <div>
          <CheckoutStepper />
      </div>
    </ProtectedRoute>
  )
}

export default page