import React, { useState, useEffect } from "react";
import axios from "axios";

// Function to format the financial plan text and make it bold
const formatText = (inputText) => {
    const boldTextPattern = /\*\*(.*?)\*\*/g;
    const formattedText = inputText.replace(boldTextPattern, (match, p1) => {
        return `<strong>${p1}</strong>`;
    });
    return formattedText.replace(/\*/g, ''); // Remove remaining stars
};

const ChatRecord = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch the financial plans
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/financial/plans");
                setPlans(response.data);
            } catch (err) {
                setError("Error fetching financial plans.");
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="!p-[24px] !space-y-6 !mb-50">
            <h2 className={'text-[24px] font-bold mb-3'}>Chat Records</h2>
            {plans.map((plan) => (
                <div key={plan._id} className="bg-[#101936] hover:bg-[#1e293b] border-[0.5px] border-gray-600 !p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-white mb-3">Financial Plan for {plan.name}</h3>
                    <p><strong className="text-gray-400">Name:</strong> {plan.name}</p>
                    <p><strong className="text-gray-400">Income:</strong> ₹{plan.income}</p>
                    <p><strong className="text-gray-400">Expenses:</strong> ₹{plan.expenses}</p>
                    <p><strong className="text-gray-400">Goal Description:</strong> {plan.goalDescription}</p>
                    <p><strong className="text-gray-400">Goal Amount:</strong> ₹{plan.goalAmount}</p>
                    <p><strong className="text-gray-400">Timeframe:</strong> {plan.timeframe} years</p>
                    <p><strong className="text-gray-400">Monthly Saving Amount:</strong> ₹{plan.monthlySavingAmount}</p>

                    {/* Show 'See More' button */}
                    <div className="mt-4">
                        <SeeMoreContent content={plan.financialPlan} />
                    </div>
                </div>
            ))}
        </div>
    );
};

// Component to handle 'See More' functionality
const SeeMoreContent = ({ content }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <button
                onClick={toggleVisibility}
                className="text-sm text-blue-600 hover:text-blue-800 mt-2"
            >
                {isVisible ? "See Less" : "See More"}
            </button>
            {isVisible && (
                <div
                    className="mt-4"
                    dangerouslySetInnerHTML={{
                        __html: formatText(content),
                    }}
                />
            )}
        </div>
    );
};

export default ChatRecord;
