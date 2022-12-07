import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/slices/JournalNotes";

export const SideBarItem = ({id, title, body, date, imagesUrls = []}) => {

    const dispatch = useDispatch();

    const onActiveNote = () => {
        dispatch(setActiveNote({id, title, body, date, imagesUrls}))
    }

    return (
        <ListItem disablePadding onClick={onActiveNote}>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={title} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}