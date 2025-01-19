import { Typography, CardContent } from "@mui/material";
import { StyledCard } from "./styles";

interface MonthlyExpenseCardProps {
  total: number;
  lastMonthTotal: number;
}

export const MonthlyExpenseCard = ({
  total,
  lastMonthTotal,
}: MonthlyExpenseCardProps) => {
  return (
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
  );
};
