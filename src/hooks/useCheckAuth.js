import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firebaseAuth } from "../firebase/config";
import { login, logout } from "../store/slices/Auth";
import { startLoadingNotes } from "../store/slices/JournalNotes/thunks";

export const useCheckAuth = () => {

    const dispatch = useDispatch();
    const { status } = useSelector( state => state.AUTH);

    useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) =>  {
        if(!user) return dispatch(logout());
        const { uid, email, displayName, phoneNumber } = user;
        dispatch(login({uid, email, displayName, phoneNumber}));
        dispatch(startLoadingNotes());
    })
    }, [])

    return {
        status
    }
}