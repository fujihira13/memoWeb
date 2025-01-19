import { useState } from "react";
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
  styled,
  Snackbar,
  Alert,
} from "@mui/material";
import { useExpenseStorage } from "../hooks/useExpenseStorage";
import { useNavigate } from "react-router-dom";

// スタイル付きのトグルボタン
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
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
}));

// カテゴリーの定義
const categories = [
  { value: "grocery", label: "スーパー" },
  { value: "eating_out", label: "外食" },
  { value: "snack", label: "間食" },
  { value: "drinking", label: "飲み会" },
  { value: "convenience", label: "コンビニ" },
  { value: "other", label: "その他" },
];

// 食事の時間帯の定義
const mealTimes = [
  { value: "breakfast", label: "朝食" },
  { value: "lunch", label: "昼食" },
  { value: "dinner", label: "夕食" },
  { value: "snack", label: "間食" },
];

export const Expense = () => {
  const navigate = useNavigate();
  const { addExpense } = useExpenseStorage();
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [mealTime, setMealTime] = useState<string>("");
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
    setCategory("");
    setMealTime("");
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
          <>
            {/* 金額入力 */}
            <TextField
              label="金額を入力"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              fullWidth
            />

            {/* カテゴリー選択 */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                カテゴリー
              </Typography>
              <ToggleButtonGroup
                value={category}
                exclusive
                onChange={(_, value) => setCategory(value)}
                fullWidth
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                {categories.map((cat) => (
                  <StyledToggleButton key={cat.value} value={cat.value}>
                    {cat.label}
                  </StyledToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </>
        )}

        {/* 食事の時間帯 */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            食事の時間帯 <span style={{ color: "red" }}>*</span>
          </Typography>
          <ToggleButtonGroup
            value={mealTime}
            exclusive
            onChange={(_, value) => setMealTime(value)}
            fullWidth
            sx={{ flexWrap: "wrap", gap: 1 }}
          >
            {mealTimes.map((time) => (
              <StyledToggleButton key={time.value} value={time.value}>
                {time.label}
              </StyledToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* 日付選択 */}
        <TextField
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
        />

        {/* 送信ボタン */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{
            backgroundColor: "#009688",
            color: "white",
            py: 1.5,
            "&:hover": {
              backgroundColor: "#00897b",
            },
          }}
        >
          支出を記録
        </Button>
      </Stack>

      {/* 成功メッセージ */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          支出を記録しました
        </Alert>
      </Snackbar>
    </Box>
  );
};
