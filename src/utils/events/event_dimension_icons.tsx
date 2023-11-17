import { DimensionKey } from "@/constants/event_dimension.ts";
import SpaIcon from "@mui/icons-material/Spa";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ChurchIcon from "@mui/icons-material/Church";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import YardIcon from "@mui/icons-material/Yard";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import GroupIcon from "@mui/icons-material/Group";

const dimensionColors = {
  [DimensionKey.PHYSICAL]: { main: "#66cb00", secondary: "#c3e893" },
  [DimensionKey.MENTAL]: { main: "#33cd98", secondary: "#d4f7e9" },
  [DimensionKey.SPIRITUAL]: { main: "#1e4dad", secondary: "#7a9bd6" },
  [DimensionKey.FINANCIAL]: { main: "#6733cd", secondary: "#9a99ff" },
  [DimensionKey.ENVIRONMENTAL]: { main: "#d24285", secondary: "#f9c6e4" },
  [DimensionKey.VACATION]: { main: "#dd400c", secondary: "#fac0b4" },
  [DimensionKey.SOCIAL]: { main: "#f8931f", secondary: "#f5dcc6" },
};

export const getDimensionColor = (dimension) => {
  return dimensionColors[dimension] || {};
};

export const getDimensionIcon = (dimension) => {
  const icons = {
    [DimensionKey.PHYSICAL]: SpaIcon,
    [DimensionKey.MENTAL]: PsychologyIcon,
    [DimensionKey.SPIRITUAL]: ChurchIcon,
    [DimensionKey.FINANCIAL]: AttachMoneyIcon,
    [DimensionKey.ENVIRONMENTAL]: YardIcon,
    [DimensionKey.VACATION]: CardTravelIcon,
    [DimensionKey.SOCIAL]: GroupIcon,
  };
  const Icon = icons[dimension];

  return (
    <Icon
      sx={{
        color: getDimensionColor(dimension).main,
        background: getDimensionColor(dimension).secondary,
      }}
    />
  );
};
