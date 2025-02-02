import { useNavigate, useLocation } from "react-router-dom";
import {
  List,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  ListItemButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";

const navItems = [
  { path: "/", label: "ホーム", icon: <DashboardIcon /> },
  { path: "/report", label: "レポート", icon: <AssessmentIcon /> },
  { path: "/expense", label: "支出記録", icon: <AddCircleIcon /> },
  { path: "/settings", label: "設定", icon: <SettingsIcon /> },
];

interface NavigationProps {
  orientation: "horizontal" | "vertical";
}

export const Navigation = ({ orientation }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (orientation === "vertical") {
    return (
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    );
  }

  return (
    <BottomNavigation
      value={location.pathname}
      onChange={(_, newValue) => navigate(newValue)}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: "0 -1px 3px rgba(0, 0, 0, 0.05)",
        borderTop: "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      {navItems.map((item) => (
        <BottomNavigationAction
          key={item.path}
          label={item.label}
          value={item.path}
          icon={item.icon}
        />
      ))}
    </BottomNavigation>
  );
};
