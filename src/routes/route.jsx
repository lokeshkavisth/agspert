import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/ui/loader";
import { useAuth } from "../hooks/useAuth";

const Home = React.lazy(() => import("../pages/home"));
const Login = React.lazy(() => import("../pages/login"));
const ActiveSales = React.lazy(() => import("../pages/activeSales"));
const CompletedSales = React.lazy(() => import("../pages/completedSales"));

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/active-sales" /> : element;
};

const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Home />} />}>
          <Route
            path="active-sales"
            element={<PrivateRoute element={<ActiveSales />} />}
          />
          <Route
            path="completed-sales"
            element={<PrivateRoute element={<CompletedSales />} />}
          />
        </Route>
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
