import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';

const CheckoutComponent = ({
  ticketQuantity = 2,
  originalPrice = 1000,
  discountedPrice = 900,
  discountAmount = 100,
  discountPercentage = 10,
  serviceFee = 300,
  conversionRate = 125,
  conversionCurrency = "EUR",
  originalCurrency = "EUR",
  total = 2650,
  showCouponField = true,
  onQuantityChange = () => {},
  onCouponApply = () => {}
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);

  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl border border-gray-200 p-6 font-sans">
      {/* Ticket Quantity Selector */}
      <div className="relative mb-6">
        <button 
          onClick={() => setIsQuantityOpen(!isQuantityOpen)}
          className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-white hover:border-gray-400 transition-colors"
        >
          <span className="text-lg font-medium text-gray-900">
            {ticketQuantity} Ticket{ticketQuantity !== 1 ? 's' : ''}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isQuantityOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isQuantityOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {quantities.map((qty) => (
              <button
                key={qty}
                onClick={() => {
                  onQuantityChange(qty);
                  setIsQuantityOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                {qty} Ticket{qty !== 1 ? 's' : ''}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-6">
        {/* Original/Discounted Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {discountAmount > 0 ? (
              <>
                <span className="text-gray-500 line-through">€{originalPrice}</span>
                <span className="text-lg font-medium text-gray-900">€{discountedPrice}</span>
                <span className="text-sm text-gray-500">x {ticketQuantity}</span>
              </>
            ) : (
              <>
                <span className="text-lg font-medium text-gray-900">€{originalPrice}</span>
                <span className="text-sm text-gray-500">x {ticketQuantity}</span>
              </>
            )}
          </div>
        </div>

        {/* Discount */}
        {discountAmount > 0 && (
          <div className="flex items-center justify-end">
            <span className="text-green-600 font-medium">
              €{discountAmount} ({discountPercentage}% off)
            </span>
          </div>
        )}

        {/* Service Fee */}
        <div className="flex items-center justify-between">
          <span className="text-gray-900">Service Fee + Tax</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-900">€{serviceFee}</span>
            <span className="text-sm text-gray-500">x 1</span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="flex items-center justify-between">
          <span className="text-gray-900">Conversion Rate</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-900">€{conversionRate}</span>
            <span className="text-sm text-gray-500">x 1</span>
          </div>
        </div>

        {/* Conversion Notice */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
          <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            This is an approximate conversion. These tickets are listed in {originalCurrency}. 
            You will be charged €{conversionRate}.
          </p>
        </div>
      </div>

      {/* Coupon Code Field */}
      {showCouponField && (
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => onCouponApply(couponCode)}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Total */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-gray-900">Total</span>
          <span className="text-3xl font-bold text-gray-900">€{total}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;