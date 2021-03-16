import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, AppBar, makeStyles, IconButton, Menu, Button} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';
import AuthService from "../../services/apicalls";
import Dropdown from './dropdown';
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  topbar:{
    background:"#333333",    
    textDecoration: "none",
  },
  grow: {
    flexGrow: 1
  },
  title: {
    // fontSize:"2.5rem !important",    
    fontWeight:"800 !important"
  },
  button: {
    backgroundColor:"#1178ee",
    padding:"3px",
    borderRadius:"10px" ,
    "&:hover": {    
      transform: `translate(0,2px)`
    },
  },
  link: {
    overflow: "hidden",
    fontFamily: "Poppins-Bold",
    color: '#fff',
    fontWeight:"600",
    letterSpacing:"2px",
    fontSize: "1.5rem",
    padding: "0.7rem",
  },
  signout: {
    cursor: "pointer",
  },
  user: {},
  userButton: {
      textTransform: 'none',
  },
  avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
  },
}));

const NavigationBar = () => {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const currentUser = AuthService.isAuthenticated();

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

const UserMenu = () => {  
  return(
    <div className={classes.user}>
      <Button
            // aria-label={label && translate(label, { _: label })}
            className={classes.userButton}
            color="inherit"
            startIcon={<AccountCircle />}
            onClick={handleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            Prateek Saini{/* {identity.fullName} */}
        </Button>
        
        {dropdown && <Dropdown />}

      {/* {isAutheticated() &&<span className={[classes.link, classes.signout].join(' ')}
      > {Name}</span>}
      {isAutheticated() && <span className={[classes.link, classes.signout].join(' ')}
      onClick={() => {
      // if (!window.confirm("Do you want to logout")) return;
      window.location.reload();
      signout();
    }} >LOGOUT</span>} */}
    </div>
  )
};
  useEffect(() => {
    setUserName(localStorage.getItem("authName"));
  }, [userName]);
  const Name = userName?userName.toUpperCase():userName;
  return (
    <React.Fragment>
      <AppBar position="static" className ={[classes.topbar,classes.grow].join(' ')}>
        <Toolbar>  
          <Link className={[classes.link,classes.title].join(' ')} to="/">CRM Project </Link>
          <div className={classes.grow}></div>          
            {!currentUser && <span className={classes.button}><Link exact className={classes.link} to="/login">LOGIN</Link></span>}            
            {currentUser && <UserMenu/>}
            
        </Toolbar>
      </AppBar>      
    </React.Fragment>    
  );
}

export default NavigationBar;
