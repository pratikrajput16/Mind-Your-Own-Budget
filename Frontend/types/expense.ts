export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  paymentMethod: string;
  description?: string;
  date: string;
}