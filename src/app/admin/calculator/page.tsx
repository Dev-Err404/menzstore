'use client';

import { useState } from 'react';

export default function CommissionCalculator() {
  const [price, setPrice] = useState<number>(1500); // Updated default to a typical INR price
  const [commission, setCommission] = useState<number>(5); 
  const [clicks, setClicks] = useState<number>(1000);
  const [conversion, setConversion] = useState<number>(2); 

  // Calculations
  const earningsPerSale = price * (commission / 100);
  const estimatedSales = Math.floor(clicks * (conversion / 100));
  const estimatedMonthlyRevenue = estimatedSales * earningsPerSale;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-10">
          <h1 className="font-heading text-4xl font-black uppercase tracking-tight text-primary">
            Commission Calculator
          </h1>
          <p className="text-gray-500 mt-2">
            Estimate your affiliate earnings based on price, traffic, and conversion rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Price (₹)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all bg-gray-50 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Affiliate Commission (%)</label>
              <div className="relative">
                <input
                  type="number"
                  value={commission}
                  onChange={(e) => setCommission(Number(e.target.value))}
                  className="w-full pl-4 pr-8 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all bg-gray-50 font-medium"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-2">Estimated Monthly Clicks</label>
              <input
                type="number"
                value={clicks}
                onChange={(e) => setClicks(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all bg-gray-50 font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Conversion Rate (%)</label>
              <div className="relative">
                <input
                  type="number"
                  value={conversion}
                  step="0.1"
                  onChange={(e) => setConversion(Number(e.target.value))}
                  className="w-full pl-4 pr-8 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all bg-gray-50 font-medium"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Standard fashion conversion is around 1% - 3%.</p>
            </div>

          </div>

          {/* Right Column: Results */}
          <div className="flex flex-col gap-6">
            
            {/* Single Sale Card */}
            <div className="bg-black text-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
                Earnings Per Sale
              </h3>
              <div className="text-5xl font-black tracking-tight">
                ₹{earningsPerSale.toFixed(2)}
              </div>
            </div>

            {/* Monthly Projection Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex-grow flex flex-col justify-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
                Monthly Projection
              </h3>
              
              <div className="flex justify-between items-end border-b border-gray-100 pb-4 mb-4">
                <span className="font-medium text-gray-600">Estimated Sales</span>
                <span className="text-2xl font-bold text-black">{estimatedSales}</span>
              </div>

              <div className="flex justify-between items-end">
                <span className="font-medium text-gray-600">Estimated Revenue</span>
                <span className="text-4xl font-black text-green-500">
                  ₹{estimatedMonthlyRevenue.toFixed(2)}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}