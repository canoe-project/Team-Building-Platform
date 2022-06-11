import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "../Grid/GridContainer2";
import GridItem2 from "../Grid/GridItem2";

const styles = {
  iconbutton: {
    backgroundColor: "white"
  },
  img: {
    width: "2rem",
    height: "2rem",
  },
};

const useStyles = makeStyles(styles);

const ProgramName = (props) => {

  const classes = useStyles();
  return (<>
    <GridContainer direction="column" spacing={1}>
      <GridItem2>
        <div align="center">
          <IconButton className={classes.iconbutton} aria-label="delete" size="large">
          <img
              className={classes.img}
              src={props.image_url}
              alt="photo"
            />
          </IconButton>
        </div>
      </GridItem2>
      <GridItem2>
        <div
          align="center"
        >{props.name}</div>
      </GridItem2>
    </GridContainer>
    &nbsp;
  </>
  )

}

const ProgramContainer = (props) => {



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
        {props.tags.map((programData, i) => {
          return (<ProgramName
            image_url={programData.image_url}
            name={programData.name}
            key={i} />
          );
        })}
      </Box>

    </>
  )
}

export default ProgramContainer;
