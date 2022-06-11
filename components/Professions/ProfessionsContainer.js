import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "../Grid/GridContainer2";
import GridItem2 from "../Grid/GridItem2";

const styles = {
  iconbutton: {
    backgroundColor: "white",
  },
  img: {
    width: "2rem",
    height: "2rem",
  },
};

const useStyles = makeStyles(styles);

const imgType = { png: ".png" };

var professionIconImageAddress = "/asset/icon/profession/profession_icon_";

const ProfessionName = (props) => {
  const classes = useStyles();
  const photosize = 24;
  return (
    <>
      <GridContainer direction="column" spacing={1}>
        <GridItem2>
          <div align="center">
            <IconButton
              className={classes.iconbutton}
              aria-label="delete"
              size="large"
            >
              <img
                className={classes.img}
                src={
                  props.id !== null
                  ? `${professionIconImageAddress}${props.id}${imgType.png}`
                  : `/asset/image/background/contest/default.svg` 
                }
                alt="photo"
              />
            </IconButton>
          </div>
        </GridItem2>
        <GridItem2>
          <div align="center">{props.name}</div>
        </GridItem2>
      </GridContainer>
      &nbsp;
    </>
  );
};

const ProfessionsContainer = (props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
          flexDirection: "row",
          borderRadius: '16px'
        }}
        component="ul"
        bgcolor="text.disabled"
      >

        {props.tags.map((professionData, i) => {
          return (

            <ProfessionName
              id={professionData.id}
              name={professionData.name}
              key={i}
            />

          );
        })}
      </Box>
    </>
  );
};

export default ProfessionsContainer;
