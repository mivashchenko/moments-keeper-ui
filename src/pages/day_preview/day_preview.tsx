import { eventsMock } from "@/mocks/events.ts";
import { DayPost } from "src/components/partials/day_post";
import { Box } from "@mui/material";
import { useRef, useState } from "react";
import { DayViewPostForm } from "src/components/partials/day_view_post_form";
import { TimelineEventType } from "@/types";
import { DayViewFormDataType } from "@/components/partials/day_view_post_form/day_view_post_form.tsx";
import dayjs from "dayjs";
import { AutoSizer, List } from "react-virtualized";
import { formattedByView, groupByTimeView } from "@/utils/time/fomatByView.ts";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { getEvents } from "@/pages/day_preview/utils.ts";
import {
  getDimensionColor,
  getDimensionIcon,
} from "@/utils/events/event_dimension_icons.tsx";
import { timelineOppositeContentClasses } from "@mui/lab";

type GroupedEvent = {
  timeGroupKey: string;
  items: TimelineEventType[];
};

export const DayPreviewPage = ({ view = "days" }) => {
  const groupedEvents = groupByTimeView(eventsMock, "days");

  const _events = getEvents(groupedEvents);

  const [events, setEvents] = useState<GroupedEvent[]>(_events);

  const listRef = useRef<List>();

  const handleAddEventClick = ({
    time,
    title,
    description,
    dimension,
  }: DayViewFormDataType) => {
    const newEvent: GroupedEvent = {
      timeGroupKey: formattedByView[view](time),
      items: [
        {
          time,
          content: {
            title,
            description,
          },
          dimension,
        },
      ],
    };
    const newEvents: GroupedEvent[] = [...events, newEvent].sort(
      (a, b) =>
        dayjs(a.timeGroupKey).valueOf() - dayjs(b.timeGroupKey).valueOf(),
    );
    setEvents(newEvents);
  };

  const rowHeight = ({ index }) => {
    return index === events.length - 1
      ? events[index].items.length * 1200
      : events[index].items.length * (548 + 44) + 24;
  };

  const timelineRenderer = (props) => {
    const { index, key, style } = props;
    const event = events[index];
    return (
      <Timeline
        key={key}
        // position="alternate"
        style={style}
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        <Box
          sx={{
            m: "0 auto",
          }}
        >
          {event.timeGroupKey}
        </Box>
        {event.items.map((event, index) => {
          return (
            <TimelineItem key={event.time}>
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                align="left"
                variant="body2"
                color="text.secondary"
              >
                {dayjs(event.time).format("HH:mm")}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot
                  sx={{
                    background: getDimensionColor(event.dimension).secondary,
                  }}
                >
                  {getDimensionIcon(event.dimension)}
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <DayPost
                    time={event.time}
                    title={event.content.title}
                    description={event.content.description}
                  />
                  {index === events.length - 1 && (
                    <Box
                      sx={{
                        marginBottom: "30px",
                        width: "100%",
                        maxWidth: "600px",
                      }}
                    >
                      <DayViewPostForm onSubmit={handleAddEventClick} />
                    </Box>
                  )}
                </Box>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100% - 40px)",
        bgcolor: "background.default",
      }}
    >
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={listRef}
            overscanRowCount={5}
            rowCount={events.length}
            rowHeight={rowHeight}
            rowRenderer={timelineRenderer}
            width={width}
            height={height - 1}
            scrollToIndex={events.length - 1}
          />
        )}
      </AutoSizer>
    </Box>
  );
};
