import React from 'react'
import './Avatar.css'

const Avatar = (props) => {
  return <div className={`avatar ${props.className}`} style={props.style}></div>
}

export default Avatar
