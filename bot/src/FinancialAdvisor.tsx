// import React, { useState } from 'react';
// import { SpeakerWaveIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
// import { StepIndicator } from './components/StepIndicator';
// import { Button } from './components/Button';
// import { Input } from './components/Input';
// import { calculateFinancialPlan } from './utils/financial';
// import type { FinancialPlanData, Message, Step } from './types/financial';
//
// const FinancialAdvisor: React.FC = () => {
//   const [step, setStep] = useState<Step>(0);
//   const [planData, setPlanData] = useState<FinancialPlanData>({
//     name: '',
//     income: 0,
//     expenses: 0,
//     goalDescription: '',
//     goalAmount: 0,
//     timeframe: 0,
//     financialPlan: '',
//     monthlySavingAmount: 0,
//   });
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//
//   const addMessage = (content: string, type: 'bot' | 'user' = 'bot') => {
//     setMessages(prev => [...prev, { type, content }]);
//   };
//
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPlanData(prev => ({
//       ...prev,
//       [name]: name === 'name' ? value : Number(value),
//     }));
//   };
//
//   const textToSpeech = (text: string) => {
//     if ('speechSynthesis' in window) {
//       setIsSpeaking(true);
//       const utterance = new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(utterance);
//       utterance.onend = () => setIsSpeaking(false);
//     }
//   };
//
//   const handleNext = () => {
//     if (step === 6) {
//       const { plan, monthlySavings } = calculateFinancialPlan(
//         planData.name,
//         planData.income,
//         planData.expenses,
//         planData.goalDescription,
//         planData.goalAmount,
//         planData.timeframe
//       );
//       setPlanData(prev => ({
//         ...prev,
//         financialPlan: plan,
//         monthlySavingAmount: monthlySavings,
//       }));
//       addMessage(plan);
//     }
//     setStep(prev => (prev + 1) as Step);
//   };
//
//   const renderStepContent = () => {
//     switch (step) {
//       case 0:
//         return (
//           <Input
//             label="Name"
//             name="name"
//             value={planData.name}
//             onChange={handleInputChange}
//             placeholder="Enter your name"
//           />
//         );
//       case 1:
//         return (
//           <Input
//             label="Monthly Income (₹)"
//             type="number"
//             name="income"
//             value={planData.income || ''}
//             onChange={handleInputChange}
//             placeholder="Enter your monthly income"
//           />
//         );
//       case 2:
//         return (
//           <Input
//             label="Monthly Expenses (₹)"
//             type="number"
//             name="expenses"
//             value={planData.expenses || ''}
//             onChange={handleInputChange}
//             placeholder="Enter your monthly expenses"
//           />
//         );
//       case 3:
//         return (
//           <Input
//             label="Financial Goal"
//             name="goalDescription"
//             value={planData.goalDescription}
//             onChange={handleInputChange}
//             placeholder="e.g., Buy a house, Retirement"
//           />
//         );
//       case 4:
//         return (
//           <Input
//             label="Goal Amount (₹)"
//             type="number"
//             name="goalAmount"
//             value={planData.goalAmount || ''}
//             onChange={handleInputChange}
//             placeholder="Enter target amount"
//           />
//         );
//       case 5:
//         return (
//           <Input
//             label="Timeframe (years)"
//             type="number"
//             name="timeframe"
//             value={planData.timeframe || ''}
//             onChange={handleInputChange}
//             placeholder="Enter number of years"
//             min={1}
//             max={50}
//           />
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
//               <Button
//                 onClick={() => textToSpeech(planData.financialPlan)}
//                 disabled={isSpeaking}
//                 icon={<SpeakerWaveIcon className="h-5 w-5" />}
//               >
//                 {isSpeaking ? 'Speaking...' : 'Read Aloud'}
//               </Button>
//               <Button
//                 onClick={() => setStep(0)}
//                 variant="success"
//                 icon={<ArrowPathIcon className="h-5 w-5" />}
//               >
//                 Start Over
//               </Button>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };
//
//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-2xl mx-auto">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-white mb-2">AI Financial Advisor</h1>
//             <div className="h-1 w-20 bg-blue-500"></div>
//           </div>
//
//           <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
//             <div className="mb-6">
//               <StepIndicator currentStep={step} />
//             </div>
//
//             {renderStepContent()}
//
//             {step < 6 && (
//               <div className="mt-6">
//                 <Button
//                   onClick={handleNext}
//                   className="w-full"
//                   disabled={!planData[Object.keys(planData)[step] as keyof FinancialPlanData]}
//                 >
//                   Continue
//                 </Button>
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