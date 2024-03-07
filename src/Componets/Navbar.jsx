import React from "react";
import { Link } from "react-router-dom";

function  Navbar() {
  return (
    <div className="position-relative">
      <header
        className=" "
        style={{ position: "absolute", left: 15, top: 15, zIndex: 1000 }}
      >
        <nav className="">
          <ul className="list-unstyled">
            <li>
              <Link to={"/"} className="nav-link">Home</Link>
            </li>
            <li>
              <Link to={"/play-with-letters"} className="nav-link">PLay With Letters</Link>
            </li>
            <li>
              <Link to={"/play-with-numbers"} className="nav-link">PLay With Numbers</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
