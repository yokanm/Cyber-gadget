import ShippingOptions from "./ShippingOptions";



interface ShippingStepProps {
  selectedShipping: string;
  setSelectedShipping: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  handleBack: () => void;
  handleNext: () => void;
}

export default function ShippingStep({
  selectedShipping,
  setSelectedShipping,
  selectedDate,
  setSelectedDate,
  handleBack,
  handleNext
}: ShippingStepProps) {
  return (

    <div>
      <h2 className="text-xl font-semibold mb-6">Shipment Method</h2>
      <div className="space-y-4 mb-8 lg:mb-40">
        <ShippingOptions
          selectedShipping={selectedShipping}
          setSelectedShipping={setSelectedShipping}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

        <div className="flex md:justify-end gap-4 pt-6">
          <button
            onClick={handleBack}
            className="px-12 py-3 border-2 border-gray-300 rounded-lg bg-white text-black font-medium hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-12 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

    </div>
  );
}