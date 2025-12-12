import { PaymentFormData } from '@/type/type';
import CreditCardDisplay from './CreditCardDisplay';
import PaymentForm from './PaymentForm';


interface PaymentStepProps {
    formData: PaymentFormData;
    setFormData: React.Dispatch<React.SetStateAction<PaymentFormData>>;
    isLoading: boolean;
    handleBack: () => void;
    handlePay: () => void;
}

export default function PaymentStep({
  formData,
  setFormData,
  isLoading,
  handleBack,
  handlePay
}: PaymentStepProps) {

    
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Payment</h2>
      
      {/* Payment Tabs */}
      <div className="flex gap-6 mb-6 border-b">
        <button className="pb-3 px-1 border-b-2 border-black font-medium text-sm">
          Credit Card
        </button>
        <button className="pb-3 px-1 text-gray-400 text-sm hover:text-gray-600">
          PayPal
        </button>
        <button className="pb-3 px-1 text-gray-400 text-sm hover:text-gray-600">
          PayPal Credit
        </button>
      </div>

      <CreditCardDisplay cardholderName={formData.cardholderName} />

      <PaymentForm
        formData={formData}
        setFormData={setFormData}
        isLoading={isLoading}
        handleBack={handleBack}
        handlePay={handlePay}
      />
    </div>
  );
}

