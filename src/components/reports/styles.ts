import { Box, Card } from "@mui/material";
import styled from "@emotion/styled";

// レポートカードの共通スタイル
export const StyledCard = styled(Card)`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

// プログレスバーのベース部分
export const ProgressBar = styled(Box)`
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  margin: 8px 0;
`;

// プログレスバーの塗りつぶし部分
export const ProgressFill = styled(Box)<{ width: string }>`
  height: 100%;
  background-color: #2196f3;
  border-radius: 2px;
  width: ${(props) => props.width};
`;
