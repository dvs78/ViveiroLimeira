import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Clientes from "./pages/Clientes";
import Mudas from "./pages/mudas";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/mudas" element={<Mudas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
