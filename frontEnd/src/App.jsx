import Home from "./pages/home/Home";
import Mudas from "./pages/mudas/Mudas";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/mudas" element={<Mudas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
