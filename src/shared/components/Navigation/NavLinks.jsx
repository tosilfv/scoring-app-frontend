import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth-context'
import { NavLink } from 'react-router-dom'
import './NavLinks.css'

const NavLinks = (props) => {
  const auth = useContext(AuthContext)

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && auth.isAdmin && (
        <li>
          <NavLink to="/" exact="true">
            ALL USERS
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/courses/all" exact="true">
          ALL COURSES
        </NavLink>
      </li>
      {auth.isLoggedIn && !auth.isAdmin && (
        <li>
          <NavLink to={`/${auth.userId}/courses`}>MY COURSES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.isAdmin && (
        <li>
          <NavLink to="/courses/new">ADD COURSES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/profile" exact="true">
            MY PROFILE
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  )
}

export default NavLinks
