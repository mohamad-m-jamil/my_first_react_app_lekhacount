import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [names, setNames] = useState([]);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [rounds, setRounds] = useState(0);

  // Refs for input fields
  const scoreInputs = useRef([]);

  const handleNamesSubmit = (submittedNames) => {
    setNames(submittedNames);
    setScores([0, 0, 0, 0]);
    setGameStarted(true);
    setGameEnded(false);
    setRounds(1);
  };

  const handleScoreChange = (e, index) => {
    if (gameEnded) return;

    const newScore = parseInt(e.target.value) || 0;
    let newScores = [...scores];
    newScores[index] += newScore;
    setScores(newScores);

    if (newScores[index] > 200) {
      setGameEnded(true);
      alert(`${names[index]} has exceeded 200 points! Game Over.`);
    }
  };

  const handleNewRound = () => {
    if (gameEnded) return;
    
    // Reset input fields to null (empty)
    scoreInputs.current.forEach((input) => {
      input.value = '';
    });

    setRounds(rounds + 1);
  };

  const handleEndGame = () => {
    setGameEnded(true);
    const { winner, loser } = determineWinnerLoser();
    alert(`Game Over! Winner: ${winner} - Loser: ${loser}`);
  };

  const determineWinnerLoser = () => {
    let minScore = Math.min(...scores);
    let maxScore = Math.max(...scores);
    let winner = names[scores.indexOf(minScore)];
    let loser = names[scores.indexOf(maxScore)];
    return { winner, loser };
  };

  const handleRestartGame = () => {
    setNames([]);
    setScores([0, 0, 0, 0]);
    setGameStarted(false);
    setGameEnded(false);
    setRounds(0);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <div className="name-input">
          <h1>Enter Players' Names</h1>
          <input type="text" id="player1" placeholder="Player 1" />
          <input type="text" id="player2" placeholder="Player 2" />
          <input type="text" id="player3" placeholder="Player 3" />
          <input type="text" id="player4" placeholder="Player 4" />
          <button
            onClick={() => {
              const names = [
                document.getElementById('player1').value,
                document.getElementById('player2').value,
                document.getElementById('player3').value,
                document.getElementById('player4').value,
              ];
              handleNamesSubmit(names);
            }}
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="game">
          <h1>Round {rounds} - Game Started!</h1>
          <div className="players">
            {names.map((name, index) => (
              <div className="player" key={index}>
                <p>{name}</p>
                <p>Current Total: {scores[index]}</p>
                <input
                  type="number"
                  placeholder="Enter score"
                  onChange={(e) => handleScoreChange(e, index)}
                  ref={(el) => scoreInputs.current[index] = el} // Assign input ref
                />
              </div>
            ))}
          </div>

          <div className="buttons">
            <button className="next" onClick={handleNewRound}>Next Round</button>
            <button className="end" onClick={handleEndGame}>End Game</button>
            <button className="restart" onClick={handleRestartGame}>Restart Game</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
