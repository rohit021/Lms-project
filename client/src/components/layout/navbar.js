import React, {useEffect, useState} from 'react';
import { useHistory} from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar,IconButton,Grow, Typography, Paper, ClickAwayListener, Button,Avatar, Popper, MenuItem, MenuList, Box, Hidden, Collapse} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AuthService from "../../authServices/apicalls";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Logo from '../../assets/images/logo.png';
import {getLocalStorage } from '../../helpers/localStorage';
import AvatarLogo from '../../assets/icons/avatar.jpg';
// import {
//   usePopupState,
//   bindHover,
//   bindMenu,
// } from 'material-ui-popup-state/hooks'
// import Menu from 'material-ui-popup-state/Hove

// import {logout} from 'utils/auth';


const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    navbar:{
        background:theme.palette.primary.dark
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    MainButton:{
        background:theme.palette.primary.blue,
        color:theme.palette.primary.light,
        fontWeight:500,
        fontSize:"16px"
    },
    NameCap:{
        fontFamily: "Poppins-Bold",
        textTransform: "capitalize",
        color:  theme.palette.light,        
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    menuItem: {
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#fafafa'
        }
    }
}));


const PrimaryAppBar = () => {
    var name = AuthService.isAuthenticated() ? (getLocalStorage('authUser').name.split(' ')[0]):"";
    const history = useHistory();
    const classes = useStyles();
    const menuId = 'primary-search-account-menu';
    const [open, setOpen] = React.useState(false);
    // const [openMobileMenu, setOpenMobileMenu] = React.useState(false);
    const [scrolling, setScrolling] = useState(false);
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
    
    const handleLogoutClick = (e) => {
        e.preventDefault();
        AuthService.signout().then(
            () => {               
                window.location.reload();
                history.push('/');
                AuthService.signout();
            }
        );       
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        }
      }

      const prevOpen = React.useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
          anchorRef.current.focus();
        }    
        prevOpen.current = open;
      }, [open]);
      
      
    
    useEffect(() => {
        if (AuthService.isAuthenticated()) {
            console.log('Redirecting to admin dashboard');           
            history.push('/');
        }
      }, [history]);

    useEffect(() => {
        window.addEventListener('scroll', function() {
            setScrolling(true);

            if(window.pageYOffset === 0) {
                setScrolling(false);
            }
        })
    }, []);
    const renderLogoutMenu = (
        <React.Fragment>            
            <Button href={'/login'}  variant="contained" className={classes.MainButton}>Login</Button>
        </React.Fragment>
    );

    const renderLogInMenu = (
        <React.Fragment>          
            <div>     
            <span className={classes.NameCap}>
                                Hii, {name}
                            </span>           
                <IconButton edge="end" aria-label="account of current user" ref={anchorRef} onClick={handleToggle} aria-controls={menuId} aria-haspopup="true"  color="inherit">
                    <Avatar alt='avatar' src={AvatarLogo} />
                    <ExpandMoreIcon  fontSize="small" />
                </IconButton>
            </div>
        </React.Fragment>
    )

    // const renderLogInMobileMenu = (
    //     <React.Fragment>
    //         <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
    //             <Link href={postProjectLink} >   
    //                 <Button style={{backgroundColor: '#00e676', color: '#fff', height: 'max-content', margin: '8px auto'}}>Post Project</Button>
    //             </Link>

    //             <Link href={"/contest/create"} >   
    //                 <Button style={{color: openMobileMenu ? '#000': '#fff'}} >Post Contest</Button>
    //             </Link>

    //             <Link href={"/post-service"} >   
    //                 <Button style={{color: openMobileMenu ? '#000': '#fff'}} >Post Service</Button>
    //             </Link>
            
    //             <Link style={{color: '#fff'}} href={"/freelance-contests"} >
    //                 <Button style={{color: openMobileMenu ? '#000': '#fff'}} >Contests</Button>
    //             </Link>

    //             <Link style={{color: '#fff'}} href={`/freelance-services`} >
    //                 <Button style={{color: openMobileMenu ? '#000': '#fff'}}>Services</Button>
    //             </Link>

    //             <Link style={{color: '#fff'}} href={'/freelance-jobs'} >
    //                 <Button style={{color: openMobileMenu ? '#000': '#fff'}}>Find Jobs</Button>
    //             </Link>

    //             <Link style={{color: '#fff'}} href={'/freelancers'} >
    //                 <Button style={{color: openMobileMenu ? '#000': '#fff'}}>Find Freelancers</Button>
    //             </Link>

    //             <Link href="/messages">
    //                 <Button>Messages {messageCount > 0 ? '(' + messageCount + ')' : null}</Button>
    //             </Link>
                
    //             <Link href="/notifications" >
    //                 <Button>Notifications {notificationCount > 0 ? '(' + notificationCount + ')' : null}</Button>
    //             </Link>
                    
    //         </div>
    //     </React.Fragment>
    // )

    const renderCommonMenu = (
        <React.Fragment>
            <a href="/">
                <img src={Logo} height="34" alt="" />
            </a>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            { AuthService.isAuthenticated() ? renderLogInMenu : renderLogoutMenu }
            </div>
        </React.Fragment>
    )

    const renderMenu = (
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center bottom' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem> */}
                  <MenuItem onClick={handleLogoutClick}> <ExitToAppIcon/>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
   
    );

    if (AuthService.isAuthenticated()) {
        return(
            <div className={classes.grow}>
                <AppBar position={scrolling ? "fixed" : "static"} className={classes.navbar}>
                    <Toolbar>
                        {renderCommonMenu}
                        <Hidden mdUp >                      
                       
                            <Avatar aria-controls="simple-menu" aria-haspopup="true" alt="avatar" src={AvatarLogo}  />  
                            <IconButton onClick={handleToggle}  ref={anchorRef} style={{color: '#fff'}} >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                    </Toolbar>
                </AppBar>
                {
                    <Collapse in={handleToggle} >
                        <Box id='mobile-menu' display='flex' flexDirection='column' >
                            {/* {renderLogInMobileMenu} */}
                        </Box>
                    </Collapse>
                }
                {renderMenu}
            </div>
        );
    } else{
        return(
            <div className={classes.grow}>
                <AppBar position={scrolling ? "fixed" : "static"} className={classes.navbar}>
                    <Toolbar>
                        {renderCommonMenu}
                        <Hidden mdUp >
                            <IconButton onClick={handleToggle} style={{color: '#fff'}} >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                    </Toolbar>
                </AppBar>
                {/* {
                    <Collapse in={openMobileMenu} >
                        <Box id='mobile-menu' display='flex' flexDirection='column' >
                            {renderLogoutMenu}
                        </Box>
                    </Collapse>
                } */}
            </div>
        );
    }
};

export default PrimaryAppBar; 