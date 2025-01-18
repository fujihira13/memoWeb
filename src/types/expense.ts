export type ExpenseCategory =
  | "grocery"
  | "eating_out"
  | "snack"
  | "drinking"
  | "convenience"
  | "home_cooking"
  | "other";

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  memo: string;
  date: string;
  timeRange?: "breakfast" | "lunch" | "dinner" | "snack" | "other";
}

export interface Budget {
  monthlyBudget: number;
  dailyBudget: number;
}
