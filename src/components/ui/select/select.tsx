import { MenuItem, SelectChangeEvent } from "@mui/material";
import MuiSelect from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export const Select = (props) => {
  const {
    label = "",
    name = "",
    value,
    options = [],
    onChange,
    ...restProps
  } = props;

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event);
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="select-label">{label}</InputLabel>
      <MuiSelect
        labelId="select-label"
        {...restProps}
        name={name}
        value={value}
        label={label}
        sx={{ width: "100%" }}
        onChange={handleChange}
      >
        {options.map((option, index) => {
          return (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </MuiSelect>
    </FormControl>
  );
};
