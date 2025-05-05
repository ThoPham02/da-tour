import React from 'react';
import { Customer } from '../../types/tour';

interface CustomerFormProps {
  customer: Customer;
  onCustomerChange: (customer: Customer) => void;
  errors: Record<string, string>;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  onCustomerChange,
  errors,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onCustomerChange({
      ...customer,
      [name]: value,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">Customer Information</h3>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={customer.name}
          onChange={handleChange}
          className={`block w-full px-4 py-2 border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          placeholder="Enter customer name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          className={`block w-full px-4 py-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          placeholder="Enter email address"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          className={`block w-full px-4 py-2 border ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          placeholder="Enter phone number"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>
    </div>
  );
};

export default CustomerForm;