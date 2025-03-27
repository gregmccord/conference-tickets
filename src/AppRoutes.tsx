// Manage all routes for the app
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./Routes";
import { FormDataProvider } from "./contexts/FormDataContext";
import HomePage from "./pages/HomePage";
import TicketPage from "./pages/TicketPage";

const AppRoutes = () => {
  return (
    <FormDataProvider>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.TEST} element={<TicketPage />} />
        {/* Catch-all route with redirect to home page */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </FormDataProvider>
  );
};

export default AppRoutes;
