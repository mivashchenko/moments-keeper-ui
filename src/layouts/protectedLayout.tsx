import {Link, Navigate, Outlet} from "react-router-dom";
import {useAuth} from "@/services/auth";
import {
    Box,
    Button,
    Container, Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useState} from "react";
// import {useSelector} from "react-redux";

export const ProtectedLayout = () => {
    const {user} = useAuth();
    const [state, setState] = useState(false);
    const toggleDrawer =
        (open: boolean) =>
            () => {
                setState(open);
            };

    // const data = useSelector((state) => state.user.data);
    if (!user) {
        return <Navigate to="/"/>;
    }

    const list = () => (
        <Box
            component={'div'}
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {[
                    {
                        label: 'Timeline',
                        url: '/view/timeline'
                    },
                    {
                        label: 'Profile',
                        url: '/view/profile'
                    },
                    {
                        label: 'Settings',
                        url: '/view/settings'
                    }
                ].map(({label, url}, index) => (
                    <Link key={index} to={url}><ListItem key={label} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={label}/>
                        </ListItemButton>
                    </ListItem></Link>
                ))}
            </List>
            <Divider/>
            <List>
                {['Logout'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <Container maxWidth={false} sx={{height: '100vh'}}>
            {/*<nav>*/}
            {/*    <Link to="/view/day">Day view</Link>*/}
            {/*    <Link to="/view/settings">Settings</Link>*/}
            {/*    <Link to="/view/profile">Profile</Link>*/}
            {/*    <Link to="/view/calendar">Calendar</Link>*/}
            {/*</nav>*/}
            <Button onClick={toggleDrawer(true)}>{'open menu'}</Button>
            <Drawer
                anchor={'left'}
                open={state}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
            <Outlet/>
        </Container>
    )
};