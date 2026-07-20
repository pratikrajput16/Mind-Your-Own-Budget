export interface AIAnalysis {
  summary: {
    totalExpenses: number;
    transactions: number;
    averageExpense: number;
  };

  highestCategory: {
    category: string;
    amount: number;
  };

  lowestCategory: {
    category: string;
    amount: number;
  };

  recommendations: string[];

  smartSuggestions: string[];

  trends: {
    category: string;
    direction: string;
    change: string;
  }[];

  forecast: {
    currentMonth: string;
    currentTotal: number;
    predictedNextMonth: number;
    expectedChange: number;
  };

  llmAdvice: string;
}