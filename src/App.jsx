import { useState } from "react"
import GameBorad from "./components/GameBorad"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

const PLAYERS = {X:'Player 1',O: 'Player 2'};


const deriveActivePlayer = (gameTurns) =>{
  let currentPlayer = 'X';
      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O'
      }
      return currentPlayer;
}


const deriveWinner = (gameBoard,player) =>{
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol  = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol  = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    
    
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = player[firstSquareSymbol];
    }

  }
  return winner;
}


const deriveGameBoard = (gameTurns) =>{
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];
  for(const turn of gameTurns){
      const {square,player} = turn;
      const {row,col} = square;
      gameBoard[row][col] = player;
  }

  return gameBoard;
}


function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [player, setPlayer] = useState(PLAYERS);
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner=deriveWinner(gameBoard,player);
  const hasDraw = gameTurns.length ===9 && !winner;


  const handelSelectSquare = (rowIndex,colIndex) =>{
    setGameTurns(prevTurn =>{
      const currentPlayer = deriveActivePlayer(prevTurn);
      const updatedTurns = [{square:{row:rowIndex,col:colIndex},player:currentPlayer},...prevTurn];
      return updatedTurns;
    });
  }



  const handleRestart = () =>{
    setGameTurns([]);
  }

  const handlePlayerNameCHange = (symbol,newName) =>{
    setPlayer(prevPlayer => {
      return {...prevPlayer,[symbol]:newName}
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player ">
          <Player nameCHange={handlePlayerNameCHange} initialName={PLAYERS.X} symbol={'X'} isActive={activePlayer === 'X'}/>
          <Player nameCHange={handlePlayerNameCHange} initialName={PLAYERS.Y} symbol={'O'} isActive={activePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver onRestart={handleRestart} winner={winner}/> }
        <GameBorad onSelectSquare={handelSelectSquare} board={gameBoard}/>
      </div>
      <Log turns ={gameTurns}/>
    </main>
  )
}

export default App
