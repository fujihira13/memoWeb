import {
  Box,
  Typography,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Expense } from "../../types/expense";
import { StyledCard } from "./styles";

interface MonthlyExpenseListProps {
  monthlyExpenses: Expense[];
  totalAmount: number;
  timeRangeLabels: Record<string, string>;
  categoryLabels: Record<string, string>;
  onEditClick: (expense: Expense) => void;
  onDeleteClick: (id: string) => void;
}

export const MonthlyExpenseList = ({
  monthlyExpenses,
  totalAmount,
  timeRangeLabels,
  categoryLabels,
  onEditClick,
  onDeleteClick,
}: MonthlyExpenseListProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          月間合計
        </Typography>
        <Typography color="primary" variant="h4" sx={{ mb: 2 }}>
          ¥{totalAmount.toLocaleString()}
        </Typography>

        {/* モバイル表示 */}
        {!isDesktop && (
          <Box>
            {monthlyExpenses.map((expense) => (
              <Box
                key={expense.id}
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  py: 2,
                }}
              >
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(expense.date).toLocaleDateString("ja-JP")}
                  </Typography>
                  <Typography variant="h6">
                    ¥{expense.amount.toLocaleString()}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>{timeRangeLabels[expense.mealTime]}</Typography>
                  <Typography>{categoryLabels[expense.category]}</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onEditClick(expense)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDeleteClick(expense.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* デスクトップ表示 */}
        {isDesktop && (
          <Box>
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
                <Typography>{timeRangeLabels[expense.mealTime]}</Typography>
                <Typography>{categoryLabels[expense.category]}</Typography>
                <Typography align="right">
                  ¥{expense.amount.toLocaleString()}
                </Typography>
                <Box display="flex" justifyContent="center" gap={1}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onEditClick(expense)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDeleteClick(expense.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};
