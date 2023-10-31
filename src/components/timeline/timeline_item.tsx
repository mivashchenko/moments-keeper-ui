import {TimelineEventType} from "@/types";
import {TimelineViewType} from "@/components/timeline/timeline.tsx";
import {Card, Typography} from "@mui/material";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import {groupBy} from "underscore";
import dayjs from "dayjs";


type TimelineItemProps = {
    view: TimelineViewType,
    events: TimelineEventType[],
}

const contentRenderer = ({title, description}: ContentRendererProps) => {
    return <div>
        <Typography variant="h6" gutterBottom>
            {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
            {description}
        </Typography>
    </div>
}

export type WeekContentRendererProps = {
    title: string,
    description: string,
    dayLabel: string,
}

const weekContentRenderer = ({title, description, dayLabel}: WeekContentRendererProps) => {
    return <div>
        {/*<Typography variant="h6" gutterBottom>*/}
        {/*    {title}*/}
        {/*</Typography>*/}
        {/*<Typography variant="body1" gutterBottom>*/}
        {/*    {description}*/}
        {/*</Typography>*/}
        {dayLabel}
    </div>
}

type WeekCardProps = {
    events: TimelineEventType[],
}

const WeekCard = ({events}: WeekCardProps) => {
    console.log(events);
    const days = [0, 1, 2, 3, 4, 5, 6];
    const weekEvents = groupBy(events, (event) => {
        return dayjs(event.time).day();
    })
    return <div className="timeline-item-week-card">
        {days.map((day) => {
            const weekDayEvents = weekEvents[day] || [];
            return <Card>
                {
                    weekDayEvents.map(
                        (event) => {
                            const dayLabel = dayjs().day(day).format('dddd');
                            return <div>
                                <span className="time">{event.time}</span>
                                <div className="timeline-item-content">{weekContentRenderer({
                                    ...event.content,
                                    dayLabel
                                })}</div>
                            </div>
                        }
                    )
                }
            </Card>
            // return <div>
            //     {weekDayEvents.map((event) => {
            //             return <div>
            //     <span className="time">
            //         {event.time}
            //     </span>
            //                 <div className="timeline-item-content">{contentRenderer(event.content)}</div>
            //             </div>
            //         }
            //     )}
            // </div>
        })
        }
    </div>
}

export const TimelineItem = ({events, view}: TimelineItemProps) => {

    if (view === 'day') {
        return events.map((event) => {
            return <li className={'timeline-item-wrap'}>
                <PanoramaFishEyeIcon sx={{fontSize: 10}} className={'timeline-item-point'}/>
                <div className="timeline-item">
                    <div className="timeline-item-content">
                        <span className="time">
                            {event.time}
                        </span>
                        {contentRenderer(event.content)}
                    </div>
                </div>
            </li>
        })
    }
    if (view === 'week') {

        return <li className={'timeline-item-wrap'}>
            <PanoramaFishEyeIcon sx={{fontSize: 10}} className={'timeline-item-point'}/>
            <div>
                <WeekCard events={events}/>
            </div>
        </li>
    }

    if (view === 'month') {

        return <li className={'timeline-item-wrap'}>
            <PanoramaFishEyeIcon className={'timeline-item-point'}/>
            <div>
                {events.map((event) => {
                    return <div className="timeline-item">
                    <span className="time">
                        {event.time}
                    </span>
                        <div className="timeline-item-content">{contentRenderer(event.content)}</div>
                    </div>
                })}
            </div>
        </li>
    }
}