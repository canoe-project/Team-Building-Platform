/*
정도현
*/


import { Fragment, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Fade from "@material-ui/core/Fade";
import { Box } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const styles = {
  menu: {
    height: "20rem",
  },
};

const useStyles = makeStyles(styles);

const FilterItem = ({ items = [], label, handleMenuClick }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (items !== undefined) setLoading(false);
  }, []);
  useEffect(() => {
    if (items !== undefined) setLoading(false);
  }, [items]);
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
        deleteIcon={<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
      ></Chip>
      <Menu
        className={classes.menu}
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {items.map((item) => {
          return (
            <MenuItem
              key={item.name}
              onClick={() => {
                handleMenuClick(item.name);
              }}
            >
              {item.name}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};
export default FilterItem;
