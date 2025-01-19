import { Button, Snackbar, Alert } from "@mui/material";

interface ExpenseSubmitProps {
  onSubmit: () => void;
  showSuccess: boolean;
  onCloseSuccess: () => void;
}

export const ExpenseSubmit = ({
  onSubmit,
  showSuccess,
  onCloseSuccess,
}: ExpenseSubmitProps) => {
  return (
    <>
      <Button
        variant="contained"
        onClick={onSubmit}
        fullWidth
        sx={{
          backgroundColor: "#009688",
          color: "white",
          py: 1.5,
          "&:hover": {
            backgroundColor: "#00897b",
          },
        }}
      >
        支出を記録
      </Button>

      {/* 成功メッセージ */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={onCloseSuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={onCloseSuccess}>
          支出を記録しました
        </Alert>
      </Snackbar>
    </>
  );
};
