import React from 'react';
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InfoIcon from '@material-ui/icons/Info';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {ADMIN_SECTION_MENU, MODERATOR_SECTION_MENU} from 'utils/tlconstants';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function DashboardNavigation(props){
  var page = props.page;
  let userRole = props.userRole;

  const classes = useStyles();
 
  const [system_open, setSystemOpen] = React.useState(false);
  const [seo_open,setSEOOpen] = React.useState(false);
    
  const handleSEOClick = () => {
   
      setSEOOpen(!seo_open)
  };
  const handleSystemClick = () => {
    setSystemOpen(!system_open)
  };

  console.log('userrole ', userRole)


  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
        <Link href="/admin/sales/projects" passHref>
            <a>
            <ListItem button selected={page == 'sales'}>
                <ListItemIcon>
                    <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Sales" primaryTypographyProps={{color:"textPrimary"}} />
            </ListItem>
            </a>
        </Link> 

        {
            userRole === 'admin' &&
            ADMIN_SECTION_MENU.map((option, index) => (
                option.text === "Skill FAQ" || option.text === "Spam Keywords Detail" ?
                null
                :
                <Link href={option.link} passHref key={index} >
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

        {
            userRole === 'moderator' &&
            MODERATOR_SECTION_MENU.map((option, index) => (
                option.text === "Skill FAQ" || option.text === "Spam Keywords Detail" ?
                null
                :
                <Link href={option.link} passHref key={index} >
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
               
        <ListItem button onClick={handleSEOClick}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="SEO" primaryTypographyProps={{color:"textPrimary"}} />
          {seo_open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        <Collapse in={seo_open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href="/admin/skillfaq/list" passHref >
                <a>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ListAltIcon />
                      </ListItemIcon>
                      <ListItemText primary="Skills FAQ" primaryTypographyProps={{color:"textPrimary"}} />
                    </ListItem>
                </a>
            </Link>
          </List>
        </Collapse>
        
        {
            userRole === "admin" &&
            <React.Fragment>
                <ListItem button onClick={handleSystemClick}>
                    <ListItemIcon>
                    <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="System Info" primaryTypographyProps={{color:"textPrimary"}} />
                    {system_open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                
                <Collapse in={system_open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <Link href="/admin/spamkeywords/list" passHref >
                    <a>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <ListAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Spam List" primaryTypographyProps={{color:"textPrimary"}} />
                        </ListItem>
                    </a>
                    </Link>
                    </List>
                </Collapse> 
            </React.Fragment>
        }
      </List>
    </div>
  );
}
