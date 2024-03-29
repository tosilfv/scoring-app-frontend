import React from 'react'
import { style } from '../../styles/styles'
import './MainHeader.css'

const MainHeader = (props) => {
  return (
    <header className="main-header" style={style.main}>
      {props.children}
    </header>
  )
}

export default MainHeader
