import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LevelThree from "./pages/LevelThree";
import LevelOne from "./pages/levelOne";
import LevelTwo from "./pages/levelTwo";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/game" element={<Game />} />
          <Route path="/game/level1" element={<LevelOne />} />
          <Route path="/game/level2" element={<LevelTwo />} />
          <Route path="/game/level3" element={<LevelThree />} />
          <Route path="/gameover/:status/:level" element={<GameOver />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
