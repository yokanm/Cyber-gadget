import { useCart } from '@/contexts/CartContext';
import { Address } from '@/type/type';
import Image from 'next/image';

interface OrderSummaryProps {
  currentStep: number;
  addresses: Address[];
  selectedAddress: string;
  selectedShipping: string;
  
}

export default function OrderSummary({
  currentStep,
  addresses,
  selectedAddress,
  selectedShipping,
}: OrderSummaryProps) {


    const {cartTotal, cartItems} = useCart();
    const subtotal = cartTotal;
    const tax = 50;
    const shippingCost = selectedShipping === 'free' ? 0 : selectedShipping === 'express' ? 8.50 : 0;
    const total = subtotal + tax + shippingCost;

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Summary</h2>
      
      {cartItems.length > 0 ? (
        cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3">
            <div className="flex items-center gap-4">
              {item.images?.[0] ? (
                <Image 
                  src={item.images[0]}
                  width={40} 
                  height={40}
                  alt={item.name} 
                  className="w-12 h-12 rounded object-cover"
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded text-gray-500 text-sm">
                  No Img
                </div>
              )}
              <div>
                <span className="text-sm font-medium block">{item.name}</span>
                {item.quantity && (
                  <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                )}
              </div>
            </div>
            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">Your cart is empty</p>
      )}

      <div className="mt-6 space-y-3">
        {currentStep > 1 && (
          <div>
            <div className="text-sm text-gray-600 mb-1">Address</div>
            <div className="text-sm">
              {addresses.find(a => a.id === selectedAddress)?.address}
            </div>
          </div>
        )}
        
        {currentStep > 2 && (
          <div>
            <div className="text-sm text-gray-600 mb-1">Shipment method</div>
            <div className="text-sm">
              {selectedShipping === 'free' ? 'Free' : selectedShipping === 'express' ? 'Express ($8.50)' : 'Schedule'}
            </div>
          </div>
        )}

        <div className="border-t pt-3 mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Estimated Tax</span>
            <span>${tax}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Estimated shipping & Handling</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold pt-2 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
