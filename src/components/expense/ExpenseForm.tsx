import { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useExpenseStorage } from "../../hooks/useExpenseStorage";
import { ExpenseCategory, MealTime } from "../../types";
import { ExpenseFormInputs } from "./ExpenseFormInputs";
import { ExpenseMealTime } from "./ExpenseMealTime";
import { ExpenseSubmit } from "./ExpenseSubmit";

export const ExpenseForm = () => {
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

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        支出を記録
      </Typography>

      <Stack spacing={3}>
        {/* 自炊スイッチ */}
        <FormControlLabel
          control={
            <Switch
              checked={isHomeMade}
              onChange={(e) => setIsHomeMade(e.target.checked)}
            />
          }
          label="自炊"
        />

        {/* 金額入力とカテゴリー選択（自炊モードがオフの時のみ表示） */}
        {!isHomeMade && (
          <ExpenseFormInputs
            amount={amount}
            category={category}
            onAmountChange={setAmount}
            onCategoryChange={setCategory}
          />
        )}

        {/* 食事の時間帯 */}
        <ExpenseMealTime mealTime={mealTime} onMealTimeChange={setMealTime} />

        {/* 日付選択 */}
        <TextField
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
        />

        {/* 送信ボタン */}
        <ExpenseSubmit
          onSubmit={handleSubmit}
          showSuccess={showSuccess}
          onCloseSuccess={() => setShowSuccess(false)}
        />
      </Stack>
    </Box>
  );
};
