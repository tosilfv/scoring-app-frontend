import React from "react";
import "./Avatar.css";

const Avatar = (props) => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <div style={{ width: props.width, height: props.height }}>
        {props.name}
      </div>
    </div>
  );
};

export default Avatar;
