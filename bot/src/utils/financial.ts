export const calculateFinancialPlan = (
  name: string,
  income: number,
  expenses: number,
  goalDescription: string,
  goalAmount: number,
  timeframe: number
): { plan: string; monthlySavings: number } => {
  const inflationRate = 0.03;
  const adjustedGoal = goalAmount * Math.pow(1 + inflationRate, timeframe);
  const monthlySavings = adjustedGoal / (timeframe * 12);
  const savingsPercentage = ((monthlySavings / income) * 100).toFixed(1);

  const plan = `
Financial Plan for ${name}

Current Financial Status:
- Monthly Income: ₹${income.toLocaleString()}
- Monthly Expenses: ₹${expenses.toLocaleString()}
- Available for Savings: ₹${(income - expenses).toLocaleString()}

Goal Details:
- Objective: ${goalDescription}
- Target Amount: ₹${goalAmount.toLocaleString()}
- Inflation-adjusted Target: ₹${adjustedGoal.toLocaleString()}
- Timeframe: ${timeframe} years

Required Monthly Savings: ₹${monthlySavings.toLocaleString()} (${savingsPercentage}% of income)

Investment Recommendations:
1. Mutual Funds: 40% (₹${(monthlySavings * 0.4).toLocaleString()}/month)
2. Fixed Deposits: 30% (₹${(monthlySavings * 0.3).toLocaleString()}/month)
3. Stocks: 20% (₹${(monthlySavings * 0.2).toLocaleString()}/month)
4. Emergency Fund: 10% (₹${(monthlySavings * 0.1).toLocaleString()}/month)

Risk Management:
- Maintain emergency fund of 6 months expenses
- Consider term life insurance
- Review and rebalance portfolio every 6 months

Progress Tracking:
- Set up automatic transfers for consistent savings
- Review monthly spending patterns
- Track investment performance quarterly
`;

  return { plan, monthlySavings };
};