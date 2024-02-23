import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/u1/courses">YOUR COURSES</NavLink>
      </li>
      <li>
        <NavLink to="/TODO1">JOIN COURSE</NavLink>
      </li>
      <li>
        <NavLink to="/courses/new">CREATE COURSE</NavLink>
      </li>
      <li>
        <NavLink to="/" exact="true">
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/TODO2">PROFILE</NavLink>
      </li>
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
