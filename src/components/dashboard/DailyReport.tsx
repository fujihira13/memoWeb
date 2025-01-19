import { Box, Typography, CardContent, IconButton, Card } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

interface DailyReportProps {
  selectedDate: Date;
  handleDateChange: (increment: number) => void;
  dailyData: Record<string, { amount: number }>;
  timeRangeLabels: Record<string, string>;
  totalDaily: number;
}

export const DailyReport = ({
  selectedDate,
  handleDateChange,
  dailyData,
  timeRangeLabels,
  totalDaily,
}: DailyReportProps) => {
  return (
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
};
