import React from "react";
import { BrowserRouter , Routes , Route , Navigate } from "react-router-dom";
import Navbar from "./pages/Header/Header";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Notfound from "./pages/Not Found/Notfound";
import ProtectedRoute from "./Components/ProtectedRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route
           path="/"
           element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
           }
        />
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="*" element={<Notfound/>}/>
        
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
