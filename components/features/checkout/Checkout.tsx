'use client';

import StepperHeader from './StepperHeader';
import OrderSummary from './OrderSummary';
import AddressStep from './AddressStep';
import ShippingStep from './ShippingStep';
import PaymentStep from './PaymentStep';
import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { Address, PaymentFormData } from '@/type/type';



export default function CheckoutStepper () {
  
  const { error: showError, success: showSuccess } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedShipping, setSelectedShipping] = useState('free');
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'home',
      label: 'HOME',
      name: '2118 Thornridge',
      address: '2118 Thornridge Cir. Syracruse, Connecticut 35624',
      phone: '(209) 555-0104'
    },
    {
      id: 'office',
      label: 'OFFICE',
      name: 'Headoffice',
      address: '2715 Ash Dr. San Jose, South Dakota 83475',
      phone: '(704) 555-0127'
    }
  ]);

  const [formData, setFormData] = useState<PaymentFormData>({
    cardholderName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    sameAsBilling: true
  });

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!selectedAddress || addresses.length === 0) {
        showError('Please select a delivery address');
        return false;
      }
    }
    
    if (step === 2) {
      if (selectedShipping === 'schedule' && !selectedDate) {
        showError('Please select a delivery date');
        return false;
      }
    }
    
    return true;
  };

  const handleNext = async() => {
    if(!validateStep(currentStep)) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      showSuccess(`Step ${currentStep} completed`);
    }
    setIsLoading(false);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const validatePayment = (): boolean => {
    if (!formData.cardholderName.trim()) {
      showError('Please enter cardholder name');
      return false;
    }

    const cardNumber = formData.cardNumber.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      showError('Please enter a valid card number');
      return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(formData.expDate)) {
      showError('Please enter expiry date in MM/YY format');
      return false;
    }

    const [month] = formData.expDate.split('/').map(Number);
    if (month < 1 || month > 12) {
      showError('Invalid expiry month');
      return false;
    }

    if (formData.cvv.length < 3 || formData.cvv.length > 4) {
      showError('Please enter a valid CVV');
      return false;
    }

    return true;
  };

  const handlePay = async () => {
    if (!validatePayment()) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    showSuccess('Payment processed successfully! Thank you for your purchase.');
    setIsLoading(false);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-20 xl:px-40 py-12">
        <StepperHeader currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {currentStep === 3 && (
            <div className="hidden lg:block">
              <OrderSummary
                currentStep={currentStep}
                addresses={addresses}
                selectedAddress={selectedAddress}
                selectedShipping={selectedShipping}
              />
            </div>
          )}

          <div className={`bg-white rounded-lg p-6 ${
            currentStep === 3 ? 'lg:col-span-1' : 'lg:col-span-2'
          }`}>
            {currentStep === 1 && (
              <AddressStep
                addresses={addresses}
                setAddresses={setAddresses}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                isLoading={isLoading}
                handleNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <ShippingStep
                selectedShipping={selectedShipping}
                setSelectedShipping={setSelectedShipping}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                handleBack={handleBack}
                handleNext={handleNext}
              />
            )}

            {currentStep === 3 && (
              <PaymentStep
                formData={formData}
                setFormData={setFormData}
                isLoading={isLoading}
                handleBack={handleBack}
                handlePay={handlePay}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

