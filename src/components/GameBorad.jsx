import React, { useState } from 'react'




const GameBorad = ({onSelectSquare,board}) => {


    // const [gameBoard,setGameBoard]=useState(initialGameBoard);

    // const handleGameBoard = (rowIndex,colIndex) =>{
    //     setGameBoard(prevGameBoard => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray=>[...innerArray])]
    //         updatedBoard[rowIndex][colIndex] = activePlayer;
    //         return updatedBoard;
    //     })
    //     onSelectSquare();
    // }

  return (
    <ol id="game-board">
        {board.map((row,rowIndex)=>(
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol,colIndex)=>(
                        <li key={colIndex}> <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol !==null}>{playerSymbol}</button> </li>
                    ))}
                </ol>
            </li>
        ))}
    </ol>
  )
}

export default GameBorad