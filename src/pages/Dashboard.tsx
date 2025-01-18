import { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Alert,
} from "@mui/material";
import styled from "@emotion/styled";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import StorefrontIcon from "@mui/icons-material/Storefront";
import IcecreamIcon from "@mui/icons-material/Icecream";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KitchenIcon from "@mui/icons-material/Kitchen";
import { useExpenseStorage } from "../hooks/useExpenseStorage";
import { Expense, ExpenseCategory } from "../types/expense";
import { TabPanel } from "../components/TabPanel";

const StyledCard = styled(Card)`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const ProgressBar = styled(Box)`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin: 8px 0;
`;

const ProgressFill = styled(Box)<{ width: string }>`
  height: 100%;
  background-color: #0891b2;
  border-radius: 4px;
  width: ${(props) => props.width};
`;

const timeRangeLabels = {
  breakfast: "朝食",
  lunch: "昼食",
  dinner: "夕食",
  snack: "間食",
};

const categoryLabels = {
  grocery: "スーパー",
  eating_out: "外食",
  convenience: "コンビニ",
  snack: "間食",
  drinking: "飲み会",
  home_cooking: "自炊",
  other: "その他",
};

const tabs = [
  { id: "timeRange", label: "時間帯別" },
  { id: "daily", label: "日別レポート" },
  { id: "analysis", label: "自炊分析" },
];

export const Dashboard = () => {
  const { expenses, deleteExpense, updateExpense } = useExpenseStorage();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState(0);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [editFormData, setEditFormData] = useState<{
    amount: string;
    category: ExpenseCategory;
    timeRange: NonNullable<Expense["timeRange"]> | "";
    memo: string;
  }>({
    amount: "",
    category: "grocery",
    timeRange: "",
    memo: "",
  });
  const [error, setError] = useState<string>("");

  // 当月のデータをフィルタリング
  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === selectedMonth.getMonth() &&
      expenseDate.getFullYear() === selectedMonth.getFullYear()
    );
  });

  // 日付を変更する
  const handleDateChange = (increment: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + increment);
    setSelectedDate(newDate);
  };

  // 選択された日付の支出データを計算
  const dailyData = useMemo(() => {
    const data = {
      breakfast: { amount: 0, count: 0 },
      lunch: { amount: 0, count: 0 },
      dinner: { amount: 0, count: 0 },
      snack: { amount: 0, count: 0 },
    };

    expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getDate() === selectedDate.getDate() &&
          expenseDate.getMonth() === selectedDate.getMonth() &&
          expenseDate.getFullYear() === selectedDate.getFullYear()
        );
      })
      .forEach((expense) => {
        if (expense.timeRange && expense.timeRange in data) {
          data[expense.timeRange as keyof typeof data].amount += expense.amount;
          data[expense.timeRange as keyof typeof data].count++;
        }
      });

    return data;
  }, [expenses, selectedDate]);

  // 日別合計の計算
  const totalDaily = Object.values(dailyData).reduce(
    (sum, data) => sum + data.amount,
    0
  );

  // 時間帯別の集計
  const timeRangeData = monthlyExpenses.reduce((acc, expense) => {
    const timeRange = expense.timeRange || "other";
    if (!acc[timeRange]) {
      acc[timeRange] = { amount: 0, count: 0 };
    }
    acc[timeRange].amount += expense.amount;
    acc[timeRange].count += 1;
    return acc;
  }, {} as Record<string, { amount: number; count: number }>);

  const totalAmount = monthlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const wasteExpenses = monthlyExpenses.reduce((sum, expense) => {
    const wasteCategories = ["eating_out", "snack", "drinking", "convenience"];
    return wasteCategories.includes(expense.category)
      ? sum + expense.amount
      : sum;
  }, 0);

  // カテゴリー別集計
  const categorySummaries = useMemo(() => {
    const summaries: Record<
      string,
      { total: number; count: number; percentage: number }
    > = {};
    let grandTotal = 0;

    monthlyExpenses.forEach((expense) => {
      const amount = expense.amount;
      grandTotal += amount;

      if (!summaries[expense.category]) {
        summaries[expense.category] = {
          total: 0,
          count: 0,
          percentage: 0,
        };
      }

      summaries[expense.category].total += amount;
      summaries[expense.category].count++;
    });

    // パーセンテージを計算
    Object.keys(summaries).forEach((category) => {
      summaries[category].percentage =
        (summaries[category].total / grandTotal) * 100;
    });

    return summaries;
  }, [monthlyExpenses]);

  // 削除処理
  const handleDelete = async (expenseId: string) => {
    if (window.confirm("この支出を削除してもよろしいですか？")) {
      try {
        await deleteExpense(expenseId);
      } catch (err) {
        setError("削除中にエラーが発生しました");
        console.error(err);
      }
    }
  };

  // 編集ダイアログを開く
  const handleEditClick = (expense: Expense) => {
    setEditingExpense(expense);
    setEditFormData({
      amount: expense.amount.toString(),
      category: expense.category,
      timeRange: expense.timeRange || "",
      memo: expense.memo || "",
    });
  };

  // 編集を保存
  const handleSaveEdit = async () => {
    if (!editingExpense) return;

    try {
      const updatedExpense: Expense = {
        ...editingExpense,
        amount: Number(editFormData.amount),
        category: editFormData.category,
        timeRange: editFormData.timeRange,
        memo: editFormData.memo,
      };
      await updateExpense(updatedExpense);
      setEditingExpense(null);
    } catch (err) {
      setError("更新中にエラーが発生しました");
      console.error(err);
    }
  };

  // 日別レポートのコンテンツ
  const renderDailyReport = () => (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          日別支出レポート
        </Typography>
        {/* 日付選択 */}
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={() => handleDateChange(-1)}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography>
            {selectedDate.toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
          <IconButton onClick={() => handleDateChange(1)}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* 時間帯別支出 */}
        {Object.entries(dailyData).map(([mealTime, data]) => (
          <Box key={mealTime} sx={{ mb: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>
                {timeRangeLabels[mealTime as keyof typeof timeRangeLabels]}
              </Typography>
              <Typography>¥{data.amount.toLocaleString()}</Typography>
            </Box>
            <ProgressBar>
              <ProgressFill width={`${(data.amount / totalDaily) * 100}%`} />
            </ProgressBar>
          </Box>
        ))}

        {/* 合計 */}
        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Typography color="text.secondary">合計</Typography>
          <Typography variant="h5">¥{totalDaily.toLocaleString()}</Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );

  // 自炊分析のコンテンツ
  const renderCookingAnalysis = () => (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          自炊分析
        </Typography>
        {Object.entries(categorySummaries)
          .filter(([category]) => category === "home_cooking")
          .map(([category, summary]) => (
            <Box key={category} sx={{ mb: 3 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    bgcolor: "#f5f5f5",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <KitchenIcon />
                </Box>
                <Box>
                  <Typography>自炊</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {summary.count}件の記録
                  </Typography>
                </Box>
                <Box sx={{ ml: "auto", textAlign: "right" }}>
                  <Typography>¥{summary.total.toLocaleString()}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    平均: ¥
                    {Math.round(summary.total / summary.count).toLocaleString()}
                    /食
                  </Typography>
                </Box>
              </Box>
              <ProgressBar sx={{ mt: 1 }}>
                <ProgressFill width={`${summary.percentage}%`} />
              </ProgressBar>
            </Box>
          ))}
      </CardContent>
    </StyledCard>
  );

  return (
    <Box sx={{ p: 2, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

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

      {/* サマリーカード */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <StyledCard>
            <CardContent>
              <Typography color="text.secondary" variant="subtitle2">
                今月の総支出
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                ¥{totalAmount.toLocaleString()}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={6}>
          <StyledCard>
            <CardContent>
              <Typography color="text.secondary" variant="subtitle2">
                今月の浪費
              </Typography>
              <Typography variant="h5" sx={{ mt: 1, color: "#ff4444" }}>
                ¥{wasteExpenses.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                外食・間食・飲み会・コンビニ
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* タブ */}
      <StyledCard>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              color: "#666",
              "&.Mui-selected": {
                color: "#0891b2",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#0891b2",
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.id} label={tab.label} />
          ))}
        </Tabs>
      </StyledCard>

      <TabPanel value={activeTab} index={0}>
        {/* 時間帯別支出 */}
        <StyledCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              時間帯別支出比較
            </Typography>
            <Box sx={{ mt: 2 }}>
              {Object.entries(timeRangeData).map(([timeRange, data]) => (
                <Box key={timeRange} sx={{ mb: 3 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography>
                      {timeRangeLabels[
                        timeRange as keyof typeof timeRangeLabels
                      ] || "未分類"}
                    </Typography>
                    <Box textAlign="right">
                      <Typography>¥{data.amount.toLocaleString()}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        平均: ¥
                        {Math.round(data.amount / data.count).toLocaleString()}
                        /食
                      </Typography>
                    </Box>
                  </Box>
                  <ProgressBar>
                    <ProgressFill
                      width={`${(data.amount / totalAmount) * 100}%`}
                    />
                  </ProgressBar>
                </Box>
              ))}
            </Box>
          </CardContent>
        </StyledCard>

        {/* 月間支出履歴 */}
        <StyledCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              月間合計
            </Typography>
            <Typography color="primary" variant="h4" sx={{ mb: 2 }}>
              ¥{totalAmount.toLocaleString()}
            </Typography>

            <Box sx={{ width: "100%", overflow: "auto" }}>
              <Box sx={{ minWidth: 600 }}>
                <Box
                  display="grid"
                  gridTemplateColumns="1fr 1fr 1fr 1fr 100px"
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    py: 1,
                    color: "text.secondary",
                  }}
                >
                  <Typography>日付</Typography>
                  <Typography>時間帯</Typography>
                  <Typography>カテゴリー</Typography>
                  <Typography align="right">金額</Typography>
                  <Typography align="center">操作</Typography>
                </Box>

                {monthlyExpenses.map((expense) => (
                  <Box
                    key={expense.id}
                    display="grid"
                    gridTemplateColumns="1fr 1fr 1fr 1fr 100px"
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      py: 1,
                    }}
                  >
                    <Typography>
                      {new Date(expense.date).toLocaleDateString("ja-JP")}
                    </Typography>
                    <Typography>
                      {timeRangeLabels[
                        expense.timeRange as keyof typeof timeRangeLabels
                      ] || "未分類"}
                    </Typography>
                    <Typography>{categoryLabels[expense.category]}</Typography>
                    <Typography align="right">
                      ¥{expense.amount.toLocaleString()}
                    </Typography>
                    <Box display="flex" justifyContent="center" gap={1}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditClick(expense)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(expense.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </CardContent>
        </StyledCard>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        {renderDailyReport()}
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        {renderCookingAnalysis()}
      </TabPanel>

      {/* 編集ダイアログ */}
      <Dialog open={!!editingExpense} onClose={() => setEditingExpense(null)}>
        <DialogTitle>支出の編集</DialogTitle>
        <DialogContent>
          <TextField
            label="金額"
            type="number"
            fullWidth
            margin="normal"
            value={editFormData.amount}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                amount: e.target.value,
              })
            }
          />
          <TextField
            select
            label="カテゴリー"
            fullWidth
            margin="normal"
            value={editFormData.category}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                category: e.target.value,
              })
            }
          >
            {Object.entries(categoryLabels).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="時間帯"
            fullWidth
            margin="normal"
            value={editFormData.timeRange}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                timeRange: e.target.value,
              })
            }
          >
            {Object.entries(timeRangeLabels).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="メモ"
            fullWidth
            margin="normal"
            value={editFormData.memo}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                memo: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingExpense(null)}>キャンセル</Button>
          <Button onClick={handleSaveEdit} variant="contained">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
