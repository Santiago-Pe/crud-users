import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LayoutOverlay from "../layout/layoutOverlay";
import { PageNotFound } from "../pages";

const UsersPage = lazy(() => import("../pages/users/usersPage")); // Ajusta según tu estructura de proyecto

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutOverlay />}>
        <Route index element={<UsersPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
