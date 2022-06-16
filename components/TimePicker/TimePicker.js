/*
정도현
*/


import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const styles = {
  root: {
    margin: "1rem",
  },
};

const useStyles = makeStyles(styles);

const MaterialUIPickers = ({ onChange, data }) => {
  const classes = useStyles();
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    if (data !== undefined) {
      setValue(data);
    }
  });
  const handleChange = (newValue) => {
    setValue(newValue, onChange(newValue));
  };

  return (
    <Box className={classes.root}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
};

export default MaterialUIPickers;
