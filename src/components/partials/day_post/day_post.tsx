import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditSharpIcon from "@mui/icons-material/EditSharp";

export const DayPost = ({ title, time, description }) => {
  const renderImage = () => {
    return (
      <Box
        sx={{
          padding: "24px 24px 8px 24px",
          height: "30%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "6px",
          }}
          component={"img"}
          src={"https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"}
          alt={"item.title"}
          loading="lazy"
        />
      </Box>
    );
  };

  const renderCardActions = () => {
    return (
      <CardActions
        disableSpacing
        sx={{
          justifyContent: "space-between",
        }}
      >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>

        <Box>
          <IconButton aria-label="add to favorites">
            <EditSharpIcon />
          </IconButton>
          <IconButton aria-label="share">
            <DeleteSharpIcon />
          </IconButton>
        </Box>
      </CardActions>
    );
  };

  const renderCardHeader = () => {
    return (
      <CardHeader
        sx={{
          padding: "0 24px",
        }}
        title={title}
      />
    );
  };

  const renderCardContent = () => {
    return (
      <CardContent
        sx={{
          padding: "0 24px",
          flexGrow: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Stack>
          {/*<Box>Time: {dayjs(time).format()}</Box>*/}
          <Box>Location: 4203 Vineland Rd, Orlando, FL 32811</Box>
        </Stack>
      </CardContent>
    );
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "calc(100% - 30px)",
        maxWidth: 600,
        marginBottom: "30px",
      }}
    >
      <Stack
        direction={"column"}
        sx={{
          height: "100%",
        }}
      >
        {renderImage()}
        {renderCardHeader()}
        {renderCardContent()}
        {renderCardActions()}
      </Stack>
    </Card>
  );
};
