import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
//components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//Icon
import DehazeIcon from '@mui/icons-material/Dehaze';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DashboardIcon from '@mui/icons-material/Dashboard';

const SideDrawer = ({users,signOutUser}) => {
    //use state to open or close the sideDrawer (false is close)
    const [state,setState ] = useState(false);

    return(
        <>
            <DehazeIcon className='drawer_btn' onClick={()=>setState(true)}/>
            {/* anchor on right, set state to open and close */}
            <Drawer anchor={"right"} open={state} onClose={()=> setState(false)}>
                <Box sx={{ width:200 }}>
                    <List>
                        {/* Home */}
                        <ListItem
                            button
                            component={RouterLink}
                            to="/"
                            onClick={()=> setState(false)}
                        >
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItem>
                        {/* Mail */}
                        <ListItem
                            button
                            component={RouterLink}
                            to="/contact"
                            onClick={()=> setState(false)}
                        >
                            <ListItemIcon>
                                <MailIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Contact"/>
                        </ListItem>


                        { !users.auth ?
                            <ListItem
                                button
                                component={RouterLink}
                                to="/auth"
                                onClick={()=> setState(false)}
                            >
                                <ListItemIcon>
                                    <VpnKeyIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Sign in"/>
                            </ListItem>
                        :
                            <ListItem
                                button
                                onClick={()=> {
                                    signOutUser()
                                    setState(false)
                                }}
                            >
                                <ListItemIcon>
                                    <VpnKeyIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Sign out"/>
                            </ListItem>
                        }

                       


                        {/* dashboard */}
                        <>
                            <Divider/>
                            { users.auth ?
                            <ListItem
                               button
                               component={RouterLink}
                               to="/dashboard"
                               onClick={()=> setState(false)}
                            >
                                <ListItemIcon>
                                    <DashboardIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Dashboard"/>
                            </ListItem>
                            :null}
                        </>
                    </List>
                </Box>
            </Drawer>
        </>
    )

}

export default SideDrawer;
