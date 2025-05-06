import React from 'react';

interface OrderSummaryProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  price: number;
  totalPrice: number;
  errors: Record<string, string>;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  quantity, 
  onQuantityChange, 
  price, 
  totalPrice,
  errors
}) => {
  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-medium text-gray-800">Order Summary</h3>
      
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Travelers
        </label>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
            className="px-3 py-2 bg-gray-200 text-gray-600 rounded-l-md border border-gray-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
            className={`block w-16 text-center py-2 border-t border-b ${
              errors.quantity ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          />
          <button
            type="button"
            onClick={() => onQuantityChange(quantity + 1)}
            className="px-3 py-2 bg-gray-200 text-gray-600 rounded-r-md border border-gray-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            +
          </button>
        </div>
        {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Price per person:</span>
          <span>${price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Quantity:</span>
          <span>x {quantity}</span>
        </div>
        <div className="flex justify-between font-medium text-lg text-gray-900 mt-3">
          <span>Total amount:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;