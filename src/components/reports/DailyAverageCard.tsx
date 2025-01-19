import { Typography, CardContent } from "@mui/material";
import { StyledCard } from "./styles";

interface DailyAverageCardProps {
  averagePerDay: number;
  budget: number;
}

export const DailyAverageCard = ({
  averagePerDay,
  budget,
}: DailyAverageCardProps) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">
          1日あたりの平均
        </Typography>
        <Typography variant="h4" sx={{ my: 1 }}>
          ¥{averagePerDay.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          目標: ¥{budget.toLocaleString()}/日
        </Typography>
      </CardContent>
    </StyledCard>
  );
};
