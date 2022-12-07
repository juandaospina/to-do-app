import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { firebaseAuth } from './config';

const provider = new GoogleAuthProvider();

export const signInGoogle = async () => {
    try {
        const response = await signInWithPopup(firebaseAuth, provider);
        const { uid, email, displayName, photoURL } = response.user;
        return {
            status: true,
            uid,
            email,
            displayName,
            photoURL
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            status: false,
            errorCode,
            errorMessage
        }
    }
} 


export const registerUserWithEmailAndPassword = async ({ email, password }) => {
    try {
        const result = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        const { uid, photoURL } = result.user;

        return {
            status: true,
            uid,
            photoURL
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const message = errorCode.includes('auth/email-already-in-use') ? 'El correo ya ha sido registrado' : 'Error: Inténtelo de nuevo más tarde'
        return {
            status: false,
            errorCode: message,
            errorMessage
        }
    }
}

export const loginWithEmailAndPassword = async ({ email, password }) => {
    try {
        const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, photoURL, displayName } = result.user;

        return {
            status: true,
            uid,
            photoURL,
            displayName
        }
        
    } catch (error) {
        const errorCode = error.code;
        const message = errorCode.includes('auth/wrong-password') ? 'Contraseña incorrecta' : 'Usuario no encontrado'

        return {
            status: false,
            errorCode: message,
        }
    }
}

export const startSignOut = async () => {
    return await signOut(firebaseAuth);
}