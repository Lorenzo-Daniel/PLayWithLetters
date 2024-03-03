import { useState, useEffect } from "react";
import "animate.css";
import { animals } from "./animalData";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import coolLetter from "../src/Audios/coolLetter.wav";
import error from "../src/Audios/error.wav";
import letterSelected from "../src/Audios/letterSelected.wav";
import success from "../src/Audios/success.wav";
import success1 from "../src/Audios/success1.wav";
import mounted from "../src/Audios/mounted.wav";
import back from "../src/Audios/back.wav";
import buzz from "buzz";

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

  let selectedLetter = new buzz.sound(letterSelected);
  selectedLetter.setVolume(9);
  let cool = new buzz.sound(coolLetter);
  selectedLetter.setVolume(25);
  let mount = new buzz.sound(mounted);
  mount.setVolume(25);
  let letterError = new buzz.sound(error);
  letterError.setVolume(50);
  let successLevel = new buzz.sound(success);
  successLevel.setVolume(15);
  let successEnd = new buzz.sound(success1);
  successEnd.setVolume(50);
  let backToStart = new buzz.sound(back);
  backToStart.setVolume(25);
  useEffect(() => {
    backToStart.play();
    const initialCount = {};
    word.split("").forEach((letter) => {
      initialCount[letter] = (initialCount[letter] || 0) + 1;
    });
    setLetters(word.split(""));
    setShuffledLetters(shuffleArray([...word.split("")]));
    setRemovedLettersCount(initialCount);
    // eslint-disable-next-line
  }, [word]);

  useEffect(() => {
    if (disabledLetters.length === word.length) {
      setFinishLevel(true);
      setTimeout(() => {
        speachLetter(animals[index].word);
      }, 1000);
      successLevel.play();
    } else {
      setFinishLevel(false);
    }
    if (
      disabledLetters.length === word.length &&
      index === animals.length - 1
    ) {
      setCongratulations(true);
      setTimeout(() => {
        speachLetter(
          "MUY BIEN!. LO HAZ LOGRADO!! TOCA EL BOTON PARA VOLVER A EMPEZAR "
        );
      }, 3500);
      setTimeout(() => {
        successEnd.play();
      }, 2000);
    } else {
      setCongratulations(false);
    }
    // eslint-disable-next-line
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
      if (droppedLetter !== targetLetter) {
        letterError.play();
      }

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
          cool.play();
        }
      }
    };
  };

  const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
  };

  return (
    <div
      className="App flex-column  position-relative "
      style={{ backgroundColor: animals[index].backGround }}
    >
      <div className=" main">
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
              ? "animate__animated animate__rubberBand word"
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
                  selectedLetter.play();
                }}
                onMouseLeave={(e) => (e.target.style.padding = "")}
                onTouchStart={(e) => {
                  e.target.style.padding = "40px";
                  speachLetter(letter);
                  selectedLetter.play();
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
                    backToStart.play();
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
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
    </div>
  );
}

export default App;
