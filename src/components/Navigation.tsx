import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";

const navItems = [
  { path: "/", label: "ダッシュボード", icon: <DashboardIcon /> },
  { path: "/report", label: "レポート", icon: <AssessmentIcon /> },
  { path: "/expense", label: "支出を記録", icon: <AddCircleIcon /> },
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
          <ListItem
            button
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
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
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
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
