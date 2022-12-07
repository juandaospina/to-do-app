import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { JournalLayout } from "../../containers/Layout/JournalLayout"
import { NoteView } from "../../containers/NoteView"

import { NothingSelectedView } from "../../containers/NothingSelectedView"
import { startLoadingNotes, startNewNote } from "../../store/slices/JournalNotes/thunks"

export const HomePage = () => {

  const { isSaving, active } = useSelector(state => state.JOURNAL);
  const dispatch = useDispatch();  

  const onSubmitNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      { 
        !!active
          ? <NoteView />
          : <NothingSelectedView />
      }

      <IconButton
        onClick={onSubmitNote}
        size="large"
        disabled={ isSaving }
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} /> 
      </IconButton>

    </JournalLayout>
  )
}
