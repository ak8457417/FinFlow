import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function TaxForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    income: 0,
    rentPaid: 0,
    investment80c: 0,
    healthInsurance: 0,
    hraClaimed: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-[#101936] p-6 rounded-lg shadow-lg">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Annual Income (₹)
            </label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Annual Rent Paid (₹)
            </label>
            <input
              type="number"
              name="rentPaid"
              value={formData.rentPaid}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              80C Investments (₹)
            </label>
            <input
              type="number"
              name="investment80c"
              value={formData.investment80c}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Health Insurance Premium (₹)
            </label>
            <input
              type="number"
              name="healthInsurance"
              value={formData.healthInsurance}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              min="0"
            />
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hraClaimed"
                checked={formData.hraClaimed}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Already claiming HRA
              </span>
            </label>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <h3 className="text-sm font-semibold mb-2">Tax Slabs (FY 2023-24)</h3>
            <ul className="text-sm space-y-1">
              <li>₹0-3L: 0%</li>
              <li>₹3-6L: 5%</li>
              <li>₹6-9L: 10%</li>
              <li>₹9-12L: 15%</li>
              <li>Above ₹12L: 30%</li>
            </ul>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Calculator className="w-5 h-5 mr-2" />
        Optimize My Taxes
      </button>
    </form>
  );
}