// import React, { useState, useRef, useEffect } from 'react';
// import { SpeakerWaveIcon, StopIcon, DocumentArrowDownIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
// import { jsPDF } from 'jspdf';
//
// const STEPS = {
//   NAME: 0,
//   INCOME: 1,
//   EXPENSES: 2,
//   GOAL: 3,
//   AMOUNT: 4,
//   TIMEFRAME: 5,
//   PLAN: 6,
// };
//
// const FinancialAdvisor = () => {
//   const [step, setStep] = useState(STEPS.NAME);
//   const [formData, setFormData] = useState({
//     name: '',
//     income: '',
//     expenses: '',
//     goalDescription: '',
//     goalAmount: '',
//     timeframe: '',
//   });
//   const [messages, setMessages] = useState([]);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [plan, setPlan] = useState(null);
//   const chatRef = useRef(null);
//
//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages]);
//
//   const addMessage = (content, type = 'bot') => {
//     setMessages(prev => [...prev, { type, content, timestamp: new Date() }]);
//   };
//
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const value = formData[Object.keys(formData)[step]];
//     addMessage(value, 'user');
//
//     if (step === STEPS.TIMEFRAME) {
//       generatePlan();
//     } else {
//       setStep(prev => prev + 1);
//       const nextPrompt = getNextPrompt(step + 1);
//       addMessage(nextPrompt);
//     }
//   };
//
// //   const generatePlan = () => {
// //     const inflationRate = 0.03;
// //     const adjustedGoal = formData.goalAmount * Math.pow(1 + inflationRate, formData.timeframe);
// //     const monthlySavings = adjustedGoal / (formData.timeframe * 12);
// //
// //     const generatedPlan = `
// // Financial Plan for ${formData.name}
// //
// // Current Financial Status:
// // • Monthly Income: ₹${parseFloat(formData.income).toLocaleString()}
// // • Monthly Expenses: ₹${parseFloat(formData.expenses).toLocaleString()}
// // • Available for Savings: ₹${(formData.income - formData.expenses).toLocaleString()}
// //
// // Goal Details:
// // • Objective: ${formData.goalDescription}
// // • Target Amount: ₹${parseFloat(formData.goalAmount).toLocaleString()}
// // • Inflation-adjusted Target: ₹${adjustedGoal.toLocaleString()}
// // • Timeframe: ${formData.timeframe} years
// //
// // Required Monthly Savings: ₹${monthlySavings.toLocaleString()}
// //
// // Investment Recommendations:
// // 1. Mutual Funds (40%): ₹${(monthlySavings * 0.4).toLocaleString()}/month
// // 2. Fixed Deposits (30%): ₹${(monthlySavings * 0.3).toLocaleString()}/month
// // 3. Stocks (20%): ₹${(monthlySavings * 0.2).toLocaleString()}/month
// // 4. Emergency Fund (10%): ₹${(monthlySavings * 0.1).toLocaleString()}/month
// //
// // Risk Management:
// // • Maintain emergency fund of 6 months expenses
// // • Consider term life insurance
// // • Review and rebalance portfolio every 6 months
// //     `;
// //
// //     setPlan(generatedPlan);
// //     addMessage(generatedPlan);
// //     setStep(STEPS.PLAN);
// //   };
//
//   const generatePlan = async () => {
//     const inflationRate = 0.03;
//     const adjustedGoal = formData.goalAmount * Math.pow(1 + inflationRate, formData.timeframe);
//     const monthlySavings = adjustedGoal / (formData.timeframe * 12);
//
//     const generatedPlan = `
//   ## Financial Plan for ${formData.name}
//
//   **Current Financial Status:**
//   - Monthly Income: ₹${parseFloat(formData.income).toLocaleString()}
//   - Monthly Expenses: ₹${parseFloat(formData.expenses).toLocaleString()}
//   - Available for Savings: ₹${(formData.income - formData.expenses).toLocaleString()}
//
//   **Goal Details:**
//   - Objective: ${formData.goalDescription}
//   - Target Amount: ₹${parseFloat(formData.goalAmount).toLocaleString()}
//   - Inflation-adjusted Target: ₹${adjustedGoal.toLocaleString()}
//   - Timeframe: ${formData.timeframe} years
//
//   **Required Monthly Savings:** ₹${monthlySavings.toLocaleString()}
//
//   **Investment Recommendations:**
//   1. Mutual Funds (40%): ₹${(monthlySavings * 0.4).toLocaleString()}/month
//   2. Fixed Deposits (30%): ₹${(monthlySavings * 0.3).toLocaleString()}/month
//   3. Stocks (20%): ₹${(monthlySavings * 0.2).toLocaleString()}/month
//   4. Emergency Fund (10%): ₹${(monthlySavings * 0.1).toLocaleString()}/month
//
//   **Risk Management:**
//   - Maintain an emergency fund of 6 months' expenses
//   - Consider term life insurance
//   - Review and rebalance portfolio every 6 months
//   `;
//
//     setPlan(generatedPlan);
//     addMessage(generatedPlan);
//     setStep(STEPS.PLAN);
//
//     // Send data to backend
//     try {
//       const response = await fetch("http://localhost:5000/bot/api/generate-plan", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           income: formData.income,
//           expenses: formData.expenses,
//           goalDescription: formData.goalDescription,
//           goalAmount: formData.goalAmount,
//           timeframe: formData.timeframe,
//           financialPlan: generatedPlan,
//         }),
//       });
//
//       if (response.ok) {
//         console.log("Financial plan saved successfully!");
//       } else {
//         console.error("Failed to save financial plan");
//       }
//     } catch (error) {
//       console.error("Error sending data to backend:", error);
//     }
//   };
//
//   const getNextPrompt = (currentStep) => {
//     switch (currentStep) {
//       case STEPS.INCOME:
//         return "What is your monthly income? (in ₹)";
//       case STEPS.EXPENSES:
//         return "What are your monthly expenses? (in ₹)";
//       case STEPS.GOAL:
//         return "What is your financial goal? (e.g., Buy a house, Retirement)";
//       case STEPS.AMOUNT:
//         return "How much money do you need for this goal? (in ₹)";
//       case STEPS.TIMEFRAME:
//         return "In how many years do you want to achieve this goal?";
//       default:
//         return "Hello! What's your name?";
//     }
//   };
//
//   const textToSpeech = (text) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(text);
//       if (isSpeaking) {
//         window.speechSynthesis.cancel();
//         setIsSpeaking(false);
//       } else {
//         window.speechSynthesis.speak(utterance);
//         setIsSpeaking(true);
//         utterance.onend = () => setIsSpeaking(false);
//       }
//     }
//   };
//
//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFont('helvetica');
//     doc.setFontSize(12);
//
//     const splitText = doc.splitTextToSize(plan, 180);
//     doc.text(splitText, 15, 15);
//     doc.save('financial-plan.pdf');
//   };
//
//   const renderInput = () => {
//     if (step === STEPS.PLAN) return null;
//
//     const inputProps = {
//       type: step === STEPS.NAME || step === STEPS.GOAL ? 'text' : 'number',
//       name: Object.keys(formData)[step],
//       value: formData[Object.keys(formData)[step]],
//       onChange: handleInputChange,
//       className: "w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
//       placeholder: getNextPrompt(step),
//       min: step >= STEPS.INCOME ? 0 : undefined,
//     };
//
//     return (
//       <form onSubmit={handleSubmit} className="mt-400">
//         <input {...inputProps} />
//         <button
//           type="submit"
//           className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Continue
//         </button>
//       </form>
//     );
//   };
//
//   return (
//     <div className="container bg-[#080f26] mx-auto px-4 py-8 max-w-4xl">
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Main Chat Area */}
//         <div className="flex-1">
//           <h1 className="text-3xl font-bold text-white mb-6">AI Financial Advisor</h1>
//
//           <div className="bg-[#101936] rounded-xl p-6 shadow-xl">
//             <div
//               ref={chatRef}
//               className="space-y-4 mb-4 max-h-[60vh] overflow-y-auto"
//             >
//               {messages.map((msg, idx) => (
//                 <div
//                   key={idx}
//                   className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-[80%] rounded-lg p-4 ${
//                       msg.type === 'user'
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-gray-700 text-gray-100'
//                     }`}
//                   >
//                     {msg.content}
//                   </div>
//                 </div>
//               ))}
//             </div>
//
//             {renderInput()}
//
//             {step === STEPS.PLAN && (
//               <div className="flex gap-3 mt-4">
//                 <button
//                   onClick={() => textToSpeech(plan)}
//                   className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
//                 >
//                   {isSpeaking ? (
//                     <><StopIcon className="h-5 w-5" /> Stop</>
//                   ) : (
//                     <><SpeakerWaveIcon className="h-5 w-5" /> Read Aloud</>
//                   )}
//                 </button>
//                 <button
//                   onClick={generatePDF}
//                   className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
//                 >
//                   <DocumentArrowDownIcon className="h-5 w-5" />
//                   Download PDF
//                 </button>
//                 <button
//                   onClick={() => {
//                     setStep(STEPS.NAME);
//                     setFormData({
//                       name: '',
//                       income: '',
//                       expenses: '',
//                       goalDescription: '',
//                       goalAmount: '',
//                       timeframe: '',
//                     });
//                     setMessages([]);
//                     setPlan(null);
//                   }}
//                   className="flex items-center gap-2 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
//                 >
//                   <ArrowPathIcon className="h-5 w-5" />
//                   Start Over
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//
//         {/* Sidebar */}
//         <div className="lg:w-72">
//           <div className="bg-[#101936] rounded-xl p-6 shadow-xl">
//             <h2 className="text-xl font-semibold text-blue-500 mb-4">Progress</h2>
//             <div className="space-y-2">
//               {Object.keys(STEPS).map((stepName, idx) => (
//                 <div
//                   key={stepName}
//                   className={`flex items-center gap-2 p-2 rounded ${
//                     idx === step
//                       ? 'bg-blue-600 text-white'
//                       : idx < step
//                       ? 'text-green-500'
//                       : 'text-gray-400'
//                   }`}
//                 >
//                   <span className="w-5 h-5 flex items-center justify-center rounded-full border">
//                     {idx < step ? '✓' : idx + 1}
//                   </span>
//                   {stepName.charAt(0) + stepName.slice(1).toLowerCase()}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default FinancialAdvisor;

import React, { useState, useRef, useEffect } from 'react';
import { SpeakerWaveIcon, StopIcon, DocumentArrowDownIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { jsPDF } from 'jspdf';

const STEPS = {
  NAME: 0,
  INCOME: 1,
  EXPENSES: 2,
  GOAL: 3,
  AMOUNT: 4,
  TIMEFRAME: 5,
  PLAN: 6,
};

const API_URL = 'http://localhost:5000/api/financial';

const FinancialAdvisor = () => {
  const [step, setStep] = useState(STEPS.NAME);
  const [formData, setFormData] = useState({
    name: '',
    income: '',
    expenses: '',
    goalDescription: '',
    goalAmount: '',
    timeframe: '',
  });
  const [messages, setMessages] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [plan, setPlan] = useState(null);
  const [savedPlans, setSavedPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch existing plans when name is entered
  useEffect(() => {
    if (formData.name && step > STEPS.NAME) {
      fetchExistingPlans();
    }
  }, [formData.name, step]);

  const fetchExistingPlans = async () => {
    try {
      const response = await fetch(`${API_URL}/plans?name=${encodeURIComponent(formData.name)}`);
      if (response.ok) {
        const data = await response.json();
        setSavedPlans(data);
        // if (data.length > 0) {
        //   addMessage(`I found ${data.length} existing plan(s) for you. Would you like to view them?`);
        // }
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const addMessage = (content, type = 'bot') => {
    setMessages(prev => [...prev, { type, content, timestamp: new Date() }]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = formData[Object.keys(formData)[step]];
    addMessage(value, 'user');

    if (step === STEPS.TIMEFRAME) {
      generatePlan();
    } else {
      setStep(prev => prev + 1);
      const nextPrompt = getNextPrompt(step + 1);
      addMessage(nextPrompt);
    }
  };

  const generatePlan = async () => {
    setIsLoading(true);
    setError(null);

    const inflationRate = 0.03;
    const adjustedGoal = formData.goalAmount * Math.pow(1 + inflationRate, formData.timeframe);
    const monthlySavings = adjustedGoal / (formData.timeframe * 12);

    const generatedPlan = `
## Financial Plan for ${formData.name}

**Current Financial Status:**
- Monthly Income: ₹${parseFloat(formData.income).toLocaleString()}
- Monthly Expenses: ₹${parseFloat(formData.expenses).toLocaleString()}
- Available for Savings: ₹${(formData.income - formData.expenses).toLocaleString()}

**Goal Details:**
- Objective: ${formData.goalDescription}
- Target Amount: ₹${parseFloat(formData.goalAmount).toLocaleString()}
- Inflation-adjusted Target: ₹${adjustedGoal.toLocaleString()}
- Timeframe: ${formData.timeframe} years

**Required Monthly Savings:** ₹${monthlySavings.toLocaleString()}

**Investment Recommendations:**
1. Mutual Funds (40%): ₹${(monthlySavings * 0.4).toLocaleString()}/month
2. Fixed Deposits (30%): ₹${(monthlySavings * 0.3).toLocaleString()}/month
3. Stocks (20%): ₹${(monthlySavings * 0.2).toLocaleString()}/month
4. Emergency Fund (10%): ₹${(monthlySavings * 0.1).toLocaleString()}/month

**Risk Management:**
- Maintain an emergency fund of 6 months' expenses
- Consider term life insurance
- Review and rebalance portfolio every 6 months
`;

    setPlan(generatedPlan);
    addMessage(generatedPlan);
    setStep(STEPS.PLAN);

    try {
      const response = await fetch(`${API_URL}/plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          income: parseFloat(formData.income),
          expenses: parseFloat(formData.expenses),
          goalDescription: formData.goalDescription,
          goalAmount: parseFloat(formData.goalAmount),
          timeframe: parseInt(formData.timeframe),
          monthlySavingAmount: monthlySavings,
          adjustedGoalAmount: adjustedGoal,
          financialPlan: generatedPlan,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save financial plan');
      }

      const savedPlan = await response.json();
      addMessage('✅ Your financial plan has been saved successfully!');
      await fetchExistingPlans(); // Refresh the list of plans
    } catch (error) {
      setError('Failed to save plan. Please try again.');
      console.error('Error saving plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNextPrompt = (currentStep) => {
    switch (currentStep) {
      case STEPS.INCOME:
        return "What is your monthly income? (in ₹)";
      case STEPS.EXPENSES:
        return "What are your monthly expenses? (in ₹)";
      case STEPS.GOAL:
        return "What is your financial goal? (e.g., Buy a house, Retirement)";
      case STEPS.AMOUNT:
        return "How much money do you need for this goal? (in ₹)";
      case STEPS.TIMEFRAME:
        return "In how many years do you want to achieve this goal?";
      default:
        return "Hello! What's your name?";
    }
  };

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(12);

    const splitText = doc.splitTextToSize(plan, 180);
    doc.text(splitText, 15, 15);
    doc.save('financial-plan.pdf');
  };

  const renderInput = () => {
    if (step === STEPS.PLAN) return null;

    const inputProps = {
      type: step === STEPS.NAME || step === STEPS.GOAL ? 'text' : 'number',
      name: Object.keys(formData)[step],
      value: formData[Object.keys(formData)[step]],
      onChange: handleInputChange,
      className: "w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
      placeholder: getNextPrompt(step),
      min: step >= STEPS.INCOME ? 0 : undefined,
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
          <input {...inputProps} />
          <button
              type="submit"
              disabled={isLoading}
              className={`mt-2 w-full ${
                  isLoading
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
              } text-white py-2 px-4 rounded-lg transition-colors`}
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </button>
        </form>
    );
  };

  const renderSavedPlans = () => {
    if (!savedPlans.length) return null;

    return (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Previous Plans</h3>
          <div className="space-y-2">
            {savedPlans.map((savedPlan) => (
                <div
                    key={savedPlan._id}
                    className="p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                    onClick={() => {
                      setPlan(savedPlan.financialPlan);
                      addMessage(savedPlan.financialPlan);
                      setStep(STEPS.PLAN);
                    }}
                >
                  <p className="text-sm text-gray-300">
                    Goal: {savedPlan.goalDescription}
                  </p>
                  <p className="text-xs text-gray-400">
                    Created: {new Date(savedPlan.createdAt).toLocaleDateString()}
                  </p>
                </div>
            ))}
          </div>
        </div>
    );
  };

  return (
      <div className="container bg-[#080f26] mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Chat Area */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-6">AI Financial Advisor</h1>

            <div className="bg-[#101936] rounded-xl p-6 shadow-xl">
              <div
                  ref={chatRef}
                  className="space-y-4 mb-4 max-h-[60vh] overflow-y-auto"
              >
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                              msg.type === 'user'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-700 text-gray-100'
                          }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                ))}
              </div>

              {error && (
                  <div className="mb-4 p-3 bg-red-500 text-white rounded-lg">
                    {error}
                  </div>
              )}

              {renderInput()}
              {renderSavedPlans()}

              {step === STEPS.PLAN && (
                  <div className="flex gap-3 mt-4">
                    <button
                        onClick={() => textToSpeech(plan)}
                        className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      {isSpeaking ? (
                          <><StopIcon className="h-5 w-5" /> Stop</>
                      ) : (
                          <><SpeakerWaveIcon className="h-5 w-5" /> Read Aloud</>
                      )}
                    </button>
                    <button
                        onClick={generatePDF}
                        className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                    >
                      <DocumentArrowDownIcon className="h-5 w-5" />
                      Download PDF
                    </button>
                    <button
                        onClick={() => {
                          setStep(STEPS.NAME);
                          setFormData({
                            name: '',
                            income: '',
                            expenses: '',
                            goalDescription: '',
                            goalAmount: '',
                            timeframe: '',
                          });
                          setMessages([]);
                          setPlan(null);
                          setSavedPlans([]);
                        }}
                        className="flex items-center gap-2 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                    >
                      <ArrowPathIcon className="h-5 w-5" />
                      Start Over
                    </button>
                  </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-72">
            <div className="bg-[#101936] rounded-xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-blue-500 mb-4">Progress</h2>
              <div className="space-y-2">
                {Object.keys(STEPS).map((stepName, idx) => (
                    <div
                        key={stepName}
                        className={`flex items-center gap-2 p-2 rounded ${
                            idx === step
                                ? 'bg-blue-600 text-white'
                                : idx < step
                                    ? 'text-green-500'
                                    : 'text-gray-400'
                        }`}
                    >
                  <span className="w-5 h-5 flex items-center justify-center rounded-full border">
                    {idx < step ? '✓' : idx + 1}
                  </span>
                      {stepName.charAt(0) + stepName.slice(1).toLowerCase()}
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FinancialAdvisor;