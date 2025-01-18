import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import styled from "@emotion/styled";
import { useExpenseStorage } from "../hooks/useExpenseStorage";
import { ExpenseCategory } from "../types/expense";

const StyledCard = styled(Card)`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// スマホアプリと同じカテゴリーを使用
const categories = [
  { value: "grocery", label: "スーパー" },
  { value: "eating_out", label: "外食" },
  { value: "snack", label: "間食" },
  { value: "drinking", label: "飲み会" },
  { value: "convenience", label: "コンビニ" },
  { value: "home_cooking", label: "自炊" },
  { value: "other", label: "その他" },
];

export const Expense = () => {
  const { addExpense } = useExpenseStorage();
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<ExpenseCategory>("grocery");
  const [memo, setMemo] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({
      amount: Number(amount),
      category,
      memo,
      date: new Date().toISOString(),
    });

    // フォームをリセット
    setAmount("");
    setCategory("grocery");
    setMemo("");
  };

  return (
    <>
      <Typography variant="h5" component="h1" gutterBottom>
        支出を記録
      </Typography>

      <StyledCard>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="金額"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  InputProps={{
                    startAdornment: <Typography>¥</Typography>,
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="カテゴリー"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as ExpenseCategory)
                  }
                  required
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="メモ"
                  multiline
                  rows={3}
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                >
                  記録する
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </StyledCard>
    </>
  );
};
