import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        {auth.isLoggedIn && (
          <NavLink to={`/${auth.userId}/courses`}>YOUR COURSES</NavLink>
        )}
      </li>
      <li>{auth.isLoggedIn && <NavLink to="/TODO1">JOIN COURSE</NavLink>}</li>
      <li>
        {auth.isLoggedIn && <NavLink to="/courses/new">CREATE COURSE</NavLink>}
      </li>
      <li>
        {auth.isLoggedIn && (
          <NavLink to="/" exact="true">
            ALL USERS
          </NavLink>
        )}
      </li>
      <li>{auth.isLoggedIn && <NavLink to="/TODO2">PROFILE</NavLink>}</li>
      <li>{!auth.isLoggedIn && <NavLink to="/auth">AUTHENTICATE</NavLink>}</li>
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
