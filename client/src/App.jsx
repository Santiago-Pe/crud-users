import { Suspense } from "react";

import { Loader } from "./components";
import AppRoutes from "./routes/appRoute";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader hasOpacity={false} />}>
        <AppRoutes />
      </Suspense>
    </div>
  );
}

export default App;
