// Mock financial data for the AI Financial Planning Assistant

export interface Transaction {
  id: string
  description: string
  amount: number
  category: string
  date: string
  type: 'income' | 'expense'
}

export interface Budget {
  id: string
  category: string
  allocated: number
  spent: number
  color: string
}

export interface Insight {
  id: string
  type: 'warning' | 'success' | 'tip' | 'info'
  title: string
  description: string
  savings?: number
  icon: string
}

export interface Investment {
  id: string
  name: string
  type: string
  risk: 'low' | 'medium' | 'high'
  expectedReturn: string
  minAmount: number
  description: string
}

export const userProfile = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'AJ',
  memberSince: '2024',
  totalBalance: 45280.50,
  monthlyIncome: 8500,
  monthlySavings: 2125,
  savingsRate: 25,
}

export const transactions: Transaction[] = [
  { id: '1', description: 'Salary Deposit', amount: 8500, category: 'Income', date: '2024-03-01', type: 'income' },
  { id: '2', description: 'Rent Payment', amount: 1800, category: 'Housing', date: '2024-03-02', type: 'expense' },
  { id: '3', description: 'Grocery Store', amount: 245.80, category: 'Food', date: '2024-03-03', type: 'expense' },
  { id: '4', description: 'Electric Bill', amount: 120, category: 'Utilities', date: '2024-03-04', type: 'expense' },
  { id: '5', description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', date: '2024-03-05', type: 'expense' },
  { id: '6', description: 'Restaurant Dinner', amount: 85.50, category: 'Food', date: '2024-03-06', type: 'expense' },
  { id: '7', description: 'Gas Station', amount: 55, category: 'Transportation', date: '2024-03-07', type: 'expense' },
  { id: '8', description: 'Gym Membership', amount: 50, category: 'Health', date: '2024-03-08', type: 'expense' },
  { id: '9', description: 'Coffee Shop', amount: 28.50, category: 'Food', date: '2024-03-09', type: 'expense' },
  { id: '10', description: 'Online Shopping', amount: 156.99, category: 'Shopping', date: '2024-03-10', type: 'expense' },
  { id: '11', description: 'Freelance Payment', amount: 1200, category: 'Income', date: '2024-03-11', type: 'income' },
  { id: '12', description: 'Phone Bill', amount: 85, category: 'Utilities', date: '2024-03-12', type: 'expense' },
  { id: '13', description: 'Uber Rides', amount: 42.30, category: 'Transportation', date: '2024-03-13', type: 'expense' },
  { id: '14', description: 'Takeout Food', amount: 35.99, category: 'Food', date: '2024-03-14', type: 'expense' },
  { id: '15', description: 'Spotify Premium', amount: 10.99, category: 'Entertainment', date: '2024-03-15', type: 'expense' },
]

export const budgets: Budget[] = [
  { id: '1', category: 'Housing', allocated: 2000, spent: 1800, color: 'var(--chart-1)' },
  { id: '2', category: 'Food', allocated: 600, spent: 395.79, color: 'var(--chart-2)' },
  { id: '3', category: 'Transportation', allocated: 300, spent: 97.30, color: 'var(--chart-3)' },
  { id: '4', category: 'Entertainment', allocated: 200, spent: 26.98, color: 'var(--chart-4)' },
  { id: '5', category: 'Utilities', allocated: 250, spent: 205, color: 'var(--chart-5)' },
  { id: '6', category: 'Shopping', allocated: 300, spent: 156.99, color: 'var(--chart-1)' },
  { id: '7', category: 'Health', allocated: 150, spent: 50, color: 'var(--chart-2)' },
  { id: '8', category: 'Savings', allocated: 2125, spent: 2125, color: 'var(--accent)' },
]

export const monthlyData = [
  { month: 'Oct', income: 8200, expenses: 5800, savings: 2400 },
  { month: 'Nov', income: 8500, expenses: 6200, savings: 2300 },
  { month: 'Dec', income: 9200, expenses: 7100, savings: 2100 },
  { month: 'Jan', income: 8500, expenses: 5900, savings: 2600 },
  { month: 'Feb', income: 8500, expenses: 6100, savings: 2400 },
  { month: 'Mar', income: 9700, expenses: 6375, savings: 3325 },
]

export const categoryBreakdown = [
  { name: 'Housing', value: 1800, percentage: 28.2, fill: 'var(--chart-1)' },
  { name: 'Food', value: 395.79, percentage: 6.2, fill: 'var(--chart-2)' },
  { name: 'Savings', value: 2125, percentage: 33.3, fill: 'var(--accent)' },
  { name: 'Shopping', value: 156.99, percentage: 2.5, fill: 'var(--chart-3)' },
  { name: 'Utilities', value: 205, percentage: 3.2, fill: 'var(--chart-4)' },
  { name: 'Transportation', value: 97.30, percentage: 1.5, fill: 'var(--chart-5)' },
  { name: 'Entertainment', value: 26.98, percentage: 0.4, fill: 'var(--chart-1)' },
  { name: 'Health', value: 50, percentage: 0.8, fill: 'var(--chart-2)' },
]

export const insights: Insight[] = [
  {
    id: '1',
    type: 'success',
    title: 'Great Savings Rate!',
    description: 'Your savings rate of 25% is above the recommended 20%. Keep up the excellent work! At this pace, you could build a 6-month emergency fund in about 2 years.',
    icon: 'trophy',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Food Spending Alert',
    description: 'Your food spending is trending 15% higher than last month. Consider meal prepping to reduce takeout expenses.',
    savings: 120,
    icon: 'alert-triangle',
  },
  {
    id: '3',
    type: 'tip',
    title: 'Subscription Optimization',
    description: 'You have $26.98 in entertainment subscriptions. Consider bundling services or using family plans to save up to $10/month.',
    savings: 10,
    icon: 'lightbulb',
  },
  {
    id: '4',
    type: 'info',
    title: 'Housing Cost Analysis',
    description: 'Your housing costs represent 21% of your income, which is within the recommended 30% threshold. Well managed!',
    icon: 'home',
  },
  {
    id: '5',
    type: 'tip',
    title: 'Investment Opportunity',
    description: 'With your consistent savings of $2,125/month, you could consider investing the excess in index funds for long-term growth.',
    icon: 'trending-up',
  },
]

export const investments: Investment[] = [
  {
    id: '1',
    name: 'High-Yield Savings Account',
    type: 'Savings',
    risk: 'low',
    expectedReturn: '4.5% APY',
    minAmount: 0,
    description: 'Perfect for emergency funds. FDIC insured with easy access to your money.',
  },
  {
    id: '2',
    name: 'S&P 500 Index Fund',
    type: 'Stocks',
    risk: 'medium',
    expectedReturn: '8-10% annually',
    minAmount: 100,
    description: 'Diversified exposure to 500 largest US companies. Great for long-term wealth building.',
  },
  {
    id: '3',
    name: 'Total Bond Market Fund',
    type: 'Bonds',
    risk: 'low',
    expectedReturn: '4-5% annually',
    minAmount: 500,
    description: 'Stable income with lower volatility. Good for balancing your portfolio.',
  },
  {
    id: '4',
    name: 'Growth ETF Portfolio',
    type: 'ETF',
    risk: 'high',
    expectedReturn: '12-15% annually',
    minAmount: 1000,
    description: 'Focus on high-growth companies. Higher risk but potential for greater returns.',
  },
  {
    id: '5',
    name: 'Real Estate Investment Trust',
    type: 'Real Estate',
    risk: 'medium',
    expectedReturn: '6-8% annually',
    minAmount: 500,
    description: 'Invest in real estate without buying property. Regular dividend income.',
  },
]

// AI-generated budget recommendations based on income
export function generateBudgetRecommendation(monthlyIncome: number) {
  return {
    housing: monthlyIncome * 0.28,
    food: monthlyIncome * 0.12,
    transportation: monthlyIncome * 0.10,
    utilities: monthlyIncome * 0.05,
    healthcare: monthlyIncome * 0.05,
    entertainment: monthlyIncome * 0.05,
    savings: monthlyIncome * 0.20,
    other: monthlyIncome * 0.15,
  }
}

// Calculate financial health score (0-100)
export function calculateHealthScore(savingsRate: number, debtRatio: number = 0): number {
  let score = 50

  // Savings rate contribution (up to 30 points)
  if (savingsRate >= 20) score += 30
  else if (savingsRate >= 15) score += 25
  else if (savingsRate >= 10) score += 15
  else if (savingsRate >= 5) score += 5

  // Debt ratio contribution (up to 20 points)
  if (debtRatio <= 10) score += 20
  else if (debtRatio <= 20) score += 15
  else if (debtRatio <= 30) score += 10
  else if (debtRatio <= 40) score += 5

  return Math.min(100, score)
}

export const healthScore = calculateHealthScore(userProfile.savingsRate)
