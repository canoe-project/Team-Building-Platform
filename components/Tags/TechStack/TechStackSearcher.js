/*
정도현
*/


import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Image from "next/image";
import Modal from "../../Modal/Modal";
import GenerateTags from "../../../pages-sections/tags/SectionGenerateTags";
const pageLabel = {
  tech_stack_append: "기술 스택 생성하기",
  tech_stack: "기술 스택 생성",
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

export default function FadeMenu({ handle }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [preview, setPreview] = useState([previewOption]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [modalToggle, setModalToggle] = useState(false);

  const [loading, setLoading] = useState(true);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const index = "tech_stack_index";
    const filed = "type";
    const basicQuery = "tech_stack";
    const size = 10;

    reqSearch(basicQuery, index, filed, size).then((data) => {
      setPreview(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      const index = "tech_stack_index";
      const filed = "type";
      const basicQuery = "tech_stack";
      const size = 10;

      reqSearch(basicQuery, index, filed, size).then((data) => {
        setPreview(data);
        setLoading(false);
      });
    } else {
      const index = "tech_stack_index";
      const filed = "name";
      const size = 10;
      reqSearch(searchQuery, index, filed, size).then((data) => {
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
      <IconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AddIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
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
        {preview.map((data) => {
          return (
            <MenuItem
              key={data.name}
              onClick={() => {
                handleClose();
                handle(data);
              }}
            >
              {data.image_url === "" ? null : (
                <Image src={data.image_url} width={16} height={16} />
              )}
              {data.name}
            </MenuItem>
          );
        })}
        <MenuItem onClick={handleModalOpen}>
          <AddIcon />
          {pageLabel.tech_stack_append}
        </MenuItem>
      </Menu>
      <Modal
        title={pageLabel.tech_stack}
        open={modalToggle}
        handleModalClose={handleModalClose}
      >
        <GenerateTags handle={handle} />
      </Modal>
    </div>
  );
}
