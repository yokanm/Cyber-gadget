import { Fragment } from "react";
import { MapPin, Truck, CreditCard } from "lucide-react";

interface StepperHeaderProps {
  currentStep: number;
}

export default function StepperHeader({ currentStep }: StepperHeaderProps) {
  const steps = [
    { number: 1, label: 'Address', icon: MapPin },
    { number: 2, label: 'Shipping', icon: Truck },
    { number: 3, label: 'Payment', icon: CreditCard }
  ];

  // For mobile: show current step and next step only (max 2 steps)
  const mobileSteps = steps.filter(step => 
    step.number === currentStep || step.number === currentStep + 1
  ).slice(0, 2);

  return (
    <>
      {/* Desktop view - show all 3 steps */}
      <div className="hidden md:flex items-center w-full max-w-4xl mx-auto lg:pb-9 xl:min-w-6xl">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <Fragment key={step.number}>
              <div className="w-full flex items-center ml-6">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                  currentStep === step.number 
                    ? 'bg-black' 
                    : currentStep > step.number 
                    ? 'bg-gray-400' 
                    : 'bg-gray-300'
                }`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="ml-3">
                  <div className="text-xs text-gray-500">Step {step.number}</div>
                  <div className={`text-sm font-medium ${
                    currentStep === step.number ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </div>
                </div>
              </div>
              {/* {index < steps.length - 1 && (
                <div className={`w-24 h-px mx-4 transition-colors ${
                  currentStep > step.number ? 'bg-gray-400' : 'bg-gray-300'
                }`}></div>
              )} */}
            </Fragment>
          );
        })}
      </div>

      {/* Mobile view - show only 2 steps (current + next) */}
      <div className="flex md:hidden items-center justify-between mb-8 px-4">
        {mobileSteps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          
          return (
            <Fragment key={step.number}>
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                  isActive 
                    ? 'bg-black' 
                    : 'bg-gray-300'
                }`}>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <div className="ml-2">
                  <div className="text-sm text-gray-400">Step {step.number}</div>
                  <div className={`text-lg font-medium ${
                    isActive ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </div>
                </div>
              </div>
              {/* {index < mobileSteps.length - 1 && (
                <div className="w-12 h-px mx-3 bg-gray-300"></div>
              )} */}
            </Fragment>
          );
        })}
      </div>
    </>
  );
}