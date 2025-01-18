import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import styled from "@emotion/styled";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import StoreIcon from "@mui/icons-material/Store";
import KitchenIcon from "@mui/icons-material/Kitchen";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useExpenseStorage } from "../hooks/useExpenseStorage";

const StyledCard = styled(Card)`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const ProgressBar = styled(Box)`
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  margin: 8px 0;
`;

const ProgressFill = styled(Box)<{ width: string }>`
  height: 100%;
  background-color: #2196f3;
  border-radius: 2px;
  width: ${(props) => props.width};
`;

const categoryIcons = {
  grocery: ShoppingCartIcon,
  eating_out: RestaurantIcon,
  snack: LocalCafeIcon,
  drinking: LocalBarIcon,
  convenience: StoreIcon,
  home_cooking: KitchenIcon,
  other: MoreHorizIcon,
};

const categoryLabels: { [key: string]: string } = {
  grocery: "スーパー",
  eating_out: "外食",
  snack: "間食",
  drinking: "飲み会",
  convenience: "コンビニ",
  home_cooking: "自炊",
  other: "その他",
};

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
      <StyledCard>
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary">
            月間支出の推移
          </Typography>
          <Typography variant="h4" sx={{ my: 1 }}>
            ¥{total.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            先月: ¥{lastMonthTotal.toLocaleString()}
          </Typography>
        </CardContent>
      </StyledCard>

      {/* 1日あたりの平均 */}
      <StyledCard>
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary">
            1日あたりの平均
          </Typography>
          <Typography variant="h4" sx={{ my: 1 }}>
            ¥{averagePerDay.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            目標: ¥{budget.dailyBudget.toLocaleString()}/日
          </Typography>
        </CardContent>
      </StyledCard>

      {/* 月間予算 */}
      <StyledCard>
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary">
            月間予算
          </Typography>
          <Typography variant="h4" sx={{ my: 1 }}>
            ¥{budget.monthlyBudget.toLocaleString()}
          </Typography>
        </CardContent>
      </StyledCard>

      {/* カテゴリー別支出 */}
      <StyledCard>
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            カテゴリー別支出
          </Typography>
          <Stack spacing={2}>
            {Object.entries(categorySummaries)
              .sort(([, a], [, b]) => b.total - a.total)
              .map(([category, summary]) => {
                const Icon =
                  categoryIcons[category as keyof typeof categoryIcons];
                return (
                  <Box key={category}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Icon color="action" />
                      <Box flexGrow={1}>
                        <Box display="flex" justifyContent="space-between">
                          <Typography>{categoryLabels[category]}</Typography>
                          <Typography>
                            ¥{summary.total.toLocaleString()}
                          </Typography>
                        </Box>
                        <ProgressBar>
                          <ProgressFill width={`${summary.percentage}%`} />
                        </ProgressBar>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
          </Stack>
        </CardContent>
      </StyledCard>
    </Box>
  );
};
