import {
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  styled,
} from "@mui/material";
import { ExpenseCategory } from "../../types";

// スタイル付きのトグルボタン
const StyledToggleButton = styled(ToggleButton)(() => ({
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

// カテゴリーの定義
const categories = [
  { value: "grocery" as ExpenseCategory, label: "スーパー" },
  { value: "eating_out" as ExpenseCategory, label: "外食" },
  { value: "snack" as ExpenseCategory, label: "間食" },
  { value: "drinking" as ExpenseCategory, label: "飲み会" },
  { value: "convenience" as ExpenseCategory, label: "コンビニ" },
  { value: "other" as ExpenseCategory, label: "その他" },
];

interface ExpenseFormInputsProps {
  amount: string;
  category: ExpenseCategory;
  onAmountChange: (value: string) => void;
  onCategoryChange: (value: ExpenseCategory) => void;
}

export const ExpenseFormInputs = ({
  amount,
  category,
  onAmountChange,
  onCategoryChange,
}: ExpenseFormInputsProps) => {
  return (
    <>
      {/* 金額入力 */}
      <TextField
        label="金額を入力"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        type="number"
        fullWidth
      />

      {/* カテゴリー選択 */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          カテゴリー
        </Typography>
        <ToggleButtonGroup
          value={category}
          exclusive
          onChange={(_, value) => onCategoryChange(value)}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // 2列グリッド
            gap: 1,
            width: "100%",
          }}
        >
          {categories.map((cat) => (
            <StyledToggleButton
              key={cat.value}
              value={cat.value}
              sx={{
                padding: "12px 8px",
                minHeight: "48px",
              }}
            >
              {cat.label}
            </StyledToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </>
  );
};
