import { useEffect, useState } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Modal from "../../Modal/Modal";
import SectionTagsView from "../../../pages-sections/tags/SectionTagsView";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
    width: "5rem",
  },
  iconLabel: {
    fontSize: "0.8rem",

    fontFamily: "SCDream3",
    alignItems: "center",
    display: "inline-flex",
    marginLeft: "0.5rem",
  },
  roleContain: {
    marginBottom: "1rem",
    marginTop: "1rem",
  },
  roleChildren: {
    padding: "0.5rem",
  },
};

const useStyles = makeStyles(styles);

const Tag = ({ name, image, description }) => {
  const classes = useStyles();

  const [getTagInfo, setTagInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalToggle, setModalToggle] = useState(false);

  const handleModalOpen = () => {
    setModalToggle(true);
  };
  const handleModalClose = () => {
    setModalToggle(false);
  };

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Box>
      <IconButton className={classes.iconButtonLabel} onClick={handleModalOpen}>
        <Image
          src={
            image !== null && image !== undefined
              ? image
              : `/asset/image/background/contest/default.svg`
          }
          width={24}
          height={24}
        />
        <Typography className={classes.iconLabel}>
          {name !== null && name !== undefined ? name : ""}
        </Typography>
      </IconButton>
      <Modal open={modalToggle} handleModalClose={handleModalClose}>
        <SectionTagsView
          title={name !== null && name !== undefined ? name : ""}
          body={
            description !== null && description !== undefined ? description : ""
          }
          image_url={
            image !== null && image !== undefined
              ? image
              : `/asset/image/background/contest/default.svg`
          }
        />
      </Modal>
    </Box>
  );
};

export default Tag;
