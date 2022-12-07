import { createSlice } from "@reduxjs/toolkit";


export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
            state.messageSaved = ""
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false
        },
        setActiveNote: (state, action) => {
            state.active  = action.payload
            state.messageSaved =  ""
        },
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        setSavingNote: (state, action) => {
            
        },
        updateNote: (state, action) => {
            state.notes = state.notes.map(note => 
                note.id == action.payload.id 
                    ? {...action.payload}
                    : {...note}
            )
            state.messageSaved = `La nota ${action.payload.title} ha sido actualizada`
        },
        setImagesToActiveNote: (state, action) => {
            state.active.imagesUrls = [ ...state.active.imagesUrls, ...action.payload]
            state.isSaving = false
        },
        clearInitialState: (state) => {
            state.isSaving = false,
            state.messageSaved = '',
            state.notes = [],
            state.active = null
        },
        deleteNoteById: (state, action) => {
            
        }
    }
})

export const { 
    savingNewNote, 
    addNewEmptyNote, 
    setActiveNote, 
    setNotes, 
    setSavingNote,
    updateNote, 
    deleteNoteById,
    setImagesToActiveNote,
    clearInitialState
} = journalSlice.actions;