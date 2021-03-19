import * as React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import {mainListItems} from './../../helpers/utils';
const categories = [
  {
    id: 'Develop',
    children: [
      {
        id: 'Authentication',
        icon: <PeopleIcon />,
        active: true,
      },
      { id: 'Database', icon: <DnsRoundedIcon /> },
      { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
      { id: 'Hosting', icon: <PublicIcon /> },
      { id: 'Functions', icon: <SettingsEthernetIcon /> },
      {
        id: 'ML Kit',
        icon: <SettingsInputComponentIcon />,
      },
    ],
  },
  {
    id: 'Quality',
    children: [
      { id: 'Analytics', icon: <SettingsIcon /> },
      { id: 'Performance', icon: <TimerIcon /> },
      { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
    ],
  },
];

const useStyles = makeStyles(theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.primary.dark
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    fontWeight: 800,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.secondary.light
    },
  },
  itemCategory: {
    background: theme.palette.primary.blue,
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.primary.light,
  },
  itemActiveItem: {
    color: theme.palette.primary.dark
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    color: theme.palette.primary.light,
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
}));

function Navigator(props) {
  const {...other } = props;
  const page = props.page;
  const classes  = useStyles();
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
      <Link to ="/dashboard">
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
            <ListItemIcon className={classes.itemIcon}>

            <HomeIcon />
          </ListItemIcon>
          LMS Project
        </ListItem>
        </Link>  
        {
            mainListItems.map((option, index) => (
                <Link to={option.link} passHref key={index} >
                    <a>
                    <ListItem button selected={page == option.page}>
                        <ListItemIcon>
                            {option.icon}
                        </ListItemIcon>
                        <ListItemText primary={option.text} primaryTypographyProps={{color:"textPrimary"}} />
                    </ListItem>
                    </a>
                </Link>
            ))
        }     
      </List>
    </Drawer>
  );
}

export default Navigator;
