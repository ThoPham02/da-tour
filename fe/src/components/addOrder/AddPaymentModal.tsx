import React, { useState } from 'react';
import { X, CreditCard, Landmark, Wallet } from 'lucide-react';
import { Order, Payment } from '../../types/tour';
import { formatCurrency, getTimeStamp } from '../../utils/utils';
import { apiCreatePayment } from '../../store/services/authService';
import ProofUpload from './ProofUpload';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: Order;
}

const AddPaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  orderData,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<number>(1);
  const [amount, setAmount] = useState<number>(orderData.totalPrice - (orderData.paid ?? 0));
  const [paymentDate, setPaymentDate] = useState<string>("");
  const [proofFile, setProofFile] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<{
    amount?: string;
    paymentDate?: string;
    proofFile?: string;
  }>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: {
      amount?: string;
      paymentDate?: string;
      proofFile?: string;
    } = {};
    
    if (!amount || amount <= 0) {
      newErrors.amount = 'Payment amount must be greater than 0';
    } else if (amount > orderData.totalPrice) {
      newErrors.amount = `Payment cannot exceed remaining amount: ${formatCurrency(orderData.totalPrice)}`;
    }
    
    if (!paymentDate) {
      newErrors.paymentDate = 'Payment date is required';
    }
    
    if (paymentMethod === 1 && !proofFile) {
      newErrors.proofFile = 'Payment proof is required for bank transfers';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      handleSubmitPayment(e);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setProofFile(""); 
  };

  const handleFileChange = (imageUrl: string) => {
    setProofFile(imageUrl);
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
              const resp = await apiCreatePayment({
                orderId: orderData.id,
                customerName: orderData.customer.name,
                amount,
                method: paymentMethod,
                date: getTimeStamp(paymentDate),
                url: proofFile,
              } as Payment);
  
              if (resp?.result?.code === 0) {
                onClose();
              } 
        } catch (error) {
          console.error("Error submitting tour data:", error);
        }
      }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[80%] overflow-y-auto transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-red-50">
          <h2 className="text-xl font-semibold text-gray-800">Add Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 border-b border-gray-200 bg-red-50/30">
          <div className="flex flex-col">
            <div className="text-sm text-gray-500">OrderCode: {orderData.code}</div>
            <div className="font-medium text-gray-900">{orderData.customer.name}</div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">Order Total:</span>
              <span className="font-medium">{formatCurrency(orderData.totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Remaining:</span>
              <span className="font-medium text-red-600">{formatCurrency(orderData.totalPrice - (orderData.paid ?? 0))}</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                    paymentMethod === 1 
                      ? 'border-red-500 bg-red-50 text-red-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                  } transition-colors`}
                  onClick={() => setPaymentMethod(1)}
                >
                  <Landmark size={20} className="mb-1" />
                  <span className="text-xs">Bank Transfer</span>
                </button>
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                    paymentMethod === 2
                      ? 'border-red-500 bg-red-50 text-red-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                  } transition-colors`}
                  onClick={() => setPaymentMethod(2)}
                >
                  <CreditCard size={20} className="mb-1" />
                  <span className="text-xs">Credit Card</span>
                </button>
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                    paymentMethod === 3 
                      ? 'border-red-500 bg-red-50 text-red-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                  } transition-colors`}
                  onClick={() => setPaymentMethod(3)}
                >
                  <Wallet size={20} className="mb-1" />
                  <span className="text-xs">Cash</span>
                </button>
              </div>
            </div>
            
            {/* Payment Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Payment Amount
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className={`block w-full pl-7 pr-12 py-2 sm:text-sm rounded-md ${
                    errors.amount ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
                  }`}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  max={orderData.totalPrice - (orderData.paid ?? 0)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
              )}
            </div>
            
            {/* Payment Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="departureDate"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className={`mt-1 p-2 block w-full border ${errors?.paymentDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-red-500 focus:border-red-500`}
                  required
                />
                {errors.paymentDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.paymentDate}</p>
                )}
              </div>
            </div>
            
            {/* Payment Proof Upload (for Bank Transfer) */}
            {paymentMethod === 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Proof
                </label>
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {/* {proofFile ? (
                    <div className="py-2">
                      <div className="flex items-center justify-center text-red-600">
                        <Upload size={20} className="mr-2" />
                        <span className="text-sm font-medium">{proofFile.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setProofFile(null)}
                        className="mt-2 text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="py-4">
                      <Upload className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">
                        Drag and drop your file here, or
                        <label htmlFor="file-upload" className="ml-1 text-red-600 hover:text-red-500 cursor-pointer">
                          browse
                        </label>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, PDF up to 10MB
                      </p>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                      />
                    </div>
                  )} */}

                    <ProofUpload onImageUpload={handleFileChange} currentImage={proofFile} />

                </div>
                {errors.proofFile && (
                  <p className="mt-1 text-sm text-red-600">{errors.proofFile}</p>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Add Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentModal;