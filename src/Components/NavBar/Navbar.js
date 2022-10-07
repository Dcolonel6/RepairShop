import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as IOIcons from "react-icons/io";
import NavMenu from "./NavMenu";
import { IconContext } from "react-icons";
import "./NavBar.css";

const NavBar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const toggleSideBar = () => {
    setShowSideBar((currentVal) => !currentVal);
  };
  return (
    <div className="nav">
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <IOIcons.IoIosMenu onClick={toggleSideBar} />
          </Link>
        </div>
        <nav className={showSideBar ? "nav-menu active" : "nav-menu"}>
          <NavMenu toggleSideBar={toggleSideBar} />
        </nav>
      </IconContext.Provider>
    </div>
  );
};

export default NavBar;
