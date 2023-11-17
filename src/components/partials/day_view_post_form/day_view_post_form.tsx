import {
  Box,
  Button,
  Card,
  CardContent,
  ImageList,
  ImageListItem,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
// import ImageSharpIcon from "@mui/icons-material/ImageSharp";
import AddLocationAltTwoToneIcon from "@mui/icons-material/AddLocationAltTwoTone";
import MoodBadTwoToneIcon from "@mui/icons-material/MoodBadTwoTone";
import MoodTwoToneIcon from "@mui/icons-material/MoodTwoTone";
import SentimentDissatisfiedTwoToneIcon from "@mui/icons-material/SentimentDissatisfiedTwoTone";
import SentimentNeutralTwoToneIcon from "@mui/icons-material/SentimentNeutralTwoTone";
import SentimentSatisfiedTwoToneIcon from "@mui/icons-material/SentimentSatisfiedTwoTone";
import PermMediaTwoToneIcon from "@mui/icons-material/PermMediaTwoTone";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import * as loadImage from "blueimp-load-image";
import { Select } from "@/components/ui/select";
import { DimensionKey } from "@/constants/event_dimension.ts";

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

export const DayViewPostForm = ({ onSubmit }: DayViewPostFormProps) => {
  const [formData, setFormData] = useState<DayViewFormDataType>({
    time: dayjs().format(),
    title: "",
    description: "",
  } as DayViewFormDataType);

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = () => {
    onSubmit(formData);
  };

  // const renderUpload = () => {
  //   return (
  //     <Box className="rounded-full flex justify-center items-center w-32 h-32 object-cover bg-gray-500 dark:bg-gray-700">
  //       <svg
  //         className="w-6 h-6"
  //         xmlns="http://www.w3.org/2000/svg"
  //         fill="none"
  //         viewBox="0 0 24 24"
  //         strokeWidth={1.5}
  //         stroke="currentColor"
  //       >
  //         <path
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //           d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
  //         />
  //       </svg>
  //     </Box>
  //   );
  // };

  const [avatar, setAvatar] = useState<string[] | null>([]);
  const [photosMetaData, setPhotosMetaData] = useState([]);

  function parseFileMetaData(file) {
    return new Promise((resolve, reject) => {
      loadImage.parseMetaData(
        file,
        (data) => {
          if (data.exif) {
            // Handle EXIF data, if available
            const exifData = data.exif;
            // Do something with the EXIF data
          }
          if (data.iptc) {
            // Handle IPTC data, if available
            const iptcData = data.iptc;
            // Do something with the IPTC data
          }
          resolve(data.exif.getAll());
        },
        {
          maxMetaDataSize: 262144, // Adjust this as needed
        },
      );
    });
  }

  const handleFileChange = async (e) => {
    const files = [...e.target.files];

    const fileMetadata = [];

    for (const file of files) {
      try {
        const metadata = await parseFileMetaData(file);
        fileMetadata.push(metadata);
      } catch (error) {
        console.error(`Error parsing metadata for ${file.name}:`, error);
      }
    }

    setPhotosMetaData(fileMetadata);

    const photosObjects = files.map((file) => {
      return URL.createObjectURL(file);
    });

    setAvatar(photosObjects);
  };

  useEffect(() => {
    console.log(photosMetaData);
  }, [photosMetaData]);

  const renderSelect = () => {
    const selectOptions = Object.keys(DimensionKey).map((key) => ({
      value: DimensionKey[key],
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }));

    return (
      <Box
        sx={{
          mb: 2,
          width: "100%",
          maxWidth: "50%",
          mr: 1,
        }}
      >
        <Select
          label="dimension"
          name={"dimension"}
          value={formData["dimension"]}
          options={selectOptions}
          onChange={handleFieldChange}
        />
      </Box>
    );
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "600px",
      }}
    >
      <CardContent sx={{ width: "100%" }}>
        <Box
          component="form"
          sx={{
            width: "100%",
          }}
        >
          <Stack direction={"row"}>
            {renderSelect()}
            <TextField
              name={"title"}
              onChange={handleFieldChange}
              sx={{
                mb: 2,
                width: "100%",
                maxWidth: "50%",
                ml: 1,
              }}
              label="Title"
              variant="outlined"
            />
          </Stack>
          <TextField
            name={"description"}
            onChange={handleFieldChange}
            sx={{
              mb: 2,
            }}
            id="filled-multiline-flexible"
            label="Description"
            multiline
            fullWidth
            rows={4}
          />

          <Box component="div" sx={{ mb: 2, width: "50%" }}>
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

          <Box component="div" sx={{ "& > :not(style)": { mb: 1 } }}>
            <Box color="primary" component="label">
              <Typography variant="subtitle2" gutterBottom>
                Media:
              </Typography>
              <PermMediaTwoToneIcon />
              <VisuallyHiddenInput
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </Box>
            {!!avatar?.length && (
              <ImageList
                sx={{
                  width: "100%",
                  margin: 0,
                  padding: "0 16px",
                }}
                variant="quilted"
                cols={4}
                rowHeight={100}
              >
                {avatar.map((src, index) => (
                  <ImageListItem key={index} cols={1} rows={1}>
                    <img
                      crossOrigin="anonymous"
                      src={src}
                      alt="Uploaded Avatar"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}

            <Stack>
              <Typography variant="subtitle2" gutterBottom>
                How are you?
              </Typography>
              <Stack direction={"row"}>
                <SentimentDissatisfiedTwoToneIcon />
                <MoodBadTwoToneIcon />
                <SentimentNeutralTwoToneIcon />
                <MoodTwoToneIcon />
                <SentimentSatisfiedTwoToneIcon />
              </Stack>
            </Stack>

            <Stack
              sx={{
                marginBottom: "8px",
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                What is your location?
              </Typography>
              <Stack direction={"row"}>
                <AddLocationAltTwoToneIcon />
              </Stack>
            </Stack>
          </Box>
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Button
              color={"primary"}
              variant={"contained"}
              onClick={handleOnSubmit}
            >
              Post
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
