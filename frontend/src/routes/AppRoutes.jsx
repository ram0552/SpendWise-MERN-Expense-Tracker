import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import Transactions from "../pages/transactions/Transactions";

import Budgets from "../pages/budgets/Budgets";

import Profile from "../pages/profile/Profile";

import ProtectedRoute from "./ProtectedRoute";

import ResetPassword from "../pages/auth/ResetPassword";

import ForgotPassword from "../pages/auth/ForgotPassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/budgets"
        element={
          <ProtectedRoute>
            <Budgets />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <ForgotPassword />
        }
      />

        <Route
          path="/reset-password/:token"
          element={
            <ResetPassword />
          }
        />
    </Routes>
  );
};

export default AppRoutes;