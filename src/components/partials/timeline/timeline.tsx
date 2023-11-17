import dayjs from "dayjs";
import { TimelineItem } from "./timeline_item.tsx";
import { groupBy } from "underscore";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { AutoSizer, List } from "react-virtualized";
import { TimelineEventType } from "@/types";
import { DayViewFormDataType } from "@/components/partials/day_view_post_form/day_view_post_form.tsx";
import { TimelineAddEventModal } from "@/components/partials/timeline/components/timeline_add_event_modal";

export type TimelineViewType = "days" | "weeks";

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
  days: (date: string) =>
    dayjs(date).set("hour", 0).set("minute", 0).set("second", 0).format(),
  day: (date: string) =>
    dayjs(date).set("hour", 0).set("minute", 0).set("second", 0).format(),
  weeks: (date: string) =>
    weekAndDay(date) + " week of " + dayjs(date).format("MM-YYYY"),
  month: (date: string) => {
    return dayjs(date).format("MMM YYYY");
  },
};

function getFormattedData(events: TimelineEventType[], view: TimelineViewType) {
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

  const [list, setList] = useState([]);

  useEffect(() => {
    setList(
      Object.keys(groupedEvents).map((groupedEventKey) => ({
        groupedEventKey,
        isExpanded: false,
      })),
    );
  }, [events, view]);

  const listRef = useRef();

  const rowRenderer = (props) => {
    const { index, key, style } = props;
    const item = list[index];
    return (
      <ul className="timeline" key={key} style={style}>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            setList((prevState) => {
              const newList = [...prevState];
              newList[index] = {
                ...newList[index],
                isExpanded: !newList[index].isExpanded,
              };
              return [...newList];
            });
            listRef.current.recomputeRowHeights();
            listRef.current.forceUpdateGrid();
          }}
        >
          <li className="time-label">
            <span>{item.groupedEventKey}</span>
          </li>
          <TimelineItem
            view={view}
            events={groupedEvents[item.groupedEventKey]}
            formattedEvents={formattedEvents}
          />
          {item.isExpanded && (
            <div style={{ height: "100px", background: "red" }}>fsdfsdf</div>
          )}
        </div>
      </ul>
    );
  };

  const rowHeight = ({ index }) => {
    return list[index].isExpanded ? 200 : 120;
  };

  return (
    <div
      className="time-line-ctnr"
      style={{
        height: `calc(100vh - ${73 + 48}px)`,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={listRef}
            overscanRowCount={5}
            rowCount={list.length}
            rowHeight={rowHeight}
            rowRenderer={rowRenderer}
            width={width}
            height={height}
          />
        )}
      </AutoSizer>

      <TimelineAddEventModal
        isOpened={addNewItemModalOpened}
        onCloseAddEventModal={handleCloseAddEventModal}
        onAddEvent={handleAddEventClick}
      />
    </div>
  );
};
