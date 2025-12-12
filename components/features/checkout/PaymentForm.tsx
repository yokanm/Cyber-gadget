import { useState} from "react";
import { PaymentFormData } from "@/type/type";

interface PaymentFormProps {
  formData: PaymentFormData;
  setFormData: React.Dispatch<React.SetStateAction<PaymentFormData>>;
  isLoading: boolean;
  handleBack: () => void;
  handlePay: () => void;
}

interface ValidationErrors {
  cardholderName?: string;
  cardNumber?: string;
  expDate?: string;
  cvv?: string;
}

export default function PaymentForm({
  formData,
  setFormData,
  isLoading,
  handleBack,
  handlePay
}: PaymentFormProps) {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate individual fields
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'cardholderName':
        if (!value.trim()) return 'Cardholder name is required';
        if (value.trim().length < 3) return 'Name must be at least 3 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name can only contain letters';
        break;

      case 'cardNumber':
        const cleanCard = value.replace(/\s/g, '');
        if (!cleanCard) return 'Card number is required';
        if (cleanCard.length < 13) return 'Card number must be at least 13 digits';
        if (cleanCard.length > 19) return 'Card number is too long';
        if (!/^\d+$/.test(cleanCard)) return 'Card number must contain only digits';
        // Luhn algorithm validation
        if (!isValidCardNumber(cleanCard)) return 'Invalid card number';
        break;

      case 'expDate':
        if (!value) return 'Expiration date is required';
        if (value.length !== 5) return 'Format must be MM/YY';
        const [month, year] = value.split('/');
        const monthNum = parseInt(month);
        if (monthNum < 1 || monthNum > 12) return 'Invalid month';
        
        // Check if card is expired
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        const yearNum = parseInt(year);
        
        if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
          return 'Card has expired';
        }
        break;

      case 'cvv':
        if (!value) return 'CVV is required';
        if (value.length < 3) return 'CVV must be 3-4 digits';
        if (!/^\d+$/.test(value)) return 'CVV must contain only digits';
        break;
    }
    return undefined;
  };

  // Luhn algorithm for card validation
  const isValidCardNumber = (cardNumber: string): boolean => {
    let sum = 0;
    let isEven = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    Object.keys(formData).forEach((key) => {
      if (key !== 'sameAsBilling') {
        const error = validateField(key, formData[key as keyof PaymentFormData] as string);
        if (error) newErrors[key as keyof ValidationErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle blur to show errors after user leaves field
  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof PaymentFormData] as string);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  const formatExpDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + (cleaned.length > 2 ? '/' + cleaned.slice(2, 4) : '');
    }
    return cleaned;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === 'cardNumber') {
      const formatted = formatCardNumber(value.slice(0, 19));
      setFormData((prev: PaymentFormData) => ({ ...prev, [name]: formatted }));
      
      // Clear error when user starts typing
      if (touched[name]) {
        const error = validateField(name, formatted);
        setErrors(prev => ({ ...prev, [name]: error }));
      }
      return;
    }

    if (name === 'expDate') {
      const formatted = formatExpDate(value);
      setFormData((prev: PaymentFormData) => ({ ...prev, [name]: formatted }));
      
      if (touched[name]) {
        const error = validateField(name, formatted);
        setErrors(prev => ({ ...prev, [name]: error }));
      }
      return;
    }

    if (name === 'cvv') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      setFormData((prev: PaymentFormData) => ({ ...prev, [name]: cleaned }));
      
      if (touched[name]) {
        const error = validateField(name, cleaned);
        setErrors(prev => ({ ...prev, [name]: error }));
      }
      return;
    }

    setFormData((prev: PaymentFormData) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Validate on change for text inputs if field was touched
    if (type !== 'checkbox' && touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handlePayWithValidation = () => {
    // Mark all fields as touched
    setTouched({
      cardholderName: true,
      cardNumber: true,
      expDate: true,
      cvv: true
    });

    if (validateForm()) {
      handlePay();
    }
  };

  return (
    <div className="space-y-4">
      {/* Cardholder Name */}
      <div>
        <label 
          htmlFor="cardholderName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Cardholder Name <span className="text-red-600">*</span>
        </label>
        <input
          id="cardholderName"
          type="text"
          name="cardholderName"
          placeholder="John Doe"
          value={formData.cardholderName}
          onChange={handleInputChange}
          onBlur={() => handleBlur('cardholderName')}
          aria-invalid={!!errors.cardholderName}
          aria-describedby={errors.cardholderName ? "cardholderName-error" : undefined}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.cardholderName && touched.cardholderName
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-black focus:border-transparent'
          }`}
        />
        <div role="alert" aria-live="polite" aria-atomic="true">
          {errors.cardholderName && touched.cardholderName && (
            <p className="mt-1 text-sm text-red-600" id="cardholderName-error">
              {errors.cardholderName}
            </p>
          )}
        </div>
      </div>

      {/* Card Number */}
      <div>
        <label
          htmlFor="cardNumber"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Card Number <span className="text-red-600">*</span>
        </label>
        <input
          id='cardNumber'
          type="text"
          name="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={handleInputChange}
          onBlur={() => handleBlur('cardNumber')}
          maxLength={19}
          aria-invalid={!!errors.cardNumber}
          aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.cardNumber && touched.cardNumber
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-black focus:border-transparent'
          }`}
        />
        <div role="alert" aria-live="polite" aria-atomic="true">
          {errors.cardNumber && touched.cardNumber && (
            <p className="mt-1 text-sm text-red-600" id="cardNumber-error">
              {errors.cardNumber}
            </p>
          )}
        </div>
      </div>

      {/* Expiration Date and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="expDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Expiration Date <span className="text-red-600">*</span>
          </label>
          <input
            id="expDate"
            type="text"
            name="expDate"
            value={formData.expDate}
            onChange={handleInputChange}
            onBlur={() => handleBlur('expDate')}
            placeholder="MM/YY"
            maxLength={5}
            aria-invalid={!!errors.expDate}
            aria-describedby={errors.expDate ? "expDate-error" : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.expDate && touched.expDate
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-black focus:border-transparent'
            }`}
          />
          <div role="alert" aria-live="polite" aria-atomic="true">
            {errors.expDate && touched.expDate && (
              <p className="mt-1 text-sm text-red-600" id="expDate-error">
                {errors.expDate}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="cvv"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            CVV <span className="text-red-600">*</span>
          </label>
          <input
            id="cvv"
            type="password"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            onBlur={() => handleBlur('cvv')}
            placeholder="123"
            maxLength={4}
            aria-invalid={!!errors.cvv}
            aria-describedby={errors.cvv ? "cvv-error" : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.cvv && touched.cvv
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-black focus:border-transparent'
            }`}
          />
          <div role="alert" aria-live="polite" aria-atomic="true">
            {errors.cvv && touched.cvv && (
              <p className="mt-1 text-sm text-red-600" id="cvv-error">
                {errors.cvv}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Same as Billing Checkbox */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id="sameAsBilling"
          name="sameAsBilling"
          checked={formData.sameAsBilling}
          onChange={handleInputChange}
          className="w-5 h-5 text-black focus:ring-black border-gray-300 rounded"
        />
        <label htmlFor="sameAsBilling" className="text-sm text-gray-700">
          Same as billing address
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={handleBack}
          type="button"
          className="flex-1 bg-white text-black border-2 border-gray-300 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Back
        </button>
        <button
          onClick={handlePayWithValidation}
          type="button"
          disabled={isLoading}
          className="flex-1 bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
}