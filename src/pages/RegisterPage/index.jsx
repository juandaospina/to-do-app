import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink} from 'react-router-dom';

import { AuthLayout } from '../../containers/Layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { checkingRegisterUser } from '../../store/slices//Auth/thunks';


const formData = {
  displayName: '', 
  email: '',
  password: ''
}

const formValidate = {
  displayName: [(value) => value.length >= 1, 'El nombre debe ser obligatorio' ],
  email: [(value) => value.includes('@'), 'Ingrese un correo válido'],
  password: [(value) => value.length >= 6, 'La contraseña debe de contener más de 6 carácteres']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector( state => state.AUTH);
  const [ formSubmitted, setFormSubmitted ] = useState(false);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const { 
    displayName, 
    email, 
    password, 
    onInputChange, 
    formState,
    displayNameValid, 
    emailValid, 
    passwordValid,
    isFormValid
   } = useForm(formData, formValidate); 

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return
    dispatch(checkingRegisterUser(formState))
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit}>
        <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Nombre completo" 
                  placeholder="Tu nombre"
                  fullWidth
                  type="text"
                  name='displayName'
                  value={displayName}
                  onChange={onInputChange}
                  error={ !!displayNameValid && formSubmitted }
                  helperText={displayNameValid}
                />
              </Grid>
              
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Correo electrónico" 
                  placeholder="name@email.com"
                  fullWidth
                  type="email"
                  name='email'
                  value={email}
                  onChange={onInputChange}
                  error={ !!emailValid && formSubmitted}
                  helperText={emailValid}
                />
              </Grid>
                
              <Grid item xs={ 12 } sx={{ mt: 1, mb: 2 }}>
                <TextField 
                  label="Contraseña" 
                  placeholder="*********"
                  fullWidth
                  type="password"
                  name='password'
                  value={password}
                  onChange={onInputChange}
                  error={ !!passwordValid && formSubmitted}
                  helperText={passwordValid}
                />
              </Grid>

              <Grid container spacing={2} sx={{mb: 2}}>

                  <Grid 
                    item 
                    xs={12} 
                    sm={6}
                    display={ !!errorMessage ? '' : 'none'}
                  >
                    <Alert
                      severity='error'
                    >
                      {errorMessage}
                    </Alert>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      type='submit'
                    >
                        Crear una cuenta
                    </Button>
                  </Grid>
              </Grid>

              <Grid 
                container
                direction='row'
                justifyContent='end'
              >
                {/* Este Link de mui no tiene funcionalidad de enrutamiento, pero al pasar la propiedad component podemos pasar el nodo html o component que ejecute la navegación */}
                <Typography sx={{ mr: 2 }}>¿Ya tienes una cuenta?</Typography>
                <Link component={ RouterLink } color='inherit' to="/auth/login">
                  Ingresar
                </Link>
              </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
