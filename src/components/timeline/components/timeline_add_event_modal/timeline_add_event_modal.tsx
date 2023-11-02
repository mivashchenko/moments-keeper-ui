import { Backdrop, Box, Dialog, Fade, Grid } from "@mui/material";
import { TimelineAddEventForm } from "@/pages/timeline/components/day_view_post_form";

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
            <TimelineAddEventForm onSubmit={onAddEvent} />
          </Grid>
        </Box>
      </Fade>
    </Dialog>
  );
};
