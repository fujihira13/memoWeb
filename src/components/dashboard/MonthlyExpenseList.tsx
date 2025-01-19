import { Box, Typography, CardContent, Card, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Expense } from "../../types/expense";
import { StyledCard, ProgressBar, ProgressFill } from "./styles";

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
  return (
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
        </Box>
      </CardContent>
    </StyledCard>
  );
};
