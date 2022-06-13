import { Fragment, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Fade from "@material-ui/core/Fade";
import { Box } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const styles = {};

const useStyles = makeStyles(styles);

const SearchChip = ({ handleClick, label }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading)
    return (
      <Box>
        <Chip></Chip>
      </Box>
    );
  return (
    <Box component="ul">
      <Chip
        label={label === undefined ? "" : label}
        onClick={handleClick}
        variant="outlined"
      ></Chip>
    </Box>
  );
};
export default SearchChip;
