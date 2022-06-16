/*
정도현
*/

import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../Grid/GridContainer";
import GridItem from "../../Grid/GridItem";
import Tag from "../../Tags/Tag";
import Parser from "html-react-parser";
import moment from "moment";
import styles from "../../../styles/jss/nextjs-material-kit/pages/published/teamCreate";
import { Typography, IconButton } from "@material-ui/core";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const pageLabels = {
  contestBodyLabel: "개요",
  techStackLabel: "기술 스택",
  prize: "원",
};

const useStyles = makeStyles(styles);

const RoleCard = ({ role, handle }) => {
  const classes = useStyles();

  useEffect(() => {}, []);
  return (
    <GridContainer direction="column" className={classes.overview}>
      <IconButton
        className={classes.deleteIcon}
        {...(handle === undefined
          ? {}
          : { onClickCapture: () => handle(role.name) })}
      >
        <CloseRoundedIcon />
      </IconButton>

      <GridItem xs={7} sm={7} md={7} className={classes.overviewBody}>
        <Tag
          name={role.name}
          type={"Role"}
          form={"role"}
          team={role.team}
          role={role.id}
        >
          <p>{role.description}</p>
        </Tag>
      </GridItem>
      <GridItem className={classes.subTitle + " " + classes.cardFooter}>
        <Typography>{pageLabels.participantsLabel}</Typography>
      </GridItem>
    </GridContainer>
  );
};

export default RoleCard;
