import { collection, getDocs } from "firebase/firestore/lite"
import { firebaseDB } from "../firebase/config"

export const loadNotes = async (uid = '') => {
    if (!uid) throw new Error('The uid its was not found')

    const querySnapshot = await getDocs(collection(firebaseDB, `${uid}/journal/notes`))
    const notes = []
    querySnapshot.forEach(doc => {
        notes.push({id: doc.id, ...doc.data()})
    })

    console.log("NOTES", notes);
    return notes;
}