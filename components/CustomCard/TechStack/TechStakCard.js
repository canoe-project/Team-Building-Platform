import { Fragment, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Modal from "../../../components/Modal/Modal";
import SectionTagsView from "../../../pages-sections/tags/SectionTagsView";
import { Box, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../Grid/GridContainer";
import GridItem from "../../Grid/GridItem";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const pageLabels = {
  contestBodyLabel: "개요",
  techStackLabel: "기술 스택",
  prize: "원",
};

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
  deleteIcon: {
    top: "0.25rem",
    left: "5rem",
    width: "0.5rem",
    height: "0.5rem",
    margin: "0",
  },
  deleteButton: {
    width: "0.25rem",
  },
};

const useStyles = makeStyles(styles);

const TechStackCard = ({ data, handle }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [modalToggle, setModalToggle] = useState(false);

  const handleModalOpen = () => {
    setModalToggle(true);
  };
  const handleModalClose = () => {
    setModalToggle(false);
  };

  useEffect(() => {}, []);
  return (
    <Box>
      <IconButton
        className={classes.deleteIcon}
        onClickCapture={(e) => {
          handle(data.name);
        }}
      >
        <CloseRoundedIcon />
      </IconButton>
      <IconButton className={classes.iconButtonLabel} onClick={handleModalOpen}>
        <Image
          src={
            data.image_url !== null
              ? data.image_url
              : `/asset/image/background/contest/default.svg`
          }
          width={24}
          height={24}
        />
        <p className={classes.iconLabel}>
          {data.name !== null ? data.name : ""}
        </p>
      </IconButton>

      <Modal
        title={data.name !== null ? data.name : ""}
        open={modalToggle}
        handleModalClose={handleModalClose}
      >
        <SectionTagsView
          body={
            data.description !== null && data.description !== undefined
              ? data.description
              : ""
          }
          image_url={
            data.image_url !== null
              ? data.image_url
              : `/asset/image/background/contest/default.svg`
          }
        />
      </Modal>
    </Box>
  );
};

export default TechStackCard;
