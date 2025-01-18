import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import styled from "@emotion/styled";
import { useExpenseStorage } from "../hooks/useExpenseStorage";

const StyledCard = styled(Card)`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

interface BudgetFormData {
  monthlyBudget: string;
  dailyBudget: string;
}

export const Settings = () => {
  const { budget, updateBudget } = useExpenseStorage();
  const [formData, setFormData] = useState<BudgetFormData>({
    monthlyBudget: "",
    dailyBudget: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // 初期値を設定
  useEffect(() => {
    setFormData({
      monthlyBudget: budget.monthlyBudget.toString(),
      dailyBudget: budget.dailyBudget.toString(),
    });
  }, [budget]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBudget({
      monthlyBudget: Number(formData.monthlyBudget) || 0,
      dailyBudget: Number(formData.dailyBudget) || 0,
    });
    setShowSuccess(true);
  };

  const handleChange =
    (field: keyof BudgetFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 数値以外の入力を除去
      const value = e.target.value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  return (
    <>
      <Typography variant="h5" component="h1" gutterBottom>
        設定
      </Typography>

      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            予算設定
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            月間および日次の予算目標を設定します
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* 月間予算 */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="月間予算"
                  value={formData.monthlyBudget}
                  onChange={handleChange("monthlyBudget")}
                  InputProps={{
                    startAdornment: <Typography>¥</Typography>,
                  }}
                  helperText="1ヶ月の食費の目標金額を設定します"
                />
              </Grid>

              {/* 日次予算 */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="1日あたりの予算"
                  value={formData.dailyBudget}
                  onChange={handleChange("dailyBudget")}
                  InputProps={{
                    startAdornment: <Typography>¥</Typography>,
                  }}
                  helperText="1日あたりの食費の目標金額を設定します"
                />
              </Grid>

              {/* 保存ボタン */}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                >
                  設定を保存
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </StyledCard>

      {/* 保存成功時の通知 */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          設定を保存しました
        </Alert>
      </Snackbar>
    </>
  );
};
