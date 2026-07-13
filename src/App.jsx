import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { LeagueDataProvider } from "./context/LeagueDataContext.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

import Home from "./pages/Home.jsx";
import News from "./pages/News.jsx";
import Games from "./pages/Games.jsx";
import Standings from "./pages/Standings.jsx";
import Teams from "./pages/Teams.jsx";

function App() {
  return (
    <LeagueDataProvider>
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
    </LeagueDataProvider>
  );
}

export default App;