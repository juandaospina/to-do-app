import { Navigate, Route, Routes } from 'react-router-dom';

import { CheckingAuthLoader } from '../components/Loader';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { AuthRouter } from './AuthRouter';
import { JournalAppRouter } from './JournalAppRouter';

export const AppRouter = () => {

  const { status } = useCheckAuth();

  if(status === 'checking') {
    return <CheckingAuthLoader />
  }

  return (
    <Routes>
      {
        (status === 'authenticated')
          ? <Route path='/*' element={ <JournalAppRouter /> } />
          : <Route path='/auth/*' element={ <AuthRouter /> } />
      }

      <Route path='/*' element={ <Navigate to='/auth' /> } />
    </Routes>
  )
}


