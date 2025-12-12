interface CreditCardDisplayProps {
  cardholderName: string;
}

export default function CreditCardDisplay({ cardholderName }: CreditCardDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
      <div className="flex justify-between items-start mb-12">
        <div className="flex gap-2">
          <div className="w-10 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded"></div>
          <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
        </div>
      </div>
      <div className="font-mono text-2xl tracking-widest mb-8">
        4085 9536 8475 9530
      </div>
      <div className="flex justify-between items-end">
        <div>
          <div className="text-xs text-gray-300 mb-1">Cardholder</div>
          <div className="text-sm font-medium">
            {cardholderName || 'Your Name'}
          </div>
        </div>
        <div className="flex gap-1">
          <div className="w-10 h-10 rounded-full bg-red-500 opacity-90"></div>
          <div className="w-10 h-10 rounded-full bg-orange-400 opacity-90 -ml-4"></div>
        </div>
      </div>
    </div>
  );
}