import React from "react";
import Home from "./pages/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPanel from "./pages/Admin/AdminPanel";
import Getusers from "./pages/Admin/Getusers";
import AddRoom from "./pages/Room/AddRoom";
import RoomList from "./pages/Room/RoomList";
import DisplayRoom from "./pages/Users/DisplayRoom";
import AddProviders from "./pages/Providers/AddProviders";
import ProviderList from "./pages/Providers/ProviderList";

function AllRoutes() {
  const authtoken = localStorage.getItem("authtoken");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={authtoken ? <AdminPanel /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/getusers/:org_name/:org_code"
        element={authtoken ? <Getusers /> : <Navigate to="/login" />}
      />
      <Route path="/admin/addroom" element={<AddRoom />} />
      <Route path="/admin/addproviders" element={<AddProviders />} />
      <Route path="/admin/getrooms" element={<RoomList />} />
      <Route path="/admin/getproviders" element={<ProviderList />} />
      <Route path="/room" element={<DisplayRoom />} />
    </Routes>
  );
}

export default AllRoutes;
