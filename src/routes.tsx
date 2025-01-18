import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Report } from "./pages/Report";
import { Expense } from "./pages/Expense";
import { Settings } from "./pages/Settings";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};
