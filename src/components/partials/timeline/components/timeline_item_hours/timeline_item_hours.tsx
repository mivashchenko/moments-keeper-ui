import { Box, Stack, styled } from "@mui/material";
import { getSunriseSunsetColor } from "@/components/partials/timeline/utils.ts";
import { groupBy } from "underscore";
import dayjs from "dayjs";

const Hour = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "28px",
  padding: "15px 5px",
  margin: "0 2px",
  color: theme.palette.primary.contrastText,
}));

export const TimelineItemHours = ({ events, formattedEvents }) => {
  const hoursArray = [];
  for (let hour = 0; hour < 24; hour++) {
    hoursArray.push(hour);
  }

  const groupedByHour = groupBy(events, (event) => {
    return dayjs(event.time).hour();
  });

  return (
    <Stack direction="row">
      {hoursArray.map((hour) => {
        return (
          <Hour
            key={hour}
            sx={{
              background: getSunriseSunsetColor(hour),
              borderTopLeftRadius: hour === 0 ? "12px" : "initial",
              borderBottomLeftRadius: hour === 0 ? "12px" : "initial",
              borderTopRightRadius: hour === 23 ? "12px" : "initial",
              borderBottomRightRadius: hour === 23 ? "12px" : "initial",
              border: Object.keys(groupedByHour).includes(
                String(((hour + 11) % 12) + 1),
              )
                ? "2px solid red"
                : "initial",
            }}
          >
            <span
            // style={{ textShadow: "1px 1px 2px black" }}
            >
              {((hour + 11) % 12) + 1}
              {hour === 0 ? ":AM" : ""}
              {hour === 23 ? ":PM" : ""}
            </span>
          </Hour>
        );
      })}
    </Stack>
  );
};
