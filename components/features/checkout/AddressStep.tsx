import { Address, AddressForm } from '@/type/type';
import AddressList from './AddressList';
import AddressFormComponent from './AddressFormComponent';
import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';


interface AddressStepProps {
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  selectedAddress: string;
  setSelectedAddress: (id: string) => void;
  isLoading: boolean;
  handleNext: () => void;
}

interface ValidationErrors {
  name?: string;
  address?: string;
  phone?: string;
}

export default function AddressStep({
  addresses,
  setAddresses,
  selectedAddress,
  setSelectedAddress,
  isLoading,
  handleNext,
}: AddressStepProps) {
  const { error: showError, success: showSuccess } = useToast();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [addressForm, setAddressForm] = useState<AddressForm>({
    name: '',
    label: 'HOME',
    address: '',
    phone: ''
  });

  const deleteAddress = (id: string) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    setAddresses(updatedAddresses);

    if (selectedAddress === id) {
      setSelectedAddress(updatedAddresses[0]?.id || '');
    }
    
    showSuccess('Address deleted successfully');
  };

  const openAddAddressForm = () => {
    setEditingAddress(null);
    setAddressForm({ name: '', label: 'HOME', address: '', phone: '' });
    setErrors({});
    setShowAddressForm(true);
  };

  const openEditAddressForm = (addr: Address) => {
    setEditingAddress(addr.id);
    setAddressForm({
      name: addr.name,
      label: addr.label,
      address: addr.address,
      phone: addr.phone
    });
    setErrors({});
    setShowAddressForm(true);
  };

  const validateAddress = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Validate name
    if (!addressForm.name.trim()) {
      newErrors.name = 'Address name is required';
      isValid = false;
    } else if (addressForm.name.trim().length < 3) {
      newErrors.name = 'Address name must be at least 3 characters';
      isValid = false;
    }

    // Validate address
    if (!addressForm.address.trim()) {
      newErrors.address = 'Full address is required';
      isValid = false;
    } else if (addressForm.address.trim().length < 10) {
      newErrors.address = 'Please enter a complete address';
      isValid = false;
    }

    // Validate phone
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    const cleanPhone = addressForm.phone.replace(/\D/g, '');
    
    if (!addressForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(addressForm.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
      isValid = false;
    }

    setErrors(newErrors);

    // Show toast for first error
    if (!isValid) {
      const firstError = Object.values(newErrors)[0];
      showError(firstError);
    }

    return isValid;
  };

  const saveAddress = () => {
    if (!validateAddress()) return;

    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress 
          ? { ...addr, ...addressForm }
          : addr
      ));
      showSuccess('Address updated successfully');
    } else {
      // Add new address
      const newAddress = {
        id: 'addr_' + Date.now(),
        ...addressForm
      };
      setAddresses([...addresses, newAddress]);
      setSelectedAddress(newAddress.id);
      showSuccess('Address added successfully');
    }

    setShowAddressForm(false);
    setAddressForm({ name: '', label: 'HOME', address: '', phone: '' });
    setEditingAddress(null);
    setErrors({});
  };

  const cancelAddressForm = () => {
    setShowAddressForm(false);
    setAddressForm({ name: '', label: 'HOME', address: '', phone: '' });
    setEditingAddress(null);
    setErrors({});
  };
  
  return (
    <div>
      {!showAddressForm ? (
        <AddressList
          addresses={addresses}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          openEditAddressForm={openEditAddressForm}
          deleteAddress={deleteAddress}
          openAddAddressForm={openAddAddressForm}
          isLoading={isLoading}
          handleNext={handleNext}
        />
      ) : (
        <AddressFormComponent
          addressForm={addressForm}
          setAddressForm={setAddressForm}
          editingAddress={editingAddress}
          saveAddress={saveAddress}
          cancelAddressForm={cancelAddressForm}
          errors={errors}
        />
      )}
    </div>
  );
}