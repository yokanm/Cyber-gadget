import { Address } from '@/type/type';
import { Pencil, PlusCircleIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
interface AddressListProps {
  addresses: Address[];
  selectedAddress: string;
  setSelectedAddress: (id: string) => void;
  openEditAddressForm: (addr: Address ) => void;
  deleteAddress: (id: string) => void;
  openAddAddressForm: () => void;
  isLoading: boolean;
  handleNext: () => void;
 
}

export default function AddressList({
  addresses,
  selectedAddress,
  setSelectedAddress,
  openEditAddressForm,
  deleteAddress,
  openAddAddressForm,
  isLoading,
  handleNext,
}: AddressListProps) {
    const router = useRouter()
  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Select Address</h2>
      <div className="space-y-6 md:space-y-8">
        {addresses.map(addr => (
          <Fragment key={addr.id}>
            <label
              className={`flex items-start gap-2 p-6 border-2 rounded-xl cursor-pointer transition-colors bg-[#F6F6F6] accent-black ${
                selectedAddress === addr.id
                  ? 'border-black'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="address"
                value={addr.id}
                checked={selectedAddress === addr.id}
                onChange={(e) => setSelectedAddress(e.target.value)}
                className="mt-1 w-5 h-5 text-black focus:ring-black"
              />
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-normal">{addr.name}</span>
                  <span className="px-2 py-1 bg-black text-white text-xs rounded">
                    {addr.label}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{addr.address}</div>
                <div className="text-sm text-gray-600 mt-1">{addr.phone}</div>
              </div>
              <div className="flex gap-2 mt-12 md:mt-6" role="group" aria-label="Address actions">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    openEditAddressForm(addr);
                  }}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  aria-label={`Edit ${addr.name} address`}
                >
                  <Pencil className="w-4 h-4" aria-hidden="true" />
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (confirm('Are you sure you want to delete this address?')) {
                      deleteAddress(addr.id);
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Delete address"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </label>
          </Fragment>
        ))}

       <div className="relative w-full my-6 flex items-center justify-center">
          {/* Divider line */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-gray-400"></div>
          </div>

          {/* Button centered over divider */}
          <button
            onClick={openAddAddressForm}
            className="relative z-10 bg-white px-3 flex items-center gap-2 text-sm font-medium"
          >
            <PlusCircleIcon className="w-8 h-8 bg-white text-white" fill='black' />
            Add New Address
          </button>
        </div>


        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            onClick={() => router.back()}
            className="px-12 py-4 border-2 border-gray-300 rounded-lg bg-white text-black font-medium hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={isLoading}
            className="px-12 py-4 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Next'}
          </button>
        </div>
      </div>
    </>
  );
}
