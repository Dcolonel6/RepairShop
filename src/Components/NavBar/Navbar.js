import React, { useState } from "react";
import * as IOIcons from "react-icons/io";
import NavMenu from "./NavMenu";
import { IconContext } from "react-icons";
import "./NavBar.css";

const NavBar = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const toggleSideBar = () => {
    setShowSideBar((currentVal) => !currentVal);
  };
  return (
    <div className="nav">
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div className="menu-bars">
            <IOIcons.IoIosMenu onClick={toggleSideBar} />
          </div>
        </div>
        <nav className={showSideBar ? "nav-menu active" : "nav-menu"}>
          <NavMenu toggleSideBar={toggleSideBar} />
        </nav>
      </IconContext.Provider>
    </div>
  );
};

export default NavBar;
