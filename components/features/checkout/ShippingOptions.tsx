import { useState } from "react";

interface ShippingOptionsProps {
  selectedShipping: string;
  setSelectedShipping: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export default function ShippingOptions({
  selectedShipping,
  setSelectedShipping,
  selectedDate,
  setSelectedDate
}: ShippingOptionsProps) {

  const [showDatePicker, setShowDatePicker] = useState(false);

  const getFreeShippingDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getExpressShippingDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <label
        className={`flex items-center justify-between p-4 border-2 rounded-xl md:rounded-lg cursor-pointer transition-colors ${
          selectedShipping === 'free' ? 'border-black bg-gray-50 accent-black' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center gap-4">
          <input
            type="radio"
            name="shipping"
            value="free"
            checked={selectedShipping === 'free'}
            onChange={(e) => setSelectedShipping(e.target.value)}
            className="w-5 h-5"
          />
          <div>
            <div className="font-medium mb-0.5">Free</div>
            <div className="text-sm text-gray-500">Regular shipment</div>
          </div>
        </div>
        <span className="text-gray-500">{getFreeShippingDate()}</span>
      </label>

      <label
        className={`flex items-center justify-between p-4 border-2 rounded-xl md:rounded-lg cursor-pointer transition-colors ${
          selectedShipping === 'express' ? 'border-black bg-gray-50 accent-black' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center gap-4">
          <input
            type="radio"
            name="shipping"
            value="express"
            checked={selectedShipping === 'express'}
            onChange={(e) => setSelectedShipping(e.target.value)}
            className="w-5 h-5"
          />
          <div>
            <div className="font-medium mb-0.5">$8.50</div>
            <div className="text-sm text-gray-400">Get your delivery as soon as possible</div>
          </div>
        </div>
        <span className="text-gray-400">{getExpressShippingDate()}</span>
      </label>

      <label
        className={`flex items-center justify-between p-5 border-2 rounded-xl md:rounded-lg cursor-pointer transition-colors ${
          selectedShipping === 'schedule' ? 'border-black bg-gray-50 accent-black' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center gap-4">
          <input
            type="radio"
            name="shipping"
            value="schedule"
            checked={selectedShipping === 'schedule'}
            onChange={(e) => {
              setSelectedShipping(e.target.value);
              setShowDatePicker(true);
            }}
            className="w-5 h-5 text-green focus:ring-offset-cyan-600"
          />
          <div>
            <div className="font-medium mb-0.5">Schedule</div>
            <div className="text-sm text-gray-400">Pick a date when you want to get your delivery</div>
          </div>
        </div>

        <button 
          type='button'
          onClick={(e) => {
            e.preventDefault();
            setShowDatePicker(!showDatePicker);
            setSelectedShipping('schedule')
          }}
          className="text-gray-400 text-sm flex items-center gap-1 hover:text-black"
        >
          {selectedDate || "Select Date"}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

      </label>

      {showDatePicker && selectedShipping === 'schedule' && (
        <div className="mt-4 pt-4 border-t">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      )}
    </>
  );
}