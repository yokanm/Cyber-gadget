import { AddressForm } from "@/type/type";

interface ValidationErrors {
  name?: string;
  address?: string;
  phone?: string;
}

interface AddressFormProps {
  addressForm: AddressForm;
  setAddressForm: (form: AddressForm | ((prev: AddressForm) => AddressForm)) => void;
  editingAddress: string | null;
  saveAddress: () => void;
  cancelAddressForm: () => void;
  errors: ValidationErrors;
}

export default function AddressFormComponent({
  addressForm,
  setAddressForm,
  editingAddress,
  saveAddress,
  cancelAddressForm,
  errors
}: AddressFormProps) {
    
  const handleAddressFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">
        {editingAddress ? 'Edit Address' : 'Add New Address'}
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Label
          </label>
          <div className="flex gap-3">
            {(['HOME', 'OFFICE', 'OTHER'] as const).map(label => (
              <button
                key={label}
                type="button"
                onClick={() => setAddressForm(prev => ({ ...prev, label }))}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  addressForm.label === label
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="address-name" className="block text-sm font-medium text-gray-700 mb-2">
            Address Name <span className="text-red-500">*</span>
          </label>
          <input
            id="address-name"
            type="text"
            name="name"
            placeholder="e.g., 2118 Thornridge"
            value={addressForm.name}
            onChange={handleAddressFormChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.name 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-black focus:border-transparent'
            }`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="full-address" className="block text-sm font-medium text-gray-700 mb-2">
            Full Address <span className="text-red-500">*</span>
          </label>
          <input
            id="full-address"
            type="text"
            name="address"
            placeholder="e.g., 2118 Thornridge Cir. Syracuse, Connecticut 35624"
            value={addressForm.address}
            onChange={handleAddressFormChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.address 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-black focus:border-transparent'
            }`}
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
          />
          {errors.address && (
            <p id="address-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="e.g., (209) 555-0104"
            value={addressForm.phone}
            onChange={handleAddressFormChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.phone 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-black focus:border-transparent'
            }`}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.phone}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            onClick={cancelAddressForm}
            className="px-12 py-3 border-2 border-gray-300 rounded-lg bg-white text-black font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={saveAddress}
            className="px-12 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editingAddress ? 'Update Address' : 'Add Address'}
          </button>
        </div>
      </div>
    </>
  );
}