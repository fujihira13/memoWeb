import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  TextField,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Switch,
  FormControlLabel,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useExpenseStorage } from "../hooks/useExpenseStorage";
import { useNavigate } from "react-router-dom";
import { ExpenseCategory, MealTime } from "../types";
import { ExpenseFormInputs } from "../components/expense/ExpenseFormInputs";
import { ExpenseMealTime } from "../components/expense/ExpenseMealTime";
import { ToggleButton as MuiToggleButton } from "@mui/material";
import { ExpenseSubmit } from "../components/expense/ExpenseSubmit";
import { ExpenseForm } from "../components/expense/ExpenseForm";

// 食事の時間帯の定義
const mealTimes: { value: MealTime; label: string }[] = [
  { value: "breakfast", label: "朝食" },
  { value: "lunch", label: "昼食" },
  { value: "dinner", label: "夕食" },
  { value: "snack", label: "間食" },
];

// スタイル付きのトグルボタン
const StyledToggleButton = styled(MuiToggleButton)({
  flex: 1,
  padding: "8px",
  backgroundColor: "#f5f5f5",
  "&.Mui-selected": {
    backgroundColor: "#009688",
    color: "white",
    "&:hover": {
      backgroundColor: "#00897b",
    },
  },
});

export const Expense = () => {
  const navigate = useNavigate();
  const { addExpense } = useExpenseStorage();
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<ExpenseCategory>("grocery");
  const [mealTime, setMealTime] = useState<MealTime>("breakfast");
  const [isHomeMade, setIsHomeMade] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    // 時間帯が未選択の場合は処理を中断
    if (!mealTime) {
      alert("食事の時間帯を選択してください");
      return;
    }

    if (isHomeMade) {
      // 自炊の場合は金額0円で登録
      addExpense({
        amount: 0,
        category: "home_cooking",
        date: new Date(date),
        mealTime,
        timeRange: mealTime,
        isHomeMade,
      });
    } else {
      if (!amount || !category) {
        alert("金額とカテゴリーを入力してください");
        return;
      }

      addExpense({
        amount: parseInt(amount),
        category,
        date: new Date(date),
        mealTime,
        timeRange: mealTime,
        isHomeMade,
      });
    }

    // 成功メッセージを表示
    setShowSuccess(true);

    // 1秒後にホーム画面に遷移
    setTimeout(() => {
      navigate("/");
    }, 1000);

    // フォームをリセット
    setAmount("");
    setCategory("grocery");
    setMealTime("breakfast");
    setIsHomeMade(false);
  };

  return <ExpenseForm />;
};
