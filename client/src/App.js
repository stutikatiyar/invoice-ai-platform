import "./styles/toast.css";
import "./styles/theme.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";

import Dashboard from "./pages/Dashboard";
import UploadInvoice from "./pages/UploadInvoice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadInvoice />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />

    </BrowserRouter>
  );
}

export default App;
