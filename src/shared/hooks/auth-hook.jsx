import { useCallback, useEffect, useState } from 'react'

let logoutTimer

export const useAuth = () => {
  const [token, setToken] = useState(false)
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [isAdmin, setIsAdmin] = useState(false)
  const [userId, setUserId] = useState(false)
  const [userName, setUserName] = useState(false)

  const login = useCallback((uid, token, isAdmin, userName, expirationDate) => {
    setToken(token)
    setIsAdmin(isAdmin)
    setUserId(uid)
    setUserName(userName)
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        isAdmin: isAdmin,
        userName: userName,
        expiration: tokenExpirationDate.toISOString(),
      })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setTokenExpirationDate(null)
    setIsAdmin(false)
    setUserId(null)
    setUserName(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.isAdmin,
        storedData.userName,
        new Date(storedData.expiration)
      )
    }
  }, [login])

  return { token, login, logout, userId, isAdmin, userName }
}
