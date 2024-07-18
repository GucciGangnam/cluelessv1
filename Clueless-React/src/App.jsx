import { useState, useEffect } from 'react'
import './App.css'


// Pages 
import { Landing } from './Landing';
import { GamePage } from './GamePage'
import { Timer } from './Timer';


function App() {

  // GAME STATE Landing, Game, Finish
  const [gameState, setGameState] = useState("Landing")
  // GAME SETTINGS //
  const [difficulty, setDifficulty] = useState(4);


  return (
    <div className='App'>
      {gameState === "Landing" && <Landing difficulty={difficulty} setDifficulty={setDifficulty} setGameState={setGameState} />}
      {gameState === "Game" && <GamePage difficulty={difficulty} setGameState={setGameState} />}
    </div>
  )
}

export default App
