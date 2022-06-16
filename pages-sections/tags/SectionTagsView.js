/*
정도현
*/

import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import Parser from "html-react-parser";
import Image from "next/image";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { Typography } from "@material-ui/core";
import CommaDark from "../../svg/modal/commaDark.svg";
import { makeStyles } from "@material-ui/styles";

const styles = {
  svg: {
    position: "absolute",
    backgroundColor: "#ffffff",
    padding: "0.85rem",
  },
  rightSVG: {
    transform: "rotate(180deg)",
    right: "0.5rem",
    bottom: "0.5rem",
  },
  leftSVG: {
    top: "0.5rem",
    left: "0.5rem",
  },
  gridBorder: {
    border: "0.5rem solid #414141",
    padding: "5rem",
    borderRadius: "1rem",
  },
  title: {
    alignItems: "center",
    fontFamily: "Do Hyeon",
    fontSize: "3rem",
    marginTop: "0",
    marginBottom: "0",
    color: " #414141",
    borderBottom: "0.35rem solid #414141",
    paddingBottom: "1rem",
  },
  body: {
    marginTop: "2rem",
    fontSize: "1rem",
    fontFamily: "SCDream4",
    color: "#414141",
  },
};

const useStyles = makeStyles(styles);
const SectionTagsView = ({ title, body, image_url }) => {
  const classes = useStyles();
  useEffect(() => {}, []);
  return (
    <Box>
      <CommaDark
        width={80}
        height={80}
        className={classes.svg + " " + classes.leftSVG}
      />
      <GridContainer direction={"row"} className={classes.gridBorder}>
        <GridItem xs={4} sm={4} md={4}>
          <Image src={image_url} width={200} height={200} />
        </GridItem>
        <GridItem xs={8} sm={8} md={8}>
          <GridContainer direction={"column"}>
            <Typography className={classes.title}>{title}</Typography>
            <Typography className={classes.body}>{Parser(body)}</Typography>
          </GridContainer>
        </GridItem>
      </GridContainer>
      <CommaDark
        width={80}
        height={80}
        className={classes.rightSVG + " " + classes.svg}
      />
    </Box>
  );
};

export default SectionTagsView;
