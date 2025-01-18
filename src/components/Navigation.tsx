import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import styled from "@emotion/styled";

const StyledBottomNavigation = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const navItems = [
  { path: "/", label: "ダッシュボード", icon: <DashboardIcon /> },
  { path: "/report", label: "レポート", icon: <AssessmentIcon /> },
  { path: "/expense", label: "支出を記録", icon: <AddCircleIcon /> },
  { path: "/settings", label: "設定", icon: <SettingsIcon /> },
];

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledBottomNavigation
      value={location.pathname}
      onChange={(_, newValue) => navigate(newValue)}
    >
      {navItems.map((item) => (
        <BottomNavigationAction
          key={item.path}
          label={item.label}
          value={item.path}
          icon={item.icon}
        />
      ))}
    </StyledBottomNavigation>
  );
};
