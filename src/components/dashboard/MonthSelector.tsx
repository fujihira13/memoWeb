import { Typography, CardContent, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { StyledCard } from "./styles";

interface MonthSelectorProps {
  selectedMonth: Date;
  onMonthChange: (newDate: Date) => void;
  variant?: "h6" | "subtitle1";
}

export const MonthSelector = ({
  selectedMonth,
  onMonthChange,
  variant = "h6",
}: MonthSelectorProps) => {
  return (
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
            onMonthChange(newDate);
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant={variant}>
          {selectedMonth.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
          })}
        </Typography>
        <IconButton
          onClick={() => {
            const newDate = new Date(selectedMonth);
            newDate.setMonth(newDate.getMonth() + 1);
            onMonthChange(newDate);
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </CardContent>
    </StyledCard>
  );
};
