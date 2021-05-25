import React from 'react'
import "../Navbar.css"
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/MenuList';

export function TestDropdownMenu(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className="nav-item">
    <li className="icon-button">
    
    <IconButton
      ref={anchorRef}
      aria-controls={open ? 'menu-list-grow' : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
      style={{justifyContent:"center"}}
      >
      <props.Icon src={props.src}/>
    </IconButton>
    
    <Popper className="popper" open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-end" transition>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList className="menu-list" autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
              {props.children}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
    
  </li>
  </div>
  )
}