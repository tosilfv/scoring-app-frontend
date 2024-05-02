import { createContext } from 'react'

export const AuthContext = createContext({
  isAdmin: false,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  token: null,
  userId: null,
  userName: null,
})
