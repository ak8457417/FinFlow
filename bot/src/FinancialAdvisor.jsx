// import React, { useState, useEffect } from 'react';
// import { ChevronRightIcon, DocumentTextIcon, SpeakerWaveIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
//
// const FinancialAdvisor = () => {
//   const [step, setStep] = useState(0);
//   const [planData, setPlanData] = useState({
//     name: '',
//     income: 0,
//     expenses: 0,
//     goalDescription: '',
//     goalAmount: 0,
//     timeframe: 0,
//     financialPlan: '',
//     monthlySavingAmount: 0,
//   });
//   const [messages, setMessages] = useState([]);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//
//   const addMessage = (content, type = 'bot') => {
//     setMessages(prev => [...prev, { type, content }]);
//   };
//
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPlanData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
//
//   const generateFinancialPlan = () => {
//     const inflationRate = 0.03;
//     const adjustedGoal = planData.goalAmount * Math.pow(1 + inflationRate, planData.timeframe);
//     const monthlySavings = adjustedGoal / (planData.timeframe * 12);
//
//     const plan = `
//       Financial Plan for ${planData.name}
//
//       Current Financial Status:
//       - Monthly Income: ₹${planData.income.toLocaleString()}
//       - Monthly Expenses: ₹${planData.expenses.toLocaleString()}
//
//       Goal Details:
//       - Objective: ${planData.goalDescription}
//       - Target Amount: ₹${planData.goalAmount.toLocaleString()}
//       - Inflation-adjusted Target: ₹${adjustedGoal.toLocaleString()}
//       - Timeframe: ${planData.timeframe} years
//
//       Required Monthly Savings: ₹${monthlySavings.toLocaleString()}
//
//       Recommendations:
//       1. Start saving ${((monthlySavings/planData.income) * 100).toFixed(1)}% of your monthly income
//       2. Consider diversifying investments between:
//          - Mutual Funds: 40%
//          - Fixed Deposits: 30%
//          - Stocks: 20%
//          - Emergency Fund: 10%
//       3. Review and rebalance your portfolio every 6 months
//       4. Set up automatic transfers for consistent savings
//     `;
//
//     setPlanData(prev => ({
//       ...prev,
//       financialPlan: plan,
//       monthlySavingAmount: monthlySavings
//     }));
//
//     return plan;
//   };
//
//   const handleNext = () => {
//     if (step === 6) {
//       const plan = generateFinancialPlan();
//       addMessage(plan);
//     }
//     setStep(prev => prev + 1);
//   };
//
//   const textToSpeech = (text) => {
//     if ('speechSynthesis' in window) {
//       setIsSpeaking(true);
//       const utterance = new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(utterance);
//       utterance.onend = () => setIsSpeaking(false);
//     }
//   };
//
//   const StepContent = () => {
//     switch (step) {
//       case 0:
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               <span className="text-gray-200">Name</span>
//               <input
//                 type="text"
//                 name="name"
//                 value={planData.name}
//                 onChange={handleInputChange}
//                 className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
//                 placeholder="Enter your name"
//               />
//             </label>
//           </div>
//         );
//       case 1:
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               <span className="text-gray-200">Monthly Income (₹)</span>
//               <input
//                 type="number"
//                 name="income"
//                 value={planData.income}
//                 onChange={handleInputChange}
//                 className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
//                 placeholder="Enter your monthly income"
//               />
//             </label>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               <span className="text-gray-200">Monthly Expenses (₹)</span>
//               <input
//                 type="number"
//                 name="expenses"
//                 value={planData.expenses}
//                 onChange={handleInputChange}
//                 className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
//                 placeholder="Enter your monthly expenses"
//               />
//             </label>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               <span className="text-gray-200">Financial Goal</span>
//               <input
//                 type="text"
//                 name="goalDescription"
//                 value={planData.goalDescription}
//                 onChange={handleInputChange}
//                 className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
//                 placeholder="e.g., Buy a house, Retirement"
//               />
//             </label>
//           </div>
//         );
//       case 4:
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               <span className="text-gray-200">Goal Amount (₹)</span>
//               <input
//                 type="number"
//                 name="goalAmount"
//                 value={planData.goalAmount}
//                 onChange={handleInputChange}
//                 className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
//                 placeholder="Enter target amount"
//               />
//             </label>
//           </div>
//         );
//       case 5:
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               <span className="text-gray-200">Timeframe (years)</span>
//               <input
//                 type="number"
//                 name="timeframe"
//                 value={planData.timeframe}
//                 onChange={handleInputChange}
//                 className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
//                 placeholder="Enter number of years"
//                 min="1"
//                 max="50"
//               />
//             </label>
//           </div>
//         );
//       case 6:
//         return (
//           <div className="space-y-4">
//             <div className="bg-gray-700 p-6 rounded-lg">
//               <pre className="whitespace-pre-wrap text-gray-200 font-mono text-sm">
//                 {planData.financialPlan}
//               </pre>
//             </div>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => textToSpeech(planData.financialPlan)}
//                 className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 disabled={isSpeaking}
//               >
//                 <SpeakerWaveIcon className="h-5 w-5 mr-2" />
//                 {isSpeaking ? 'Speaking...' : 'Read Aloud'}
//               </button>
//               <button
//                 onClick={() => setStep(0)}
//                 className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//               >
//                 <ArrowPathIcon className="h-5 w-5 mr-2" />
//                 Start Over
//               </button>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };
//
//   return (
//     <div className="min-h-screen bg-black text-white">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-2xl mx-auto">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-blue-500 mb-2">AI Financial Advisor</h1>
//             <div className="h-1 w-20 bg-blue-500"></div>
//           </div>
//
//           <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
//             <div className="mb-6">
//               <div className="flex items-center space-x-2 text-sm text-gray-400">
//                 {['Profile', 'Income', 'Expenses', 'Goal', 'Amount', 'Time', 'Plan'].map((s, i) => (
//                   <React.Fragment key={i}>
//                     <span className={step >= i ? 'text-blue-500' : ''}>
//                       {s}
//                     </span>
//                     {i < 6 && <ChevronRightIcon className="h-4 w-4" />}
//                   </React.Fragment>
//                 ))}
//               </div>
//             </div>
//
//             <StepContent />
//
//             {step < 6 && (
//               <div className="mt-6">
//                 <button
//                   onClick={handleNext}
//                   className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                   disabled={!planData[Object.keys(planData)[step]]}
//                 >
//                   Continue
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default FinancialAdvisor;