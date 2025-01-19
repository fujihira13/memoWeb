import { Box, Typography, CardContent, Stack } from "@mui/material";
import { StyledCard, ProgressBar, ProgressFill } from "./styles";
import { categoryIcons, categoryLabels } from "./constants";

interface CategorySummary {
  total: number;
  count: number;
  percentage: number;
}

interface CategoryExpenseCardProps {
  categorySummaries: Record<string, CategorySummary>;
}

export const CategoryExpenseCard = ({
  categorySummaries,
}: CategoryExpenseCardProps) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          カテゴリー別支出
        </Typography>
        <Stack spacing={2}>
          {Object.entries(categorySummaries)
            .sort(([, a], [, b]) => b.total - a.total)
            .map(([category, summary]) => {
              const Icon =
                categoryIcons[category as keyof typeof categoryIcons];
              return (
                <Box key={category}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Icon color="action" />
                    <Box flexGrow={1}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography>{categoryLabels[category]}</Typography>
                        <Typography>
                          ¥{summary.total.toLocaleString()}
                        </Typography>
                      </Box>
                      <ProgressBar>
                        <ProgressFill width={`${summary.percentage}%`} />
                      </ProgressBar>
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Stack>
      </CardContent>
    </StyledCard>
  );
};
