import React, { useState } from 'react'
import "../Navbar.css"

function NavBarItem(props) {

    const [open, setOpen] = useState(false)

    return (
        <li className="nav-item" onClick={() => setOpen(!open)}>
            <a href="#" className="icon-button">
                <props.Icon />
            </a>
            {open && props.children}
        </li>
        
    )
}
export default NavBarItem;
