import dayjs from "dayjs";

export const getEvents = (groupedEvents) =>
  Object.keys(groupedEvents)
    .map((groupedEvent) => {
      return {
        timeGroupKey: groupedEvent,
        items: groupedEvents[groupedEvent],
      };
    })
    .sort(
      (a, b) =>
        dayjs(a.timeGroupKey).valueOf() - dayjs(b.timeGroupKey).valueOf(),
    );
