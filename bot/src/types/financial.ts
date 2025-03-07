export interface FinancialPlanData {
  name: string;
  income: number;
  expenses: number;
  goalDescription: string;
  goalAmount: number;
  timeframe: number;
  financialPlan: string;
  monthlySavingAmount: number;
}

export interface Message {
  type: 'bot' | 'user';
  content: string;
}

export type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;