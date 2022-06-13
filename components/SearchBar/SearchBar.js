import { useState, useEffect, Fragment } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@mui/material/Fade";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Image from "next/image";

import { Box } from "@mui/system";
import Popover from "@mui/material/Popover";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Typography } from "@material-ui/core";
import palettes from "../../styles/nextjs-material-kit/palettes";
import Link from "next/link";

const styles = {
  chip: {
    marginRight: "2rem",
    backgroundColor: palettes.darkBlue3,
    color: "#ffffff",
  },
  item: {
    margin: "0.8rem",
    borderBottom: "0.0625rem solid #D7E2EB",
  },
  baseItem: {
    width: "35.625rem",
  },
};

const useStyles = makeStyles(styles);

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const reqSearch = async (searchQuery, index, filed, size) => {
  const body = {
    index: index,
    searchQuery: searchQuery,
    filed: filed,
    size: size,
  };

  const data = await fetch(`${process.env.HOSTNAME}/api/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((response) => {
    return response.json();
  });

  return data;
};
const basicQuery = "contest";
const size = 10;
const SearchBar = () => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [index, setIndex] = useState("contest_index");
  const [filed, setFiled] = useState([
    "contest_name",
    "body",
    "type",
    "professtion_name",
    "professtion_description",
  ]);
  const [preview, setPreview] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const open = Boolean(anchorEl);
  useEffect(() => {
    reqSearch(basicQuery, index, filed, size).then((data) => {
      setPreview(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchQuery !== "") {
      reqSearch(searchQuery, index, filed, size).then((data) => {
        setPreview(data);
      });
    } else if (searchQuery === "") {
      reqSearch(basicQuery, index, filed, size).then((data) => {
        setPreview(data);
      });
    }
  }, [searchQuery]);

  // const handleModalOpen = () => {
  //   setModalToggle(true);
  // };
  // const handleModalClose = () => {
  //   setModalToggle(false);
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) return <div>loading...</div>;
  return (
    <Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onClick={handleClick}
        />
      </Search>
      <Popover
        id="search-bar"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        disableAutoFocus={true}
        disableEnforceFocus={true}
      >
        {preview.map((data, index) => {
          return (
            <Link
              key={index}
              href={`/contest/passToArticle?id=${data._id}`}
              passHref
            >
              <MenuItem key={index} className={classes.item}>
                <Chip
                  label={data._source.professtion_name}
                  className={classes.chip}
                ></Chip>
                <Typography>{data._source.contest_name}</Typography>
              </MenuItem>
            </Link>
          );
        })}
        <MenuItem className={classes.baseItem}></MenuItem>
      </Popover>
    </Box>
  );
};

export default SearchBar;
