import { updateProfile } from "firebase/auth";

import { firebaseAuth } from "../../../firebase/config";
import { chekingCredentials, login, logout } from "."
import { 
    loginWithEmailAndPassword, 
    registerUserWithEmailAndPassword, 
    signInGoogle, 
    startSignOut 
} from "../../../firebase/providers";
import { clearInitialState } from "../JournalNotes";


export const checkingAuthenticated = () => {
    return async (dispatch) => {
        dispatch(chekingCredentials());
        const result = await signInGoogle();
        if (!result.status) return dispatch(logout(result));
        dispatch(login(result));
    }
}

export const checkingRegisterUser = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(chekingCredentials());

        const { status, uid, photoURL, errorCode } = await registerUserWithEmailAndPassword({ email, password });
        await updateProfile(firebaseAuth.currentUser, { displayName });

        if(!status) return dispatch(logout({errorCode}));
        dispatch(login({ uid, photoURL, displayName, email, errorCode}));
    }
}

export const checkingSignInWithEmailAndPassword = ({email, password}) => {
    return async (dispatch) => {
        dispatch(chekingCredentials());
        const { status, uid, photoURL, displayName, errorCode } = await loginWithEmailAndPassword({email, password})

        if(!status) return dispatch(logout({errorCode}));
        dispatch(login({uid, photoURL, displayName, email, errorCode}));
    }
}

export const checkingSignOut = () => {
    return async (dispatch) => {
        try {
            await startSignOut();  
            dispatch(clearInitialState());
            dispatch(logout());  
        } catch (error) {
            console.log(error);
        }
    }     
}