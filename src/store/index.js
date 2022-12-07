import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/Auth";
import { journalSlice } from "./slices/JournalNotes";

export const store = configureStore({
    reducer: {  
        'AUTH': authSlice.reducer,
        'JOURNAL': journalSlice.reducer
    }
})