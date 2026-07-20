export interface DashboardData {
  totalExpenses: number;
  totalTransactions: number;
  averageExpense: number;

  financialHealth: {
    score: number;
    status: string;
  };

  categoryBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];

  monthlyTrend: {
    month: string;
    income: number;
    expenses: number;
  }[];

  recentExpenses: {
    _id: string;
    title: string;
    amount: number;
    category: string;
    paymentMethod: string;
    date: string;
  }[];
}