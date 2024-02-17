// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout"; // Import the Layout component
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Login from "./components/Login";
import OTPVerification from "./components/OTPVerification";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          {" "}
          {/* Wrap your routes with the Layout component */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route
              exact
              path="/reset-password/:token"
              element={<ResetPassword />}
            />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="/otp-verification" element={<OTPVerification />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
