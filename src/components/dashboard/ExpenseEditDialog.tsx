import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { ExpenseCategory, MealTime } from "../../types";
import { EditFormData } from "../../types/props";

interface ExpenseEditDialogProps {
  open: boolean;
  formData: {
    amount: string;
    category: ExpenseCategory;
    mealTime: MealTime;
    memo: string;
  };
  categoryLabels: Record<string, string>;
  timeRangeLabels: Record<string, string>;
  onClose: () => void;
  onSave: () => Promise<void>;
  onFormChange: (
    field: "amount" | "category" | "mealTime" | "memo",
    value: string | ExpenseCategory | MealTime
  ) => void;
}

const categories: { value: ExpenseCategory; label: string }[] = [
  { value: "grocery", label: "スーパー" },
  { value: "eating_out", label: "外食" },
  { value: "snack", label: "間食" },
  { value: "drinking", label: "飲み会" },
  { value: "convenience", label: "コンビニ" },
  { value: "other", label: "その他" },
];

const timeRangeLabels: Record<MealTime, string> = {
  breakfast: "朝食",
  lunch: "昼食",
  dinner: "夕食",
  snack: "間食",
};

export const ExpenseEditDialog = ({
  open,
  formData,
  onClose,
  onSave,
  onFormChange,
}: ExpenseEditDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>支出を編集</DialogTitle>
      <DialogContent>
        <TextField
          label="金額"
          type="number"
          fullWidth
          margin="normal"
          value={formData.amount}
          onChange={(e) => onFormChange("amount", e.target.value)}
        />
        <TextField
          select
          label="カテゴリー"
          fullWidth
          margin="normal"
          value={formData.category}
          onChange={(e) =>
            onFormChange("category", e.target.value as ExpenseCategory)
          }
        >
          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="時間帯"
          fullWidth
          margin="normal"
          value={formData.mealTime}
          onChange={(e) => onFormChange("mealTime", e.target.value as MealTime)}
        >
          {Object.entries(timeRangeLabels).map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="メモ"
          fullWidth
          margin="normal"
          value={formData.memo}
          onChange={(e) => onFormChange("memo", e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={onSave} variant="contained">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};
