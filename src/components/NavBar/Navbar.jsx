import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { LoginOutlined, MenuOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { checkingSignOut } from '../../store/slices/Auth/thunks';


export const Navbar = ({drawerWidth}) => {

  const dispatch = useDispatch();  

  const onLogout = () => {
    dispatch(checkingSignOut());
  }

  return (
    <AppBar
        position='fixed'
        sx={{
            width: {sm: `calc(100% - ${drawerWidth}px)`},
            ml: { sm: `${ drawerWidth }px` }
        }}
    >   
        <Toolbar>
            <IconButton
                color='inherit'
                edge='start'
                sx={{mr: 2, display: { sm: 'none'}}}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'>Journal App</Typography>
                <IconButton 
                    color='error'
                    onClick={onLogout}
                >
                    <LoginOutlined />
                </IconButton>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}
