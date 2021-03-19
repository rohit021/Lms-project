import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Hidden, Typography, Link} from '@material-ui/core';
import Navigator from '../../components/layout/adminSidebar';
// import Content from './Content';
import Header from '../../components/layout/header';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

// let theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#63ccff',
//       main: '#009be5',
//       dark: '#006db3',
//     },
//   },
//   typography: {
//     h5: {
//       fontWeight: 500,
//       fontSize: 26,
//       letterSpacing: 0.5,
//     },
//   },
//   shape: {
//     borderRadius: 8,
//   },
//   components: {
//     MuiTab: {
//       defaultProps: {
//         disableRipple: true,
//       },
//     },
//   },
//   mixins: {
//     toolbar: {
//       minHeight: 48,
//     },
//   },
// });

// theme = {
//   ...theme,
//   components: {
//     MuiDrawer: {
//       styleOverrides: {
//         paper: {
//           backgroundColor: '#18202c',
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         label: {
//           textTransform: 'none',
//         },
//         contained: {
//           boxShadow: 'none',
//           '&:active': {
//             boxShadow: 'none',
//           },
//         },
//       },
//     },
//     MuiTabs: {
//       styleOverrides: {
//         root: {
//           marginLeft: theme.spacing(1),
//         },
//         indicator: {
//           height: 3,
//           borderTopLeftRadius: 3,
//           borderTopRightRadius: 3,
//           backgroundColor: theme.palette.common.white,
//         },
//       },
//     },
//     MuiTab: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//           margin: '0 16px',
//           minWidth: 0,
//           padding: 0,
//           [theme.breakpoints.up('md')]: {
//             padding: 0,
//             minWidth: 0,
//           },
//         },
//       },
//     },
//     MuiIconButton: {
//       styleOverrides: {
//         root: {
//           padding: theme.spacing(1),
//         },
//       },
//     },
//     MuiTooltip: {
//       styleOverrides: {
//         tooltip: {
//           borderRadius: 4,
//         },
//       },
//     },
//     MuiDivider: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#404854',
//         },
//       },
//     },
//     MuiListItemText: {
//       styleOverrides: {
//         primary: {
//           fontWeight: theme.typography.fontWeightMedium,
//         },
//       },
//     },
//     MuiListItemIcon: {
//       styleOverrides: {
//         root: {
//           color: 'inherit',
//           marginRight: 0,
//           '& svg': {
//             fontSize: 20,
//           },
//         },
//       },
//     },
//     MuiAvatar: {
//       styleOverrides: {
//         root: {
//           width: 32,
//           height: 32,
//         },
//       },
//     },
//   },
// };

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
      },
      drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
      },
      app: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      },
      main: {
        flex: 1,
        padding: theme.spacing(6, 4),
        background: '#eaeff1',
      },
      footer: {
        padding: theme.spacing(2),
        background: '#eaeff1',
      },
}));

const drawerWidth = 256;

function Dashboard(props) {
  const classes  = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
      <div className={classes.root}>        
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <main className={classes.main}>
            {/* <Content /> */}
          </main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
  );
}

export default Dashboard;
