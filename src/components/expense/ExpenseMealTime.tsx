import {
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  styled,
} from "@mui/material";
import { MealTime } from "../../types";

// スタイル付きのトグルボタン
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  flex: 1,
  padding: "8px",
  backgroundColor: "#f5f5f5",
  "&.Mui-selected": {
    backgroundColor: "#009688",
    color: "white",
    "&:hover": {
      backgroundColor: "#00897b",
    },
  },
}));

// 食事の時間帯の定義
const mealTimes: { value: MealTime; label: string }[] = [
  { value: "breakfast", label: "朝食" },
  { value: "lunch", label: "昼食" },
  { value: "dinner", label: "夕食" },
  { value: "snack", label: "間食" },
];

interface ExpenseMealTimeProps {
  mealTime: MealTime;
  onMealTimeChange: (value: MealTime) => void;
}

export const ExpenseMealTime = ({
  mealTime,
  onMealTimeChange,
}: ExpenseMealTimeProps) => {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        食事の時間帯 <span style={{ color: "red" }}>*</span>
      </Typography>
      <ToggleButtonGroup
        value={mealTime}
        exclusive
        onChange={(_, value) => onMealTimeChange(value)}
        fullWidth
        sx={{ flexWrap: "wrap", gap: 1 }}
      >
        {mealTimes.map((time) => (
          <StyledToggleButton key={time.value} value={time.value}>
            {time.label}
          </StyledToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
