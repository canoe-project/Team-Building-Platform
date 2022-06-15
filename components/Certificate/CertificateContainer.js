// 배효운

import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import GridContainer from "../Grid/GridContainer";
import GridItem2 from "../Grid/GridItem2";


const CertificateName = (props) => {

    const photosize = 24
        return(<>
        <GridContainer direction="column" spacing={1}>
        <GridItem2>
        <div align="center">
        <IconButton aria-label="delete" size="large">
        <Image 
          src={props.image_url}
          alt="이미지"
          width={photosize}
          height={photosize}
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

const CertificateContainer = (props) => {

    const photosize = 50

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
                }}
                component="ul"
                bgcolor="primary.light"
            >
                {props.tags.map((certificateData, i) => {
                    return (
                        <CertificateName 
                        image_url = {certificateData.image_url}
                        name = {certificateData.name}
                        key={i}/>
                    );
                })}
            </Box>
        </>
    )
}

export default CertificateContainer;

//배효운