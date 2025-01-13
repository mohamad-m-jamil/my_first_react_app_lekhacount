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

    const newScore = parseInt(e.target.value, 10) || 0; // Parse input as a number
    const newScores = [...scores]; // Copy the scores array
    newScores[index] = newScore; // Update only the score for the current player
    setScores(newScores); // Update the state

    // Check if any player exceeds 200 points
    if (newScores[index] > 200) {
      setGameEnded(true);
      alert(`${names[index]} has exceeded 200 points! Game Over.`);
    }
  };

  const handleAddScore = (index) => {
    const inputScore = parseInt(scoreInputs.current[index]?.value, 10) || 0; // Parse input value
    const newScores = [...scores];
    newScores[index] += inputScore; // Add the score to the current total
    setScores(newScores);

    // Reset the input field
    if (scoreInputs.current[index]) {
      scoreInputs.current[index].value = '';
    }

    // Check if the player exceeds 200 points
    if (newScores[index] > 200) {
      setGameEnded(true);
      alert(`${names[index]} has exceeded 200 points! Game Over.`);
    }
  };

  const handleNewRound = () => {
    if (gameEnded) return;

    // Reset input fields to empty
    scoreInputs.current.forEach((input) => {
      if (input) input.value = '';
    });

    setRounds(rounds + 1);
  };

  const handleEndGame = () => {
    setGameEnded(true);
    const { winner, loser } = determineWinnerLoser();
    alert(`Game Over! Winner: ${winner} - Loser: ${loser}`);
  };

  const determineWinnerLoser = () => {
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    const winner = names[scores.indexOf(minScore)];
    const loser = names[scores.indexOf(maxScore)];
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
              const submittedNames = [
                document.getElementById('player1').value,
                document.getElementById('player2').value,
                document.getElementById('player3').value,
                document.getElementById('player4').value,
              ];
              handleNamesSubmit(submittedNames);
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
                  ref={(el) => (scoreInputs.current[index] = el)} // Assign input ref
                />
                <button onClick={() => handleAddScore(index)}>Add Score</button>
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
