import React, { useState } from 'react';
import '../index.css';

function Ristinolla() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [clickCount, setClickCount] = useState(0);
  const [voitto, setVoitto] = useState(null);

  const handleLautaClick = (index) => {
    if (board[index] || voitto) return; 
    const newClick = clickCount + 1;
    setClickCount(newClick);

    const newBoard = board.slice();
    newBoard[index] = newClick % 2 === 0 ? 'O' : 'X';
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setVoitto(winner);
    }
  };

  const calculateWinner = (board) => {
    const voittolinja = [
      [0,1,2], [3,4,5], [6,7,8], //rivit
      [0,4,8], [2,4,6],  //sivuttaislinja
      [0,3,6],[1,4,7], [2,5,8] //pystyrivit
    ];

  for(let linja of voittolinja) {
    const [rivit, pystyrivit, sivuttaislinja] = linja;

    if(board[rivit] && board[rivit] === board[pystyrivit] && board[rivit] === board[sivuttaislinja]){
      return board[rivit];
    }
  }
  return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setClickCount(0);
    setVoitto(null);
  };

  const renderButton = (index) => (
    <button className='boxit' onClick={() => handleLautaClick(index)}>
      {board[index]}
    </button>
  );

  return (
    <div id='lauta'>
      <div>
        {renderButton(0)}
        {renderButton(1)}
        {renderButton(2)}
      </div>
      <div>
        {renderButton(3)}
        {renderButton(4)}
        {renderButton(5)}
      </div>
      <div>
        {renderButton(6)}
        {renderButton(7)}
        {renderButton(8)}
      </div>
      <div id='voittaja'>
      {voitto && <p id='voittajatxt'>Voittaja: {voitto}</p>}
      <button id='reset' onClick={resetGame}>Reset Game</button>
    </div>
    </div>
  );
}

export default Ristinolla;
