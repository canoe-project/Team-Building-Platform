import { useState, useEffect, cloneElement } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@mui/material/InputBase";
import Image from "next/image";
import Modal from "../../Modal/Modal";
import GenerateTags from "../../../pages-sections/tags/SectionGenerateTagsImage";
import GridContainer from "../../Grid/GridContainer";
import { Typography } from "@material-ui/core";
const pageLabel = {
  tech_stack_append: "기술 스택 생성하기",
  tech_stack: "기술 스택 생성",
};

const styles = {
  root: {
    width: "20rem",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
  },
  menu: {
    height: "30rem",
  },
};
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

const previewOption = {
  name: "",
  "@timestamp": "",
  type: "",
  image_url: "",
  description: "",
};

const reqSearch = async (searchQuery, index, filed, size) => {
  const body = {
    index: index === undefined ? "tech_stack_index" : index,
    searchQuery: searchQuery === undefined ? "tech_stack" : searchQuery,
    filed: filed === undefined ? "type" : filed,
    size: size === undefined ? 10 : size,
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
const useStyles = makeStyles(styles);
export default function FadeMenu({
  handle,
  index,
  filed,
  basicQuery,
  children,
  size,
  direction,
  modal,
  modalLabel,
  button,
}) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [preview, setPreview] = useState([previewOption]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [modalToggle, setModalToggle] = useState(false);

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

  const handleModalOpen = () => {
    setModalToggle(true);
  };
  const handleModalClose = () => {
    setModalToggle(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) return <div>loading...</div>;
  return (
    <div>
      {button === undefined ? (
        <IconButton
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AddIcon />
        </IconButton>
      ) : (
        cloneElement(button, { handleClick })
      )}
      <Menu
        id="search-menu"
        className={classes.menu}
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        disableAutoFocus={true}
        disableEnforceFocus={true}
      >
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
          />
        </Search>
        <GridContainer
          direction={direction === undefined ? "column" : direction}
          className={classes.root}
        >
          {preview.map((data) => {
            return cloneElement(children, { data, handle });
          })}
        </GridContainer>
        {modal === undefined ? undefined : (
          <MenuItem onClick={handleModalOpen}>
            <AddIcon />
            <Typography>{modalLabel}</Typography>
          </MenuItem>
        )}
      </Menu>
      <Modal open={modalToggle} handleModalClose={handleModalClose}>
        {modal}
      </Modal>
    </div>
  );
}
