import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Chip, Stack } from '@mui/material';
import { FavoriteIcon, ShareIcon, ExpandMoreIcon, MoreVertIcon} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import styles from "../../styles/Home.module.css";
import css from "styled-jsx/css";
import Image from "next/image";

const imgType = { png: ".png" };

var simbolImageAddress = "/asset/simbol";
var skillStackAddress = "/asset/skillStack";

const style = css`
  .test {
    background-color: white;
    height: 60px;
    font-size: 1rem;
  }
`;

const CCard = (props) => {
  let tagsPrint = "";

  const photosize = 50
  let i = 0;
  for (; i < props.tags.length; i++) {
    tagsPrint += props.tags[i] + " ";
  }

  let participantsPerfect = props.participants + "팀 모집"
  let prizePerfect = "상금 : " + props.prize + "원"


  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
    <CardHeader
        title= {participantsPerfect}
        subheader={tagsPrint}
        />
    <CardHeader
            avatar={
            <Avatar alt="photo" src={`${simbolImageAddress}${props.field}${imgType.png}`} />
            }    
        title= {props.maintitle}
        subheader={props.subtitle}
        />
        <CardContent>
        <Typography variant="body2" color="text.secondary">
        {props.explan}
        </Typography>
      </CardContent>
      <header>
      {props.skillStack.map((skillStackData, i) => {
                        return (<Image 
                          src={`${skillStackAddress}${skillStackData.number}${imgType.png}`}
                          alt="이미지"
                          width={photosize}
                          height={photosize}
                          key={i}/>);
                                              })}
 
      </header>
      <CardHeader
        title= {prizePerfect} 
        />
    </Card>
    <style jsx>{style}</style>
    </>
  );
};

export default CCard;