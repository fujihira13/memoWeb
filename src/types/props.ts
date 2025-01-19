import { ReactNode } from "react";
import { Expense, ExpenseCategory, MealTime } from "./expense";

export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export interface EditFormData {
  amount: string;
  category: ExpenseCategory;
  mealTime: MealTime;
  memo: string;
}

export interface TimeRangeReportProps {
  expenses: Expense[];
}

export interface DailyReportProps {
  expenses: Expense[];
  selectedDate: Date;
  budget: number;
}
