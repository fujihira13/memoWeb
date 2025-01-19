export type ExpenseCategory =
  | "grocery"
  | "eating_out"
  | "snack"
  | "drinking"
  | "convenience"
  | "home_cooking"
  | "other";

export type MealTime = "breakfast" | "lunch" | "dinner" | "snack";

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
  mealTime: MealTime;
  isHomeMade: boolean;
  memo?: string;
}

export interface Budget {
  monthlyBudget: number;
  dailyBudget: number;
}
