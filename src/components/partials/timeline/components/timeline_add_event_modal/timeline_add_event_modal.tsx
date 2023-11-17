import { Backdrop, Box, Dialog, Fade, Grid } from "@mui/material";
import { DayViewPostForm } from "@/components/partials/day_view_post_form";

export const TimelineAddEventModal = ({
  isOpened,
  onCloseAddEventModal,
  onAddEvent,
}) => {
  return (
    <Dialog
      open={isOpened}
      onClose={onCloseAddEventModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpened}>
        <Box>
          <Grid
            sx={{ height: "100%" }}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <DayViewPostForm onSubmit={onAddEvent} />
          </Grid>
        </Box>
      </Fade>
    </Dialog>
  );
};
