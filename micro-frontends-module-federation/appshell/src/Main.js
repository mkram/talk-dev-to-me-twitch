import React, {useState, Suspense} from "react";
import { Route, Routes, Link} from "react-router-dom";
import clsx from 'clsx';
import { useTheme, StyledEngineProvider } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Catalogue = React.lazy(() => import("Catalogue/Catalogue"));
const SignIn = React.lazy(() => import("SignIn/SignIn"));
const MyAccount = React.lazy(() => import("MyAccount/MyAccount"));

const drawerWidth = 240;


const renderMFE = (MFE) => {
    return(
        <Suspense fallback="Loading...">
            <MFE />
        </Suspense>
    )
}

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    
  }));

const Main = () => {
    const [theToken, setToken] = useState("");

    const onRetrieveToken = () => {
        setToken(window.sessionStorage.getItem("token"))
    }

    const { classes } = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return(
      <StyledEngineProvider injectFirst>
          <div className={classes.root}>
              <CssBaseline />
              <AppBar
                  position="fixed"
                  className={clsx(classes.appBar, {
                  [classes.appBarShift]: open,
                  })}>
                  <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Gadgets shop
                    </Typography>
                  </Toolbar>
              </AppBar>
              <Drawer
                  className={classes.drawer}
                  variant="persistent"
                  anchor="left"
                  open={open}
                  classes={{
                  paper: classes.drawerPaper,
                  }}>
                  <div className={classes.drawerHeader}>
                  <IconButton onClick={handleDrawerClose}>
                      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                  </div>
                  <Divider />
                  <List>
                    <ListItem button key="SignIn">
                        <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                        <Link to="/"><ListItemText primary="Sign In" /></Link>
                    </ListItem>
                    <ListItem button key="Catalogue">
                        <ListItemIcon><ViewListIcon/></ListItemIcon>
                        <Link to="/shop"><ListItemText primary="Catalogue" /></Link>
                    </ListItem>
                    <ListItem button key="My Account">
                        <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                        <Link to="/myaccount"><ListItemText primary="My Account" /></Link>
                    </ListItem>
                  </List>
                  <Divider />
                  <Button variant="contained" onClick={onRetrieveToken}>Get Token</Button>           
                  <TextField
                      id="standard-read-only-input"
                      label="Read Only"
                      value={theToken}
                      InputProps={{
                          readOnly: true,
                      }}/>
              </Drawer>
              <main className={clsx(classes.content, {
                      [classes.contentShift]: open,
                  })}>
                  <div className={classes.drawerHeader} />
                    <Routes>
                        <Route index element={ renderMFE(SignIn) }/>
                        <Route path="/shop/*" element={ renderMFE(Catalogue) } />
                        <Route path="/myaccount" element={ renderMFE(MyAccount) }/>
                    </Routes>
              </main>

          </div>
        </StyledEngineProvider>)
}

export default Main;