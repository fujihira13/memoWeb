import { Box, Typography, CardContent, Card } from "@mui/material";
import { StyledCard, ProgressBar, ProgressFill } from "./styles";

interface TimeRangeReportProps {
  timeRangeData: Record<string, { amount: number; count: number }>;
  timeRangeLabels: Record<string, string>;
  totalAmount: number;
}

export const TimeRangeReport = ({
  timeRangeData,
  timeRangeLabels,
  totalAmount,
}: TimeRangeReportProps) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          時間帯別支出
        </Typography>
        <Box>
          {Object.entries(timeRangeData).map(([timeRange, data]) => (
            <Box key={timeRange} sx={{ mb: 3 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>
                  {timeRangeLabels[timeRange as keyof typeof timeRangeLabels] ||
                    "未分類"}
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
                <ProgressFill width={`${(data.amount / totalAmount) * 100}%`} />
              </ProgressBar>
            </Box>
          ))}
        </Box>
      </CardContent>
    </StyledCard>
  );
};
