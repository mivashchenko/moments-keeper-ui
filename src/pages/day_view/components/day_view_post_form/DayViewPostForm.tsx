import {
    Avatar,
    Box,
    Card, Divider,
    // FormControl,
    Grid,
    IconButton, ListItemIcon, Menu, MenuItem,
    // InputLabel,
    // MenuItem,
    // Select,
    // SelectChangeEvent,
    Stack,
    styled,
    TextField
} from "@mui/material";
import {TimePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import React, {useState} from "react";
import ImageSharpIcon from '@mui/icons-material/ImageSharp';
import AddReactionSharpIcon from '@mui/icons-material/AddReactionSharp';
import MoodBadTwoToneIcon from '@mui/icons-material/MoodBadTwoTone';
import MoodTwoToneIcon from '@mui/icons-material/MoodTwoTone';
import SentimentDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentDissatisfiedTwoTone';
import SentimentNeutralTwoToneIcon from '@mui/icons-material/SentimentNeutralTwoTone';
import SentimentSatisfiedTwoToneIcon from '@mui/icons-material/SentimentSatisfiedTwoTone';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const DayViewPostForm = () => {
    const [value, setValue] = useState<Dayjs | null>(null);

    // const [eventType, setEventType] = useState('');
    //
    // const handleChange = (event: SelectChangeEvent) => {
    //     setEventType(event.target.value as string);
    // };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <Grid item sx={{width: '700px',}}>
        <Card sx={{
            padding: '30px',
            maxWidth: '700px',
        }}>
            <TextField
                sx={{
                    mb: 4
                }}
                id="filled-multiline-flexible"
                label="How was your day?"
                multiline
                fullWidth
                rows={4}
            />

            <Box component="div" sx={{mb: 2}}>
                <Stack direction="row" spacing={2}>
                    <TimePicker
                        value={value}
                        onChange={setValue}
                        referenceDate={dayjs('2022-04-17')}
                    />
                    {/*<FormControl fullWidth>*/}
                    {/*    <InputLabel id="demo-simple-select-label">Event</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        labelId="demo-simple-select-label"*/}
                    {/*        id="demo-simple-select"*/}
                    {/*        value={eventType}*/}
                    {/*        label="Age"*/}
                    {/*        onChange={handleChange}*/}
                    {/*    >*/}
                    {/*        <MenuItem value={10}>Ten</MenuItem>*/}
                    {/*        <MenuItem value={20}>Twenty</MenuItem>*/}
                    {/*        <MenuItem value={30}>Thirty</MenuItem>*/}
                    {/*    </Select>*/}
                    {/*</FormControl>*/}
                </Stack>
            </Box>

            <Box component="div" sx={{p: 2}}>
                <IconButton color="primary" component="label" size="large">
                    <ImageSharpIcon/>
                    <VisuallyHiddenInput type="file"/>
                </IconButton>

                <IconButton color="primary" component="label" size="large" onClick={handleClick}>
                    <AddReactionSharpIcon/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                    <MenuItem onClick={handleClose}>
                        <SentimentDissatisfiedTwoToneIcon color="primary"/>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <MoodBadTwoToneIcon color="primary"/>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <SentimentNeutralTwoToneIcon color="primary"/>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <MoodTwoToneIcon color="primary"/>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <SentimentSatisfiedTwoToneIcon color="primary"/>
                    </MenuItem>
                </Menu>

                <IconButton color="primary" component="label" size="large">
                    <AddLocationAltIcon/>
                </IconButton>

            </Box>
        </Card>
    </Grid>


}