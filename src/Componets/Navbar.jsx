import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className=" text-white">
      <header
        className=" fs-2"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 1000,
          padding: 20,
          color: "#178ed8de",
          fontWeight: "bold",
          textShadow: "1px 1px 1px 1px grey",
        }}
      >
        <nav className="">
          <ul className="list-unstyled">
            <li>
              <Link to={"/"} className=" ">
                <i className="fa-solid fa-house fs-1 home-icon"
                />
              </Link>
            </li>
     
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;


// <li>
// <Link to={"/play-with-letters"} className="nav-link">
//   JUEGA CON LETRAS
// </Link>
// </li>
// <li>
// <Link to={"/play-with-numbers"} className="nav-link">
//   JUEGA CON NUMEROS
// </Link>
// </li>