import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { addNewEmptyNote, savingNewNote, setActiveNote, setImagesToActiveNote, setNotes, updateNote } from '.';
import { firebaseDB } from '../../../firebase/config';
import { loadNotes } from '../../../helpers/loadNotes';
import { uploadFiles } from '../../../helpers/uploadFiles';


export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());
        const { uid } = getState().AUTH;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDocument = doc(collection(firebaseDB, `${uid}/journal/notes`));
        await setDoc(newDocument, newNote);

        newNote.id = newDocument.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().AUTH;
        if(!uid) throw new Error('UID not found or not exist');
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().AUTH;
        const { active: note} = getState().JOURNAL;
        console.log("[SAVE_ACTIVE_NOTE]", note);

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, note, {merge: true})
        dispatch(updateNote(note));
    }
} 

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(savingNewNote());

        const promiseFilesUpload = [];
        for (const file of files) {
            promiseFilesUpload.push(uploadFiles(file));
        }

        const imagesUrls = await Promise.all(promiseFilesUpload);
        console.log("[imageUrls]", imagesUrls)
        dispatch(setImagesToActiveNote(imagesUrls));
    }
}