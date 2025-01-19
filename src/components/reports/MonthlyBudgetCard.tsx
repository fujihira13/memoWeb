import { Typography, CardContent } from "@mui/material";
import { StyledCard } from "./styles";

interface MonthlyBudgetCardProps {
  monthlyBudget: number;
}

export const MonthlyBudgetCard = ({
  monthlyBudget,
}: MonthlyBudgetCardProps) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">
          月間予算
        </Typography>
        <Typography variant="h4" sx={{ my: 1 }}>
          ¥{monthlyBudget.toLocaleString()}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};
