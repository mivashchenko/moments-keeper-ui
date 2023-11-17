import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { SpeedDial } from "@mui/material";
import SentimentDissatisfiedTwoToneIcon from "@mui/icons-material/SentimentDissatisfiedTwoTone";
import MoodBadTwoToneIcon from "@mui/icons-material/MoodBadTwoTone";
import SentimentNeutralTwoToneIcon from "@mui/icons-material/SentimentNeutralTwoTone";
import MoodTwoToneIcon from "@mui/icons-material/MoodTwoTone";
import SentimentSatisfiedTwoToneIcon from "@mui/icons-material/SentimentSatisfiedTwoTone";
import AddReactionIcon from "@mui/icons-material/AddReaction";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <SentimentDissatisfiedTwoToneIcon />, name: "awful" },
  { icon: <MoodBadTwoToneIcon />, name: "bad" },
  { icon: <SentimentNeutralTwoToneIcon />, name: "meh" },
  { icon: <MoodTwoToneIcon />, name: "good" },
  { icon: <SentimentSatisfiedTwoToneIcon />, name: "rad" },
];

export const DayPostMoodSpeedDial = () => {
  return (
    <Box sx={{}}>
      <SpeedDial
        ariaLabel="SpeedDial playground example"
        icon={<AddReactionIcon />}
        direction={"up"}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};
