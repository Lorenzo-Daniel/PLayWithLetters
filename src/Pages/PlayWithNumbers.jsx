import { useState, useEffect } from "react";
import { numbers } from "../numbersData";
// import { useNavigate } from "react-router-dom";
import error from "../Audios/error.wav";
import letterSelected from "../Audios/letterSelected.wav";
import back from "../Audios/back.wav";
import coolLetter from "../Audios/coolLetter.wav";
import success from "../Audios/success.wav";
import buzz from "buzz";

function PlayWithNumbers() {
  const [index, setIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [object, setObject] = useState(numbers[index]);
  // const [result,setResult] = useState('')
  // const navigate = useNavigate()
  useEffect(() => {
    backToStart.play();
    setObject(numbers[index]);
    // eslint-disable-next-line
  }, [index]);
  //------------------------------------------------------

  let letterError = new buzz.sound(error);
  letterError.setVolume(50);
  let selectedLetter = new buzz.sound(letterSelected);
  selectedLetter.setVolume(15);
  let backToStart = new buzz.sound(back);
  backToStart.setVolume(25);
  let cool = new buzz.sound(coolLetter);
  selectedLetter.setVolume(25);
  let successLevel = new buzz.sound(success);
  successLevel.setVolume(15);
  //---------------------------------------------------

  const handleDragStart = (e, number) => {
    e.dataTransfer.setData("text/plain", number);
  };

  const handleDragOver = (e, number) => {
    e.preventDefault();
    const droppedLetter = e.dataTransfer.getData("text/plain");
    if (number === droppedLetter) {
      e.target.className = "letter-box  dropped";
      e.target.style.padding = "25px";
    } else {
      e.target.className = "letter-box";
    }
  };

  const speachLetter = (number) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = number;
    speech.lang = "es";
    window.speechSynthesis.speak(speech);
  };

  const handleDrop = (targetLetter) => {
    return (e) => {
      e.preventDefault();
      const droppedLetter = e.dataTransfer.getData("text/plain");
      console.log(targetLetter);
      if (droppedLetter !== targetLetter) {
        letterError.play();
      } else {
        cool.play();
        successLevel.play();
        setShowResult(true);
      }
    };
  };
  return (
    <div className="App" style={{ backgroundColor: numbers[index].backGround }}>
      <div className="d-flex flex-column align-items-center w-100  gap-4 p-2">
        <div
          className={
            !showResult
              ? "d-flex justify-content-evenly align-items-center animate__animated animate__lightSpeedInRight  "
              : "d-flex justify-content-evenly align-items-center  animate__animated animate__rubberBand "
          }
        >
          <div
            className="d-flex justify-content-center align-items-center flex-wrap"
            style={{
              // padding: 15,
              borderRadius: 500,
              minWidth: 130,
              minHeight: 100,
            }}
          >
            {object.firstValue.map((element, i) => {
              return (
                <div key={i}>
                  <img src={object.image} alt="oso" width={40} />
                </div>
              );
            })}
          </div>

          <div className="fs-1 fw-bold d-flex ">
            <i className="fa-solid fa-plus" />
          </div>

          <div
            className="d-flex justify-content-center align-items-center flex-wrap"
            style={{
              // padding: 15,
              borderRadius: 500,
              minWidth: 130,
              minHeight: 100,
              maxWidth: 1200,
            }}
          >
            {object.secondValue.map((element, i) => {
              return (
                <div key={i}>
                  <img src={object.image} alt="oso" width={40} />
                </div>
              );
            })}
          </div>
          <div className="me-3 ms-0  fs-1 fw-bold"><i className="fa-solid fa-equals"></i></div>

          <div
            className={
              !showResult ? "letter-box text-white m-0" : "letter-box  dropped"
            }
            onDrop={handleDrop(object.result.toString())}
            onDragOver={(e) => handleDragOver(e, object.result)}
          >
            {showResult ? object.result : ""}
          </div>
        </div>

        <div className="d-flex ">
          {!showResult
            ? object.numbers.map((num, index) => {
                return (
                  <div
                    key={index}
                    className={
                      object.result === ""
                        ? ""
                        : "letter-box draggable animate__animated animate__lightSpeedInLeft "
                    }
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, num)}
                    onMouseDown={(e) => {
                      e.target.style.padding = "40px";
                      speachLetter(num);
                      selectedLetter.play();
                    }}
                    onMouseLeave={(e) => (e.target.style.padding = "")}
                    onTouchStart={(e) => {
                      e.target.style.padding = "40px";
                      speachLetter(num);
                      selectedLetter.play();
                    }}
                    onMouseUp={(e) => (e.target.style.padding = "")}
                    onTouchEnd={(e) => (e.target.style.padding = "")}
                  >
                    {num}
                  </div>
                );
              })
            : ""}
        </div>
        {showResult ? (
          <div>
            <button
              className="animate__animated animate__zoomIn  btn btn-primary "
              onClick={() => {
                if (index < numbers.length - 1) {
                  setIndex((prev) => prev + 1);
                  setShowResult(false);
                } else {
                  backToStart.play();
                  setTimeout(() => {
                    setIndex(0);
                    setShowResult(false);
                    // window.location.reload();
                  }, 1000);
                }
              }}
            >
              {index < numbers.length - 1 ? "SIGUIENTE" : "VOLVER A EMPEZAR"}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default PlayWithNumbers;
