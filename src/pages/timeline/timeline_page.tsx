import {Timeline} from "@/components/timeline";
import {TimelineEventType} from "@/types";
import {useState} from "react";
import {DayViewFormDataType} from "@/pages/timeline/components/day_view_post_form/DayViewPostForm.tsx";
import dayjs from "dayjs";
import {TimelineViewType} from "@/components/timeline/timeline.tsx";
import {Button} from "@mui/material";

const additionalEvents = [
    {
        time: '2023-10-16T10:15:00.000Z',
        content: {
            title: 'Product Release Meeting',
            description: 'Plan and discuss the release of our latest product version.'
        }
    },
    {
        time: '2023-10-17T14:00:00.000Z',
        content: {
            title: 'Training Workshop on UX Design',
            description: 'Improve your user experience design skills with hands-on training.'
        }
    },
    {
        time: '2023-10-18T09:30:00.000Z',
        content: {
            title: 'Marketing Strategy Meeting',
            description: 'Review and adjust our marketing strategies for the upcoming quarter.'
        }
    },
    {
        time: '2023-10-19T13:45:00.000Z',
        content: {
            title: 'Code Review Session',
            description: 'Collaborate with the team to review and improve our codebase.'
        }
    },
    {
        time: '2023-10-25T15:00:00.000Z',
        content: {
            title: 'Project Kickoff Meeting',
            description: 'Start a new project with a clear roadmap and objectives.'
        }
    },
    {
        time: '2023-10-20T11:30:00.000Z',
        content: {
            title: 'Client Demo and Feedback Session',
            description: 'Present project updates to the client and gather feedback.'
        }
    },
    {
        time: '2023-05-25T17:00:00.000Z',
        content: {
            title: 'Company All-Hands Meeting',
            description: 'Discuss company achievements, updates, and future plans.'
        }
    },
    {
        time: '2023-10-22T08:45:00.000Z',
        content: {
            title: 'Product Testing Phase Begins',
            description: 'Start rigorous testing of the new product features.'
        }
    },
    {
        time: '2023-10-23T12:00:00.000Z',
        content: {
            title: 'Holiday Celebration Party',
            description: 'Celebrate the festive season with colleagues and friends.'
        }
    },
    {
        time: '2023-10-24T10:30:00.000Z',
        content: {
            title: 'Quarterly Review and Planning',
            description: 'Analyze the past quarter and strategize for the next one.'
        }
    },
    {
        time: '2023-10-25T16:20:00.000Z',
        content: {
            title: 'UI/UX Redesign Meeting',
            description: 'Discuss and plan a complete redesign of the user interface.'
        }
    },
    {
        time: '2023-08-25T13:15:00.000Z',
        content: {
            title: 'Release Notes Preparation',
            description: 'Compile release notes for the upcoming software update.'
        }
    },
    {
        time: '2023-10-25T08:30:00.000Z',
        content: {
            title: 'Onboarding New Employees',
            description: 'Welcome and onboard new team members.'
        }
    },
    {
        time: '2023-10-27T14:45:00.000Z',
        content: {
            title: 'Holiday Charity Drive',
            description: 'Participate in a charity event to spread joy during the holidays.'
        }
    },
    {
        time: '2023-06-25T11:30:00.000Z',
        content: {
            title: 'Monthly Sales Review',
            description: 'Analyze sales data and performance for the previous month.'
        }
    },
    {
        time: '2023-07-25T09:15:00.000Z',
        content: {
            title: 'Customer Support Training',
            description: 'Train support staff to provide excellent customer service.'
        }
    },
    {
        time: '2023-11-26T16:30:00.000Z',
        content: {
            title: 'Product Launch Event',
            description: 'Launch our latest product with a grand unveiling.'
        }
    },
    {
        time: '2023-08-27T12:00:00.000Z',
        content: {
            title: 'Team Retreat and Bonding',
            description: 'Team-building activities in a scenic retreat location.'
        }
    },
    {
        time: '2023-09-25T13:30:00.000Z',
        content: {
            title: 'Tech Conference Attendance',
            description: 'Participate in a tech conference to stay updated with industry trends.'
        }
    }
];

export const TimelinePage = () => {
    const [events, setEvents] = useState<TimelineEventType[]>(additionalEvents)
    const [selectedView, setSelectedView] = useState<TimelineViewType>('day')

    const handleAddEventClick = ({time, title, description}: DayViewFormDataType) => {
        const newEvent: TimelineEventType = {
            time,
            content: {
                title,
                description
            }
        }
        const newEvents = [...events, newEvent].sort((a, b) => dayjs(a.time).valueOf() - dayjs(b.time).valueOf())
        setEvents(newEvents);
    }

    const views: TimelineViewType[] = ['day', 'week', 'month']

    const handleViewChange = (view: TimelineViewType) => () => {
        setSelectedView(view)
    }

    return <div>
        {views.map((view) => {
            return <Button key={view} onClick={handleViewChange(view)}>
                {view}
            </Button>
        })}
        <Timeline
            view={selectedView}
            events={events}
            format="hh:mm a"
            onAddEventClick={handleAddEventClick}
        />
    </div>
}