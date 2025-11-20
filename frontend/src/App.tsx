import "leaflet/dist/leaflet.css";

import { StoreLocatorPage } from "@/pages/StoreLocatorPage";

function App() {
  return (
    <div className="min-h-screen  bg-[#dff1ff]  text-[#1a1a1a]">
      <div className="container mx-auto min-h-screen py-8">
        <StoreLocatorPage />
      </div>
    </div>
  );
}

export default App;
