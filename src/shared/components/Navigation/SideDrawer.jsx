import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { style } from "../../styles/styles";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  const nodeRef = useRef(null); // silence "CSSTransition using findDOMNode" warning
  const content = (
    <CSSTransition
      nodeRef={nodeRef}
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside
        className="side-drawer"
        onClick={props.onClick}
        ref={nodeRef}
        style={style.main}
      >
        {props.children}
      </aside>
    </CSSTransition>
  );

  return createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
