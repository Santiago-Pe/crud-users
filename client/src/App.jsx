import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "./components";
import LayoutOverlay from "./layout/layoutOverlay";

const UsersPage = lazy(() => import("./pages/users/usersPage")); // Ajusta según tu estructura de proyecto

const renderRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutOverlay />}>
        <Route index element={<UsersPage />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>{renderRoutes()}</Suspense>
    </div>
  );
}

export default App;
