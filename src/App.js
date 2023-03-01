import "./App.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddReservation from "./pages/AddReservation";
import AllReservations from "./pages/AllReservations";
import Dashboard from "./pages/Dashboard";
import RegisterUser from "./pages/RegisterUser";

import StartingPage from "./pages/StartingPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-reservation" element={<AddReservation />} />
        <Route path="/all-reservations" element={<AllReservations />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegisterUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
