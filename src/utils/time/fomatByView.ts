import dayjs from "dayjs";
import { TimelineEventType } from "@/types";
import { TimelineViewType } from "@/components/partials/timeline/timeline.tsx";
import { groupBy } from "underscore";

const weekAndDay = (date: string) => {
  // const days = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ],
  const prefixes = ["First", "Second", "Third", "Fourth", "Fifth"];
  // return prefixes[Math.floor(dayjs(date).date() / 7)] + ' ' + days[dayjs(date).day()];
  return prefixes[Math.floor(dayjs(date).date() / 7)];
};

export const formattedByView = {
  days: (date: string): string =>
    dayjs(date).set("hour", 0).set("minute", 0).set("second", 0).format(),
  day: (date: string) =>
    dayjs(date).set("hour", 0).set("minute", 0).set("second", 0).format(),
  weeks: (date: string) =>
    weekAndDay(date) + " week of " + dayjs(date).format("MM-YYYY"),
  month: (date: string) => {
    return dayjs(date).format("MMM YYYY");
  },
};

export const groupByTimeView = (
  events: TimelineEventType[],
  view: TimelineViewType,
) => {
  const eventsWithFormattedLabel = events.map((event) => {
    return {
      ...event,
      label: formattedByView[view](event.time),
    };
  });
  return groupBy(eventsWithFormattedLabel, "label");
};
