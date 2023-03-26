import React, { useMemo, useEffect, useRef } from 'react'

import Swal from 'sweetalert2'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { SaveOutlined, UploadOutlined } from '@mui/icons-material'

import { ImageGallery } from '../../components/ImageGallery'
import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/slices/JournalNotes'
import { startSaveNote, startUploadingFiles } from '../../store/slices/JournalNotes/thunks'

export const NoteView = () => {

  const dispatch = useDispatch();
  const { active: note, messageSaved} = useSelector(state => state.JOURNAL);
  const { title, body, date, formState, onInputChange } = useForm(note);
  const inputRef = useRef();

  const dateString = useMemo(() => {
    const noteDate = new Date(date);
    return noteDate.toUTCString();
  }, [date])

  const onSaveNote = () => {
    dispatch(startSaveNote());
  }

  const onUploadingFile = ({target}) => {
    if(target.files === 0) return 
    dispatch(startUploadingFiles(target.files));
  }

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState])

  useEffect(() => {
    if(!!messageSaved) {
        Swal.fire('Se actualizo con éxito', messageSaved, 'success')
    }
  }, [messageSaved])


  return (
    <Grid 
        container 
        direction='row' 
        justifyContent='space-between'
        sx={{ mb: 1, border: "1px solid orange" }}
    >
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>
                {dateString}
            </Typography>
        </Grid>
        
        <Grid item>
            <input 
              type="file"
              multiple
              ref={inputRef}
              onChange={onUploadingFile}
              style={{display: 'none'}}
              />

            <IconButton 
              onClick={() => inputRef.current.click()}
            >
              <UploadOutlined />
            </IconButton>

            <Button color='primary' sx={{ padding: 2 }} onClick={onSaveNote}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                placeholder='Ingrese un título'
                label='Título'
                sx={{ border: 'none', mb: 1 }}
                name="title"
                value={title}
                onChange={onInputChange}
            />

            <TextField 
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='Qué sucedió en el día de hoy'
                minRows={5}
                name="body"
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        <ImageGallery 
          images={note.imagesUrls}
        />
    </Grid>
  )
}
