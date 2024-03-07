import React from "react";
import car from '../images/car.png'
function PLayWIthNumbers() {
  return (
    <div className="App">
      <div>
        <div className="d-flex ">
          <div className=" "><img src={car} alt={car} width={50} /> </div>
          <div className=" "><img src={car} alt={car} width={50} /> </div>
          <div className=" "><img src={car} alt={car} width={50} /> </div>
          <div className=" mx-2 ">+</div>
          <div className=" "><img src={car} alt={car} width={50} /> </div>
          <div className=" "><img src={car} alt={car} width={50} /> </div>
          <div className="mx-2 ">= </div>
          <div className=" ">5 </div>
        </div>
      </div>
    </div>
  );
}

export default PLayWIthNumbers;
