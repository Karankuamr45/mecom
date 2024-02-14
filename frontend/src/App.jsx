// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Login from "./components/Login";
import OTPVerification from "./components/OTPVerification";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <div className="container mx-auto mt-4">
            <Routes>
              {/* <Route path="/"  element={<Home />} /> */}
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<Home />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/otp-verification" element={<OTPVerification />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
