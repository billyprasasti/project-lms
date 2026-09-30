import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import BerandaPage from "./components/BerandaPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/beranda" element={<BerandaPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
