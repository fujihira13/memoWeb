import { useState, useEffect } from "react";
import { Expense, Budget } from "../types/expense";

const EXPENSES_KEY = "expenses";
const BUDGET_KEY = "budget";

export const useExpenseStorage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<Budget>({
    monthlyBudget: 0,
    dailyBudget: 0,
  });

  // 初期データの読み込み
  useEffect(() => {
    const savedExpenses = localStorage.getItem(EXPENSES_KEY);
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }

    const savedBudget = localStorage.getItem(BUDGET_KEY);
    if (savedBudget) {
      setBudget(JSON.parse(savedBudget));
    }
  }, []);

  // 支出の追加
  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(updatedExpenses));
  };

  // 予算の更新
  const updateBudget = (newBudget: Budget) => {
    setBudget(newBudget);
    localStorage.setItem(BUDGET_KEY, JSON.stringify(newBudget));
  };

  // 月別の支出集計
  const getMonthlyExpenses = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getFullYear() === year && expenseDate.getMonth() === month
      );
    });
  };

  const deleteExpense = async (expenseId: string): Promise<void> => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseId
    );
    await localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
  };

  const updateExpense = async (updatedExpense: Expense): Promise<void> => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    await localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
  };

  return {
    expenses,
    budget,
    addExpense,
    updateBudget,
    getMonthlyExpenses,
    deleteExpense,
    updateExpense,
  };
};
