import { useState } from "react";
import { Box, CardContent, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useExpenseStorage } from "../hooks/useExpenseStorage";
import {
  StyledCard,
  MonthlyExpenseCard,
  DailyAverageCard,
  MonthlyBudgetCard,
  CategoryExpenseCard,
} from "../components/reports";

export const Report = () => {
  const { getMonthlyExpenses, budget } = useExpenseStorage();
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const monthlyExpenses = getMonthlyExpenses(selectedMonth);
  const total = monthlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // 前月のデータを取得
  const lastMonth = new Date(selectedMonth);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const lastMonthExpenses = getMonthlyExpenses(lastMonth);
  const lastMonthTotal = lastMonthExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // 1日あたりの平均を計算
  const daysInMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth() + 1,
    0
  ).getDate();
  const averagePerDay = Math.round(total / daysInMonth);

  // カテゴリー別の集計
  const categorySummaries = monthlyExpenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = { total: 0, count: 0, percentage: 0 };
    }
    acc[expense.category].total += expense.amount;
    acc[expense.category].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number; percentage: number }>);

  // パーセンテージを計算
  Object.values(categorySummaries).forEach((summary) => {
    summary.percentage = (summary.total / total) * 100;
  });

  return (
    <Box sx={{ p: 2, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* 月選択 */}
      <StyledCard>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => {
              const newDate = new Date(selectedMonth);
              newDate.setMonth(newDate.getMonth() - 1);
              setSelectedMonth(newDate);
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6">
            {selectedMonth.toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
            })}
          </Typography>
          <IconButton
            onClick={() => {
              const newDate = new Date(selectedMonth);
              newDate.setMonth(newDate.getMonth() + 1);
              setSelectedMonth(newDate);
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </CardContent>
      </StyledCard>

      {/* 月間支出の推移 */}
      <MonthlyExpenseCard total={total} lastMonthTotal={lastMonthTotal} />

      {/* 1日あたりの平均 */}
      <DailyAverageCard
        averagePerDay={averagePerDay}
        budget={budget.dailyBudget}
      />

      {/* 月間予算 */}
      <MonthlyBudgetCard monthlyBudget={budget.monthlyBudget} />

      {/* カテゴリー別支出 */}
      <CategoryExpenseCard categorySummaries={categorySummaries} />
    </Box>
  );
};
