import { Box, Chip, Stack, styled } from "@mui/material";
import {
  days,
  getSunriseSunsetColor,
} from "@/components/partials/timeline/utils.ts";
import { groupBy } from "underscore";
import dayjs from "dayjs";

const Day = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "60px",
  padding: "15px 5px",
  margin: "0 2px",
  color: theme.palette.primary.contrastText,
}));

export const TimelineItemWeeks = ({ events, formattedEvents }) => {
  const daysArray = [];
  for (let hour = 0; hour < 7; hour++) {
    daysArray.push(hour);
  }

  const groupedByDay = groupBy(events, (event) => {
    return dayjs(event.time).weekday();
  });

  return (
    <Stack direction="row">
      {daysArray.map((day) => {
        return (
          <Day
            key={day}
            sx={{
              background: getSunriseSunsetColor(day),
              borderTopLeftRadius: day === 0 ? "12px" : "initial",
              borderBottomLeftRadius: day === 0 ? "12px" : "initial",
              borderTopRightRadius: day === 6 ? "12px" : "initial",
              borderBottomRightRadius: day === 6 ? "12px" : "initial",
              border: Object.keys(groupedByDay).includes(String(day))
                ? "2px solid red"
                : "initial",
            }}
          >
            <Box
            // style={{ textShadow: "1px 1px 2px black" }}
            >
              {days[day]}
              <Box>
                {groupedByDay[String(day)]?.map((item) => {
                  console.log(item.content.title);
                  return (
                    <Box
                      sx={{
                        maxWidth: "50px",
                        width: "50px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.content.title}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Day>
        );
      })}
    </Stack>
  );
};
