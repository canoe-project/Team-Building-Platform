/*
정도현
*/


import { Fragment, useMemo } from "react";
import FormControl, { useFormControl } from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
import FormHelperText from "@material-ui/core/FormHelperText";
import { styled, alpha } from "@mui/material/styles";
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "3rem",
    fontFamily: "do hyeon",
    fontSize: "3rem",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function MyFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = useMemo(() => {
    if (focused) {
      return "This field is being focused";
    }

    return "Helper text";
  }, [focused]);
  return <FormHelperText>{helperText}</FormHelperText>;
}

export default function UseFormControl({
  onChange,
  data,
  placeholder,
  claasName,
}) {
  return (
    <Fragment>
      <StyledInputBase
        placeholder={
          placeholder === undefined ? "Please enter text" : placeholder
        }
        onChange={(e) => {
          onChange(e);
        }}
        value={data}
        autoFocus
        className={claasName}
      />
      {/* <MyFormHelperText focusedText={focusedText} /> */}
    </Fragment>
  );
}
