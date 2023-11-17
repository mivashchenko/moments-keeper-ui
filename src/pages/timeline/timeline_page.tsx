import { Timeline } from "src/components/partials/timeline";
import { TimelineEventType } from "@/types";
import { useState } from "react";
import { DayViewFormDataType } from "@/components/partials/day_view_post_form/day_view_post_form.tsx";
import dayjs from "dayjs";
import { TimelineViewType } from "@/components/partials/timeline/timeline.tsx";
import { Button } from "@mui/material";
import { eventsMock } from "@/mocks/events.ts";

export const TimelinePage = () => {
  const [events, setEvents] = useState<TimelineEventType[]>(eventsMock);
  const [selectedView, setSelectedView] = useState<TimelineViewType>("days");

  const handleAddEventClick = ({
    time,
    title,
    description,
  }: DayViewFormDataType) => {
    const newEvent: TimelineEventType = {
      time,
      content: {
        title,
        description,
      },
    };
    const newEvents = [...events, newEvent].sort(
      (a, b) => dayjs(a.time).valueOf() - dayjs(b.time).valueOf(),
    );
    setEvents(newEvents);
  };

  const views: TimelineViewType[] = ["days", "weeks"];

  const handleViewChange = (view: TimelineViewType) => () => {
    setSelectedView(view);
  };

  return (
    <div>
      {views.map((view) => {
        return (
          <Button key={view} onClick={handleViewChange(view)}>
            {view}
          </Button>
        );
      })}
      <Timeline
        view={selectedView}
        events={events}
        onAddEventClick={handleAddEventClick}
      />
    </div>
  );
};
