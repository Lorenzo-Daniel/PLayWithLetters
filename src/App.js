import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import PlayWithLetter from "./Pages/PlayWithLetters";
import "animate.css";
import Navbar from "./Componets/Navbar";
import PlayWithNumbers from "./Pages/PlayWithNumbers";
function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/play-with-letters" element={<PlayWithLetter />} />
        <Route exact path="/play-with-numbers" element={<PlayWithNumbers />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
