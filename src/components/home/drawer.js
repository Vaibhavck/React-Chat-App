import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addMessage} from '../../store/actions/messageActions';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import moment from 'moment';
import {signOut} from '../../store/actions/authActions';

import './home-style.css'
import Chat from './chat';
import { Avatar } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position: 'relative',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
        display: 'none',
        },
    },
  // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));



function ResponsiveDrawer(props) {

    var homeRedirect = props.auth.uid ? "/chats" : "/";

    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    var people = props.people.map(person=>{

        if(person.id !== props.userId)
            return (
                <Link onClick={()=>props.onTap(person.username)} to={"/chats/" + person.username} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <ListItem button key={person.username}>
                            <ListItemIcon><img alt="profile-pic" src="https://image.flaticon.com/icons/png/128/3135/3135715.png"></img></ListItemIcon>
                            <ListItemText primary={person.name} />        
                            { person.online ? <ListItemText><i className="fas fa-circle" style={{color: "green"}}></i></ListItemText> : null }
                    </ListItem>
                </Link>
            );
    })

    const drawer = (
        <div>
            <Link className="navbar-brand" to={homeRedirect}><h3 className={classes.toolbar} id="float_bar" >ReactChatApp</h3></Link>
            <List>
                <ListItem button>
                    <ListItemIcon><img alt="profile-pic" src="https://image.flaticon.com/icons/png/128/3135/3135715.png"></img></ListItemIcon>
                    <ListItemText primary={props.profile.name} />        
                </ListItem>
            </List>
            <Divider/>
            <List>
                <Accordion elevation={0}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}><ListItemIcon><Icon className="fas fa-comments-alt" /></ListItemIcon>Chats</Typography>
                    </AccordionSummary>
                    <List>
                        {people}
                    </List>
                </Accordion>
            </List>
            <Divider/>
            <List>
                <ListItem button>
                    <ListItemIcon><Icon className="fas fa-user-circle" /></ListItemIcon>
                    <ListItemText primary="Account" />        
                </ListItem> 
                <ListItem button>
                    <ListItemIcon><Icon className="fas fa-cog" /></ListItemIcon>
                    <ListItemText primary="Settings" />        
                </ListItem> 
                <ListItem button onClick={()=>props.signOut(props.userId)}>
                    <ListItemIcon><Icon className="fas fa-sign-out-alt" /></ListItemIcon>
                    <ListItemText primary="Logout" />        
                </ListItem> 
            </List>
        </div>
  );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                <ListItem>
                    { props.currentUser !== null ? <ListItemAvatar>
                    <Avatar alt="Profile Picture" src="https://image.flaticon.com/icons/png/128/3135/3135715.png" />
                    </ListItemAvatar> : null}
                    <ListItemText>
                        {props.currentUser === null ? "Select Chat" : props.currentUser.name}
                    </ListItemText>
                </ListItem>
            </Typography>
            </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
            <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                paper: classes.drawerPaper,
                }}
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
            <Drawer
                classes={{
                paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                {drawer}
            </Drawer>
            </Hidden>
        </nav>
        <main className="container-fluid">
                <div className={classes.toolbar} />
                {props.chatComponent}
        </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const mapStateToProps = (state) => {
    var messages = [];
    if(state.firestore.ordered.messages){
        messages = state.firestore.ordered.messages;
    }
    return {
        messages: messages,
        profile: state.firebase.profile,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (message, messageId) => dispatch(addMessage(message, messageId)),
        signOut: (userId)=> dispatch(signOut(userId)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: "messages"}
    ])
)(ResponsiveDrawer)
