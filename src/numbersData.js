import cat from "../src/images/gato.png";
// import delfin from "../src/images/delfin.png";
// import nutria from "../src/images/nutria.png";
import tigre from "../src/images/tigre.png";
import pez from "../src/images/pez.png";
import ñandu from "../src/images/ñandu.png";
import cebra from "../src/images/cebra.png";
import oso from "../src/images/oso.png";
import vaca from "../src/images/vaca.png";
import cerdo from "../src/images/cerdo.png";
import jirafa from "../src/images/jirafa.png";
// import hipopotamo from "../src/images/hipopotamo.jpg";
// import caballo from "../src/images/caballo.png";
function getRandomNumbers(definedNumber) {
  const randomNumbers = [];

  for (let i = 0; i < 3; i++) {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 9) + 1;
    } while (
      randomNumbers.includes(randomNumber) ||
      randomNumber === definedNumber
    );
    randomNumbers.push(randomNumber);
  }
  // Generar un índice aleatorio para insertar el número definido
  const randomIndex = Math.floor(Math.random() * (randomNumbers.length + 1));
  randomNumbers.splice(randomIndex, 0, definedNumber);
  return randomNumbers;
}

export const numbers = [
  {
    numbers: getRandomNumbers(5),
    firstValue: [1, 1, 1],
    secondValue: [1, 1],
    operator: "+",
    result: 5,
    image: oso,
    backGround: "#c6c5ff",
  },
  {
    numbers: getRandomNumbers(10),
    firstValue: [1, 1, 1, 1, 1],
    secondValue: [1, 1, 1, 1, 1],
    operator: "+",
    result: 10,
    image: cat,
    backGround: "#84fbff",
  },
  {
    numbers: getRandomNumbers(3),
    firstValue: [1, 1],
    secondValue: [1],
    operator: "+",
    result: 3,
    image: pez,
    backGround: "#1bb0ec",
  },
  {
    numbers: getRandomNumbers(6),
    firstValue: [1, 1, 1],
    secondValue: [1, 1,1],
    operator: "+",
    result: 6,
    image: vaca,
    backGround: "#84fbff",
  },
  {
    numbers: getRandomNumbers(2),
    firstValue: [1],
    secondValue: [1],
    operator: "+",
    result: 2,
    image: cerdo,
    backGround: "#ffd4f5",
  },
  {
    numbers: getRandomNumbers(1),
    firstValue: [1, 1, 1],
    secondValue: [1, 1],
    operator: "-",
    result: 1,
    image: tigre,
    backGround: "#7c4e9f",
  },
  {
    numbers: getRandomNumbers(2),
    firstValue: [1, 1, 1,1],
    secondValue: [1, 1],
    operator: "-",
    result: 2,
    image: cebra,
    backGround: "#f5bc25",
  },
  {
    numbers: getRandomNumbers(4),
    firstValue: [1, 1, 1],
    secondValue: [1,],
    operator: "+",
    result: 4,
    image: ñandu,
    backGround: "#029b4a",
  },
  {
    numbers: getRandomNumbers(8),
    firstValue: [1, 1, 1,1],
    secondValue: [1, 1,1,1],
    operator: "+",
    result: 8,
    image: jirafa,
    backGround: "#7c4e9f",
  },
  // {
  //   numbers: getRandomNumbers(),
  //   firstValue: [1, 1, 1],
  //   secondValue: [1, 1],
  //   operator: "+",
  //   result: 5,
  //   image: nutria,
  //   backGround: "#f07021",
  // },
  // {
  //   numbers: getRandomNumbers(5),
  //   firstValue: [1, 1, 1],
  //   secondValue: [1, 1],
  //   operator: "+",
  //   result: 5,
  //   image: delfin,
  //   backGround: "#7be9ff",
  // },
  // {
  //   numbers: getRandomNumbers(5),
  //   firstValue: [1, 1, 1],
  //   secondValue: [1, 1],
  //   operator: "+",
  //   result: 5,
  //   image: caballo,
  //   backGround: "#bdfa7b",
  // },
  // {
  //   numbers: getRandomNumbers(5),
  //   firstValue: [1, 1, 1],
  //   secondValue: [1, 1],
  //   operator: "+",
  //   result: 5,
  //   image: hipopotamo,
  //   backGround: "#b1f1fe",
  // },
];
