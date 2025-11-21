import "leaflet/dist/leaflet.css";

import { Navigate, Route, Routes } from "react-router-dom";

import { Navbar } from "@/components/Navbar";
import { ContactPage } from "@/pages/ContactPage";
import { ProductMenuPage } from "@/pages/ProductMenuPage";
import { StoreLocatorPage } from "@/pages/StoreLocatorPage";

function App() {
  return (
    <div className="min-h-screen bg-[#fff7f5] text-[#1a1a1a]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/store" element={<StoreLocatorPage />} />
        <Route path="/products" element={<ProductMenuPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </div>
  );
}

export default App;
