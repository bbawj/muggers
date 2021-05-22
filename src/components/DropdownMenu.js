import React from 'react'
import "../Navbar.css"


export function DropdownItem(props) {
    return (
      <a href={props.lin} className="menu-item">
        <span className="icon-right">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

export function DropdownMenu(props) {

    return (
        <div className="dropdown">    
            {props.children}
        </div>
    )
}


