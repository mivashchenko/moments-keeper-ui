import {
  Box,
  Button,
  Fab,
  Grid,
  Menu,
  MenuItem,
  styled,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import React, { ChangeEvent, useState } from "react";
import ImageSharpIcon from "@mui/icons-material/ImageSharp";
import AddReactionSharpIcon from "@mui/icons-material/AddReactionSharp";
import MoodBadTwoToneIcon from "@mui/icons-material/MoodBadTwoTone";
import MoodTwoToneIcon from "@mui/icons-material/MoodTwoTone";
import SentimentDissatisfiedTwoToneIcon from "@mui/icons-material/SentimentDissatisfiedTwoTone";
import SentimentNeutralTwoToneIcon from "@mui/icons-material/SentimentNeutralTwoTone";
import SentimentSatisfiedTwoToneIcon from "@mui/icons-material/SentimentSatisfiedTwoTone";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { MobileDateTimePicker } from "@mui/x-date-pickers";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export type DayViewFormDataType = {
  time: string;
  title: string;
  description: string;
};

type DayViewPostFormProps = {
  onSubmit: (event: DayViewFormDataType) => void;
};

export const TimelineAddEventForm = ({ onSubmit }: DayViewPostFormProps) => {
  const [formData, setFormData] = useState<DayViewFormDataType>({
    time: dayjs().format(),
    title: "",
    description: "",
  } as DayViewFormDataType);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = () => {
    onSubmit(formData);
    handleClose();
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item sx={{ width: "600px" }}>
      <Box
        component="form"
        sx={{
          padding: "30px",
          maxWidth: "600px",
        }}
      >
        <TextField
          name={"title"}
          onChange={handleFieldChange}
          sx={{
            mb: 4,
          }}
          label="Event"
          variant="outlined"
          fullWidth
        />
        <TextField
          name={"description"}
          onChange={handleFieldChange}
          sx={{
            mb: 4,
          }}
          id="filled-multiline-flexible"
          label="Description"
          multiline
          fullWidth
          rows={4}
        />

        <Box component="div" sx={{ mb: 4, width: "50%" }}>
          <MobileDateTimePicker
            sx={{
              width: "100%",
            }}
            defaultValue={dayjs()}
            onChange={(value) =>
              setFormData({ ...formData, time: dayjs(value).format() })
            }
          />
        </Box>

        <Box component="div" sx={{ "& > :not(style)": { mb: 4 } }}>
          <Fab color="primary" component="label" size="large">
            <ImageSharpIcon />
            <VisuallyHiddenInput type="file" />
          </Fab>

          <Fab
            color="primary"
            component="label"
            size="large"
            onClick={handleClick}
          >
            <AddReactionSharpIcon />
          </Fab>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <SentimentDissatisfiedTwoToneIcon color="primary" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <MoodBadTwoToneIcon color="primary" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <SentimentNeutralTwoToneIcon color="primary" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <MoodTwoToneIcon color="primary" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <SentimentSatisfiedTwoToneIcon color="primary" />
            </MenuItem>
          </Menu>

          <Fab color="primary" component="label" size="large">
            <AddLocationAltIcon />
          </Fab>
        </Box>
        <Box>
          <Button onClick={handleOnSubmit}>Add</Button>
        </Box>
      </Box>
    </Grid>
  );
};
