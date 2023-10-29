import {TimelineEventType} from "@/types";
import {TimelineViewType} from "@/components/timeline/timeline.tsx";
import {Typography} from "@mui/material";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

export type ContentRendererProps = {
    title: string,
    description: string,
}

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

export const TimelineItem = ({events, view}: TimelineItemProps) => {

    if (view === 'day') {
        return events.map((event) => {
            return <li className={'timeline-item-wrap'}>
                <PanoramaFishEyeIcon sx={{ fontSize: 10 }} className={'timeline-item-point'}/>
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
            <i className="fa"/>
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

    if (view === 'month') {

        return <li className={'timeline-item-wrap'}>
            {/*<i className="fa"/>*/}
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