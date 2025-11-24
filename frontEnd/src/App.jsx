import Home from "./pages/home/Home";
import Mudas from "./pages/mudas/Mudas";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toast from "./components/Toast";

function App() {
  return (
    <BrowserRouter>
      <Toast /> {/* ✅ Container dos toasts */}
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/mudas" element={<Mudas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
