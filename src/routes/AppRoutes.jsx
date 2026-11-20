
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Medicines from "../pages/Medicines";
import AddMedicine from "../pages/AddMedicine";
import EditMedicine from "../pages/EditMedicine";
import MedicineDetails from "../pages/MedicineDetails";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Favorites from "../pages/Favorites";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/medicines"
        element={
          <ProtectedRoute>
            <Medicines />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-medicine"
        element={
          <ProtectedRoute>
            <AddMedicine />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-medicine/:id"
        element={
          <ProtectedRoute>
            <EditMedicine />
          </ProtectedRoute>
        }
      />

      <Route
        path="/medicine/:id"
        element={
          <ProtectedRoute>
            <MedicineDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

      <Route
        path="/logout"
        element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;
