import dayjs from "dayjs";
import { TimelineItem } from "./timeline_item.tsx";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { groupBy } from "underscore";
import "./style.scss";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { TimelineEventType } from "@/types";
import { DayViewFormDataType } from "@/pages/timeline/components/day_view_post_form/TimelineAddEventForm.tsx";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import { TimelineAddEventModal } from "@/components/timeline/components/timeline_add_event_modal";

export type TimelineViewType = "hour" | "day" | "week" | "month";

const weekAndDay = (date: string) => {
  const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    prefixes = ["First", "Second", "Third", "Fourth", "Fifth"];
  // return prefixes[Math.floor(dayjs(date).date() / 7)] + ' ' + days[dayjs(date).day()];
  return prefixes[Math.floor(dayjs(date).date() / 7)];
};

const formattedByView = {
  hour: (date: string) =>
    dayjs(date).set("hour", 0).set("minute", 0).set("second", 0).format(),
  day: (date: string) =>
    dayjs(date).set("hour", 0).set("minute", 0).set("second", 0).format(),
  week: (date: string) =>
    weekAndDay(date) + " week of " + dayjs(date).format("MM-YYYY"),
  month: (date: string) => {
    return dayjs(date).format("MMM YYYY");
  },
};

function getFormattedData(
  events: TimelineEventType[],
  view: TimelineViewType = "day",
) {
  return events.map((event) => {
    return {
      ...event,
      label: formattedByView[view](event.time),
    };
  });
}

type TimelineProps = {
  view: TimelineViewType;
  events: TimelineEventType[];
  onAddEventClick: (event: DayViewFormDataType) => void;
};

export const Timeline = ({ view, events, onAddEventClick }: TimelineProps) => {
  const [addNewItemModalOpened, setAddNewItemModalOpened] = useState(false);
  const formattedEvents = getFormattedData(events, view);
  const groupedEvents = groupBy(formattedEvents, "label");
  const handleAddEventClick = (event: DayViewFormDataType) => {
    onAddEventClick(event);
    setAddNewItemModalOpened(false);
  };

  const handleCloseAddEventModal = () => {
    setAddNewItemModalOpened(false);
  };

  const renderRow = React.memo(
    ({ data, index, style }: ListChildComponentProps) => {
      const key = data[index];
      return (
        <ul className="time-line" key={key} style={style}>
          <li className="time-label">
            <span>{key}</span>
          </li>
          <TimelineItem
            view={view}
            events={groupedEvents[key]}
            formattedEvents={formattedEvents}
          />
        </ul>
      );
    },
  );

  const rowHeights = Object.values(groupedEvents).map((event) => {
    return event.length * (394.06 + 31 + 31);
  });

  const { innerHeight, innerWidth } = window;
  return (
    <div
      className="time-line-ctnr"
      style={{
        height: `${innerHeight - 73 - 48}px`,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <VariableSizeList
        height={innerHeight - 73}
        width={"100%"}
        itemSize={(index: number) => rowHeights[index]}
        itemCount={Object.keys(groupedEvents).length}
        itemData={Object.keys(groupedEvents)}
      >
        {renderRow}
      </VariableSizeList>

      <IconButton
        sx={{ marginLeft: "9px" }}
        color="primary"
        size="large"
        onClick={() => {
          setAddNewItemModalOpened(true);
        }}
      >
        <AddCircleOutlineSharpIcon />
      </IconButton>

      <TimelineAddEventModal
        isOpened={addNewItemModalOpened}
        onCloseAddEventModal={handleCloseAddEventModal}
        onAddEvent={handleAddEventClick}
      />
    </div>
  );
};
