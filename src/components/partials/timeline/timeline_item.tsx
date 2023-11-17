import { TimelineEventType } from "@/types";
import { TimelineViewType } from "@/components/partials/timeline/timeline.tsx";
import { Box, Card, Paper, Stack, styled, Typography } from "@mui/material";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import dayjs from "dayjs";
import { getDatesInMonthDisplay } from "@/components/partials/timeline/components/calendar_month_layout/calendar_month_layout.tsx";
import { TimelineItemDays } from "@/components/partials/timeline/components/timeline_item_days";
import { TimelineItemHours } from "@/components/partials/timeline/components/timeline_item_hours";
import { TimelineItemWeeks } from "@/components/partials/timeline/components/timeline_item_weeks";

export type ContentRendererProps = {
  title: string;
  description: string;
};

export type MonthContentRendererProps = {
  events: TimelineEventType[];
  month: number;
  formattedEvents: TimelineEventType[];
  // content: TimelineEventType
};

type TimelineItemProps = {
  view: TimelineViewType;
  events: TimelineEventType[];
  formattedEvents: TimelineEventType[];
};

const Item = styled(Box)(({ theme, currentMonth, isPrimaryColor }) => ({
  backgroundColor: currentMonth
    ? isPrimaryColor
      ? theme.palette.primary.main
      : "#fff"
    : "transparent",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "50px",
  height: "50px",
}));

const monthContentRenderer = ({
  events,
  formattedEvents,
}: MonthContentRendererProps) => {
  const month = dayjs(events[0].time).month();
  const year = dayjs(events[0].time).year();
  const weeks = getDatesInMonthDisplay(month, year);

  return weeks.map((week) => {
    return (
      <Stack direction={"row"}>
        {week.map((day, index) => {
          const includesEvent = formattedEvents.find((event) => {
            return dayjs(event.time).date() === dayjs(day.date).date();
          });
          return (
            <Item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              key={index}
              currentMonth={day.currentMonth}
              isPrimaryColor={includesEvent}
            >
              {day.currentMonth ? dayjs(day.date).date() : ""}
            </Item>
          );
        })}
      </Stack>
    );
  });
};

const TimelineItemWrap = styled(Box)((props) => ({
  marginTop: "18px",
  marginLeft: "70px",
}));

export const TimelineItem = ({
  events,
  view,
  formattedEvents,
}: TimelineItemProps) => {
  if (view === "days") {
    return (
      <TimelineItemWrap>
        <TimelineItemHours events={events} formattedEvents={formattedEvents} />
      </TimelineItemWrap>
    );
  }

  if (view === "weeks") {
    return (
      <TimelineItemWrap>
        <TimelineItemWeeks events={events} formattedEvents={formattedEvents} />
      </TimelineItemWrap>
    );
  }

  // if (view === "day") {
  //   return <TimelineItemDays events={events} />;
  // }
  // if (view === "week") {
  //   return (
  //     <li className={"timeline-item-wrap"}>
  //       <i className="fa" />
  //       <div>
  //         {events.map((event) => {
  //           return (
  //             <div className="timeline-item">
  //               <span className="time">{event.time}</span>
  //               <div className="timeline-item-content">
  //                 {contentRenderer(event.content)}
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </li>
  //   );
  // }

  // if (view === "month") {
  //   return (
  //     <li className={"timeline-item-wrap"}>
  //       <PanoramaFishEyeIcon
  //         color={"primary"}
  //         className={"timeline-item-point"}
  //       />
  //       <Box
  //         sx={{
  //           marginLeft: "100px",
  //         }}
  //       >
  //         {monthContentRenderer({ events, formattedEvents })}
  //       </Box>
  //     </li>
  //   );
  // }
};
