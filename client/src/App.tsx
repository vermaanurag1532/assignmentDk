import React from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "pages/Home";
import { useAutoLogout } from "hooks/useAutoLogout";
import Auth from "pages/Auth";
import ProtectedRoute from "components/ProtectedRoute";

const App = () => {
  useAutoLogout();

  return (
    <>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </>
  );
};

export default App;
