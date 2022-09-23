import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = [
    {
      id: 1,
      path: "/",
      text: "Home",
    },
    {
      id: 2,
      path: "/about",
      text: "About",
    },
  ];

  const [navBarOpen, setNavBarOpen] = useState(false);

  const handleToggle = () => {
    setNavBarOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setNavBarOpen(false);
  };

  return (
    <nav className="navBar">
      <button onClick={handleToggle}>{navBarOpen ? "Close" : "Open"}</button>
      <ul className={`menuNav ${navBarOpen ? " showMenu" : ""}`}>
        {links.map((link) => {
          return (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className="active-link"
                onClick={() => closeMenu()}
                end
              >
                {link.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Navbar;
