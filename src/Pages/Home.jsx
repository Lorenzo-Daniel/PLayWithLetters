import React from "react";
import { Link } from "react-router-dom";
import home from "../images/home.jpg";
function Home() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${home})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
         
      <ul className="list-unstyled rounded p-3 text-center" style={{ backgroundColor: "#5654546d",color:'white',fontSize:'32px',width:'300px'}}>
        <li>
          <Link to={"/play-with-letters"} className="nav-link">
            JUEGA CON LETRAS
          </Link>
        </li>
        <li>
          <Link to={"/play-with-numbers"} className="nav-link color">
            JUEGA CON NÚMEROS
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
