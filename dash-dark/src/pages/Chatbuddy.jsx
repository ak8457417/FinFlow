import React, { useState } from 'react';
import { MessageSquare, DollarSign, TrendingUp, PiggyBank, Briefcase, Shield, CreditCard, Send, User } from 'lucide-react';

function Chatbuddy() {
    const [messages, setMessages] = useState([{ type: 'bot', content: "Hello! I'm your AI Financial Advisor. Please enter your name to begin." }]);
    const [step, setStep] = useState(0);
    const [planData, setPlanData] = useState({});
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            handleUserInput(input.trim());
            setInput('');
        }
    };

    const handleUserInput = (input) => {
        setMessages(prev => [...prev, { type: 'user', content: input }]);

        switch (step) {
            case 0:
                setPlanData(prev => ({ ...prev, name: input }));
                setMessages(prev => [...prev, { type: 'bot', content: `Welcome ${input}! Let's start with your financial details. What is your monthly income?` }]);
                setStep(1);
                break;
            case 1:
                const income = parseFloat(input);
                if (isNaN(income)) {
                    setMessages(prev => [...prev, { type: 'bot', content: 'Please enter a valid number for your income.' }]);
                    return;
                }
                setPlanData(prev => ({ ...prev, income }));
                setMessages(prev => [...prev, { type: 'bot', content: 'What are your monthly expenses?' }]);
                setStep(2);
                break;
            case 2:
                const expenses = parseFloat(input);
                if (isNaN(expenses)) {
                    setMessages(prev => [...prev, { type: 'bot', content: 'Please enter a valid number for your expenses.' }]);
                    return;
                }
                setPlanData(prev => ({ ...prev, expenses }));
                setMessages(prev => [...prev, { type: 'bot', content: 'What financial goal would you like to achieve? (e.g., Buy a house, Retirement)' }]);
                setStep(3);
                break;
            case 3:
                setPlanData(prev => ({ ...prev, goalDescription: input }));
                setMessages(prev => [...prev, { type: 'bot', content: 'How much money do you need to achieve this goal? (enter amount)' }]);
                setStep(4);
                break;
            case 4:
                const goalAmount = parseFloat(input);
                if (isNaN(goalAmount)) {
                    setMessages(prev => [...prev, { type: 'bot', content: 'Please enter a valid number for your goal amount.' }]);
                    return;
                }
                setPlanData(prev => ({ ...prev, goalAmount }));
                setMessages(prev => [...prev, { type: 'bot', content: 'In how many years do you want to achieve this goal?' }]);
                setStep(5);
                break;
            case 5:
                const timeframe = parseInt(input);
                if (isNaN(timeframe)) {
                    setMessages(prev => [...prev, { type: 'bot', content: 'Please enter a valid number of years.' }]);
                    return;
                }
                const adjustedAmount = (planData.goalAmount ?? 0) * Math.pow(1.03, timeframe);
                const monthlySavings = adjustedAmount / (timeframe * 12);

                setPlanData(prev => ({ ...prev, timeframe, adjustedAmount, monthlySavings }));
                setMessages(prev => [...prev, { type: 'bot', content: `Based on your inputs, here's your financial plan:
                
                Monthly Income: ₹${planData.income?.toLocaleString()}
                Monthly Expenses: ₹${planData.expenses?.toLocaleString()}
                Goal: ${planData.goalDescription}
                Target Amount: ₹${planData.goalAmount?.toLocaleString()}
                Timeframe: ${timeframe} years
                
                Inflation-Adjusted Amount: ₹${adjustedAmount.toLocaleString()}
                Required Monthly Savings: ₹${monthlySavings.toLocaleString()}
                
                Would you like to adjust this plan? (yes/no)` }]);
                setStep(6);
                break;
            case 6:
                if (input.toLowerCase() === 'yes') {
                    setMessages(prev => [...prev, { type: 'bot', content: 'What would you like to adjust?\n1. Timeframe\n2. Goal amount\n3. Both' }]);
                    setStep(7);
                } else {
                    setMessages(prev => [...prev, { type: 'bot', content: '🎉 Great! Your financial plan has been saved. Good luck with your goals!' }]);
                }
                break;
            case 7:
                if (input === "1") {
                    setStep(5);
                    setMessages(prev => [...prev, { type: 'bot', content: 'Please enter your new timeframe (years):' }]);
                } else if (input === "2") {
                    setStep(4);
                    setMessages(prev => [...prev, { type: 'bot', content: 'Please enter your new goal amount:' }]);
                } else if (input === "3") {
                    setStep(4);
                    setMessages(prev => [...prev, { type: 'bot', content: 'Please enter your new goal amount:' }]);
                } else {
                    setMessages(prev => [...prev, { type: 'bot', content: 'Invalid choice. Please select 1, 2, or 3.' }]);
                }
                break;
        }
    };

    return <div>Chatbot Component</div>; // Simplified return for readability
}

export default Chatbuddy;
