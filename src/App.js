import { useState, useEffect } from "react";
import "animate.css";
import { animals } from "./animalData";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
function App() {
  const [index, setIndex] = useState(0);
  const [letters, setLetters] = useState([]);
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [removedLettersCount, setRemovedLettersCount] = useState({});
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [congratulations, setCongratulations] = useState(false);
  const word = animals[index].word;
  const [finishLevel, setFinishLevel] = useState(false);

  const speachLetter = (letter) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = letter;
    speech.lang = "es";
    window.speechSynthesis.speak(speech);
  };

  // const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar la reproducción de audio
  // const [isFinished, setIsFinished] = useState(false); // Estado para indicar si la reproducción ha terminado
  // // eslint-disable-next-line
  // let currentSpeech = null; // Variable para almacenar la instancia actual de SpeechSynthesisUtterance|
  // const speak = (ingredients,isPLaying ) => {
  //   if (!isPlaying) {
  //     const speech = new SpeechSynthesisUtterance();
  //     speech.text = `The ingredients needed for this recipe are: ${ingredients}`;
  //     speech.lang = "es";
  //     window.speechSynthesis.speak(speech);
  //     currentSpeech = speech; // Almacena la instancia actual de SpeechSynthesisUtterance
  //     setIsPlaying(true); // Actualiza el estado para indicar que el audio está reproduciéndose
  //     setIsFinished(false); // Reinicia el estado para indicar que la reproducción no ha terminado
  //     speech.onend = () => {
  //       setIsFinished(true); // Actualiza el estado para indicar que la reproducción ha terminado
  //       setIsPlaying(false); // Actualiza el estado para indicar que la reproducción ha terminado
  //     };
  //   } else {
  //     window.speechSynthesis.cancel(); // Cancela la síntesis de voz actual
  //     currentSpeech = null; // Limpia la variable currentSpeech
  //     setIsPlaying(false); // Actualiza el estado para indicar que el audio se detuvo
  //   }
  // };

  useEffect(() => {
    const initialCount = {};
    word.split("").forEach((letter) => {
      initialCount[letter] = (initialCount[letter] || 0) + 1;
    });
    setLetters(word.split(""));
    setShuffledLetters(shuffleArray([...word.split("")]));
    setRemovedLettersCount(initialCount);
  }, [word]);

  useEffect(() => {
    if (disabledLetters.length === word.length) {
      setFinishLevel(true);
    } else {
      setFinishLevel(false);
    }
    if (
      disabledLetters.length === word.length &&
      index === animals.length - 1
    ) {
      setCongratulations(true);
    } else {
      setCongratulations(false);
    }
  }, [disabledLetters, word, index]);

  const handleDragStart = (e, letter) => {
    e.dataTransfer.setData("text/plain", letter);
  };

  const handleDragOver = (e, letter) => {
    e.preventDefault();
    const droppedLetter = e.dataTransfer.getData("text/plain");
    if (letter === droppedLetter) {
      e.target.className = "letter-box  dropped";
      e.target.style.padding = "25px";
    } else {
      e.target.className = "letter-box";
    }
  };

  const handleDragLeave = (e, letter) => {
    const isDropped = e.dataTransfer.getData("text/plain");
    if (isDropped === letter) {
      e.target.className = "letter-box  ";
    }
    if (disabledLetters.includes(letter)) {
      e.target.className = "letter-box dropped ";
    }
  };

  const handleDrop = (targetLetter) => {
    return (e) => {
      e.preventDefault();
      const droppedLetter = e.dataTransfer.getData("text/plain");
      if (
        droppedLetter === targetLetter &&
        removedLettersCount[droppedLetter] > 0 &&
        !disabledLetters.includes(targetLetter)
      ) {
        const updatedCount = removedLettersCount[droppedLetter] - 1;
        setRemovedLettersCount((prevCount) => ({
          ...prevCount,
          [droppedLetter]: updatedCount,
        }));
        if (updatedCount === 0) {
          setDisabledLetters((prevDisabledLetters) => [
            ...prevDisabledLetters,
            droppedLetter,
          ]);

          setShuffledLetters((prevShuffledLetters) => {
            const newShuffledLetters = [...prevShuffledLetters].filter(
              (letter) => letter !== targetLetter
            );
            return newShuffledLetters;
          });

          e.target.className =
            "word dropped animate__animated animate__rubberBand ";
        }
      }
    };
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div
      className="App flex-column gap-4"
      style={{ backgroundColor: animals[index].backGround }}
    >
      <img
        className=" animate__animated animate__bounceIn animate__faster"
        width={320}
        height={300}
        src={animals[index].image}
        alt={animals[index].word}
      />
      <div
        className={
          finishLevel
            ? "animate__animated animate__rubberBand    word"
            : "word animate__animated animate__lightSpeedInRight  "
        }
      >
        {letters.map((letter, index) => (
          <div
            key={index}
            className="letter-box "
            onDrop={handleDrop(letter)}
            onDragOver={(e) => {
              handleDragOver(e, letter);
            }}
            onDragLeave={(e) => {
              handleDragLeave(e, letter);
            }}
          >
            {letter}
          </div>
        ))}
      </div>
      {congratulations && (
        <div className="animate__animated animate__tada">
          <p className="m-0">Muy Bien!</p>
        </div>
      )}
      <div
        className={
          !finishLevel
            ? "shuffled-letters  animate__animated animate__lightSpeedInLeft word "
            : "word animate__animated animate__lightSpeedInRight  "
        }
      >
        {shuffledLetters.map((letter, index) => {
          const rotate = Math.floor(Math.random() * 91) - 45; // Valores entre -45 y 45
          const translateY = Math.floor(Math.random() * 25) - 12; // Valores entre -12 y 12

          return (
            <div
              key={index}
              className={letter === "" ? "" : "letter-box draggable"}
              draggable={!disabledLetters.includes(letter)}
              onDragStart={(e) => handleDragStart(e, letter)}
              style={{
                transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
              }}
              onMouseDown={(e) => {
                e.target.style.padding = "40px";
                speachLetter(letter);
              }}
              onMouseLeave={(e) => (e.target.style.padding = "")}
              onTouchStart={(e) => {
                e.target.style.padding = "40px";
                speachLetter(letter);
              }}
              onTouchEnd={(e) => (e.target.style.padding = "")}
            >
              {letter}
            </div>
          );
        })}
        {finishLevel ? (
          <div>
            <button
              className="animate__animated animate__zoomIn  btn btn-primary "
              onClick={() => {
                if (index < animals.length - 1) {
                  setIndex((prev) => prev + 1);
                  setFinishLevel(false);
                  setDisabledLetters([]);
                  setLetters([]);
                } else {
                  window.location.reload();
                }
              }}
            >
              {index < animals.length - 1 ? "SIGUIENTE" : "VOLVER A EMPEZAR"}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
