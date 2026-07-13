import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import News from "./pages/News";
import Games from "./pages/Games";
import Standings from "./pages/Standings";
import Teams from "./pages/Teams";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/games" element={<Games />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;