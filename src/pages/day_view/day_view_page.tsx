import {DayViewPostForm} from "@/pages/day_view/components/day_view_post_form";
import {Grid} from "@mui/material";

export const DayViewPage = () => {
    return <Grid
        sx={{height: '100%'}}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
    >
        <DayViewPostForm/>
    </Grid>
}