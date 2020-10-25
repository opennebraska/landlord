import React from "react";
import PropTypes from 'prop-types'
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from '@material-ui/core/Hidden';
import {Link} from "react-router-dom";
import {Home, Info, LocationCity, Map, TrendingDown} from "@material-ui/icons";
import { Icon } from '@iconify/react';
import slackIcon from '@iconify/icons-mdi/slack';
import githubIcon from '@iconify/icons-mdi/github';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  logo: {
    maxWidth: 30,
    marginRight: 10
  },
  footer: {
    bottom: 0,
    marginTop: "auto",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  footerBody: {
    padding: theme.spacing(2, 2),
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  footerCopyright: {
    bottom: 0,
    padding: theme.spacing(1, 0),
    textAlign: "center",
    marginTop: "auto",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText
  },
  footerLink: {
    color: theme.palette.primary.contrastText
  }
}));

export default function MainAppBar(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = (variant) => {
    setMobileOpen(variant === "temporary" && !mobileOpen);
  };

  const drawer = (variant) => (
      <div>
        <div className={classes.toolbar}/>
        <Divider/>
        <List>
          {[{text: "Home", link: "/", icon: <Home/>},
            {text: "Out of Omaha", link: "/out-of-omaha", icon: <LocationCity/>},
            {text: "Out of State", link: "/out-of-state", icon: <Map/>},
            {text: "Low Condition", link: "/low-condition", icon: <TrendingDown/>},
            {text: "About", link: "/about", icon: <Info/>}
          ].map((menuItem) => (
              <ListItem button component={Link} to={menuItem.link} onClick={() => handleDrawerToggle(variant)} key={menuItem.link}>
                <ListItemIcon>
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText primary={menuItem.text}/>
              </ListItem>
          ))}
        </List>
      </div>
  );


  return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => handleDrawerToggle("temporary")}
                className={classes.menuButton}
            >
              <MenuIcon/>
            </IconButton>
            <img src="/landlord/favicon.png" alt="logo" className={classes.logo}/>
            <Typography variant="h6" noWrap>
              Landlords of Omaha
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden mdUp implementation="css">
            <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={() => handleDrawerToggle("temporary")}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
            >
              {drawer("temporary")}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
              {drawer("permanent")}
            </Drawer>
          </Hidden>
        </nav>
        <div className={classes.contentWrapper}>
          <main className={classes.content}>
            <div className={classes.toolbar}/>
            {props.children}
          </main>

          <footer className={classes.footer}>
            <div className={classes.footerBody}>
              <Typography variant="body2" component="p">Learn more about this project:</Typography>
              <Box display="flex" justifyContent="center">
                <Box m={1} p={1}>
                  <a className={classes.footerLink} rel="noreferrer" target="_blank" href="https://openne.slack.com/messages/housing"><Icon icon={slackIcon} width="36" height="36" /></a>
                </Box>
                <Box m={1} p={1}>
                  <a className={classes.footerLink} rel="noreferrer" target="_blank" href="https://github.com/opennebraska/landlord"><Icon icon={githubIcon} width="36" height="36" /></a>
                </Box>
              </Box>
            </div>
            <div className={classes.footerCopyright}>
              <Typography variant="body2">
                {`Copyright © `}
                <a className={classes.footerLink} href="https://www.codefornebraska.org/">Code for Nebraska</a>
                {` ${new Date().getFullYear()}`}
              </Typography>
            </div>
          </footer>
        </div>
      </div>
  );
}

MainAppBar.propTypes = {
    children: PropTypes.node
}
