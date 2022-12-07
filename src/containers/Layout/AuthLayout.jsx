import { Grid, Typography } from '@mui/material';

export const AuthLayout = ({children, title}) => {
  return (
    <Grid 
     container
     direction="column"
     alignItems="center"
     justifyContent="center"
     sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
        <Grid 
            item
            xs={ 3 }
            sx={{ backgroundColor: 'white', padding: 3, borderRadius: 3 }}
        >
          <Typography 
            variant="h4">
            {title}
          </Typography>

          { children }
        </Grid>
    </Grid>
  )
}
