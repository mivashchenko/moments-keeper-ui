import { Box, Stack, styled } from "@mui/material";
import { getSunriseSunsetColor } from "@/components/timeline/components/timeline_item_hours/utils.ts";

const Hour = styled(Box)(({ theme }) => ({
  padding: "15px 5px",
  margin: "0 2px",
  color: theme.palette.primary.contrastText,
}));

export const TimelineItemHours = ({ events }) => {
  const hoursArray = [];
  for (let hour = 0; hour < 24; hour++) {
    hoursArray.push(hour);
  }

  return (
    <Stack direction="row">
      <Hour
        sx={{
          background: getSunriseSunsetColor(0),
          borderTopLeftRadius: "12px",
          borderBottomLeftRadius: "12px",
        }}
      >
        AM
      </Hour>
      {hoursArray.map((hour) => {
        return (
          <Hour sx={{ background: getSunriseSunsetColor(hour) }}>
            <span style={{ textShadow: "1px 1px 2px black" }}>{hour + 1}</span>
          </Hour>
        );
      })}
      <Hour
        sx={{
          background: getSunriseSunsetColor(0),
          borderTopRightRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
      >
        PM
      </Hour>
    </Stack>
  );
};
