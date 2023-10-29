import dayjs, {OpUnitType} from "dayjs";
import {TimelineItem} from "./timeline_item.tsx";
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import {groupBy} from 'underscore';
import './style.scss'
import {Backdrop, Box, Dialog, Fade, Grid, IconButton} from "@mui/material";
import {useState} from "react";
import {TimelineEventType} from "@/types";
import {DayViewPostForm} from "@/pages/timeline/components/day_view_post_form";
import {DayViewFormDataType} from "@/pages/timeline/components/day_view_post_form/DayViewPostForm.tsx";

export type TimelineViewType = 'day' | 'week' | 'month';

const weekAndDay = (date: string) => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday'],
        prefixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
    // return prefixes[Math.floor(dayjs(date).date() / 7)] + ' ' + days[dayjs(date).day()];
    return prefixes[Math.floor(dayjs(date).date() / 7)];

}

const formattedByView = {
    day: (date: string) => dayjs(date).format('MMM DD YYYY'),
    week: (date: string) => weekAndDay(date) + ' week of ' + dayjs(date).format('MMM YYYY'),
    month: (date: string) => {
        return dayjs(date).format('MMM YYYY')
    },
}
function getFormattedData(events: TimelineEventType[], view: TimelineViewType = 'day') {

    return groupBy(events, (event) => {
        return formattedByView[view](event.time);
    });
}

type TimelineProps = {
    view: TimelineViewType,
    events: TimelineEventType[],
    format: string,
    onAddEventClick: (event: DayViewFormDataType) => void,
}

export const Timeline = ({view, events, onAddEventClick}: TimelineProps) => {
    const [addNewItemModalOpened, setAddNewItemModalOpened] = useState(false)
    const groupedEvents = getFormattedData(events, view);
    console.log(groupedEvents);
    const handleAddEventClick = (event: DayViewFormDataType) => {
        onAddEventClick(event)
        setAddNewItemModalOpened(false)
    }

    const handleCloseAddEventModal = () => {
        setAddNewItemModalOpened(false)
    }





    return (
        <div className="time-line-ctnr">
            {Object.entries(groupedEvents).map(([key]) => {
                return (
                    <ul className="time-line" key={key}>
                        <li className="time-label">
                            <span>{key}</span>
                        </li>
                        <TimelineItem view={view} events={groupedEvents[key]}/>
                    </ul>
                )
            })}
            <IconButton sx={{marginLeft: '9px'}} color="primary" size="large" onClick={() => {
                setAddNewItemModalOpened(true)
            }}>
                <AddCircleOutlineSharpIcon/>
            </IconButton>

            <Dialog
                open={addNewItemModalOpened}
                onClose={handleCloseAddEventModal}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={addNewItemModalOpened}>
                    <Box>
                        <Grid
                            sx={{height: '100%'}}
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <DayViewPostForm onSubmit={handleAddEventClick}/>
                        </Grid>
                    </Box>
                </Fade>
            </Dialog>
        </div>
    );
}