import { BrowserRouter, Navigate, Route, Routes  } from "react-router-dom";

import './App.css';
import SnakeGame from "./Pages/snakeGame";
import { DinoGame } from "./Pages/dinoGame";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route  path="/" element={ <Navigate replace to="/dino" />} />
        <Route  path="/sanke" element={ <SnakeGame/>} />
        <Route  path="/dino" element={ <DinoGame/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
