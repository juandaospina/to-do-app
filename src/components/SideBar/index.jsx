import { TurnedInNot } from '@mui/icons-material';
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarItem } from '../SideBarItem';

export const SideBar = ({ drawerWidth = 240 }) => {

  const { displayName } = useSelector(state => state.AUTH);
  const { notes } = useSelector(state => state.JOURNAL);

  return (
    <Box
        component='nav'
        style={{ border: "2px solid #00ffcb"}}
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, border: "2px solid #00ffcb"}}
    >
        <Drawer
            variant='permanent'
            open
            sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    {displayName} 
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    notes.map( note => (
                        <SideBarItem key={note.id} {...note} />
                    ))
                }
            </List>
        </Drawer>
    </Box>
  )
}
