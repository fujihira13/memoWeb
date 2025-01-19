import { Box, Typography, CardContent, Card } from "@mui/material";
import styled from "@emotion/styled";

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
