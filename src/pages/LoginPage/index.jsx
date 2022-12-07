import { useMemo } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"

import { AuthLayout } from '../../containers/Layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { checkingAuthenticated, checkingSignInWithEmailAndPassword } from "../../store/slices/Auth/thunks";


const formData = {
  email: "",
  password: ""
}


export const LoginPage = () => {
  const { status, errorMessage } = useSelector( state => state.AUTH );
  const dispatch = useDispatch();
  const isAuthenticating = useMemo(() => status === 'checking', [status])
  // console.log("ENV", import.meta.env.VITE_DATABASE_REACT_JOURNAL_APP);

  const { formState, email, password, onInputChange } = useForm(formData);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(checkingSignInWithEmailAndPassword(formState))
  }

  const onGoogleSignIn = () => {
    dispatch(checkingAuthenticated());
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={ onSubmit }>
        <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Correo electrónico" 
                  placeholder="name@email.com"
                  type="email"
                  fullWidth
                  name='email'
                  value={email}
                  onChange={ onInputChange }
                />
              </Grid>
                
              <Grid item xs={ 12 } sx={{ mt: 1, mb: 2 }}>
                <TextField 
                  label="Contraseña" 
                  placeholder="*********"
                  type="password"
                  fullWidth
                  name='password'
                  value={password}
                  onChange={ onInputChange }
                />
              </Grid>

              <Grid container spacing={2} sx={{mb: 2}}>

                  <Grid 
                    item 
                    xs={12} 
                    sm={6}
                    display={ !!errorMessage ? '' : 'none' }
                  >
                    <Alert
                      severity='error'
                    >
                      {errorMessage}
                    </Alert>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Button 
                      type='submit' 
                      variant="contained" 
                      fullWidth
                      disabled={isAuthenticating}
                    >
                        Login
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Button 
                      onClick={onGoogleSignIn} 
                      variant="contained" 
                      fullWidth
                      disabled={isAuthenticating}
                    >
                        <Google />
                        <Typography sx={{ml: 1}}>Google</Typography>
                    </Button>
                  </Grid>
              </Grid>

              <Grid 
                container
                direction='row'
                justifyContent='end'
              >
                {/* Este Link de mui no tiene funcionalidad de enrutamiento, pero al pasar la propiedad component podemos pasar el nodo html o component que ejecute la navegación */}
                <Link component={ RouterLink } color='inherit' to="/auth/register">
                  Crear una cuenta
                </Link>
              </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
