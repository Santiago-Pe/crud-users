import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import LayoutOverlay from "../layout/layoutOverlay";
import { PageNotFound } from "../pages";

const UsersPage = lazy(() => import("../pages/users/usersPage"));
const HomePage = lazy(() => import("../pages/home/homePage"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutOverlay />}>
        <Route index element={<HomePage />} />
        <Route path="lista-usuarios" element={<UsersPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
